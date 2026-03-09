import subprocess
import json
import requests
import re
import time
from lxml import etree
from loguru import logger

# 1. 基础配置
HEADERS = headers = {
    'Accept': 'application/json, text/plain, */*',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://www.ouyeel.com',
    'Pragma': 'no-cache',
    'Referer': 'https://www.ouyeel.com/steel/search?pageIndex=0&pageSize=50',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36 Edg/145.0.0.0',
    'sec-ch-ua': '"Not:A-Brand";v="99", "Microsoft Edge";v="145", "Chromium";v="145"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    # 'Cookie': 'T0k1m0u5AfREO=5GEfBIRwbUmDM2exuybFjbPTlQ73.wYJ1rZuO6FKIKv3ujIGyJ8GDsaboUCqkYPxy6pI_CVtEnBIuBfms7tpTRa; cookiesession1=678A3E1AB02356AFEBF21137AC626A09; cna=4c812632d43f4eb8ad143e5275b6a57a; SHGTSESSIONID=8b24bb83-d791-4697-8ddf-3a8c0ec86f64; staticVersion=1762424307009; T0k1m0u5AfREP=R7nwLyPj07lSjVEqoS1Ddi8M5.FxOPp4B98Ds_jd24ThmZ9Gx4JYJRQTe56EkVQMEwrL5ObTRh.CAY16seNX_W9A4v8JugbvOYkUGzKFAU0cpxObJeHsC2h0RONKcLWmh7EFEhnDlAKRYm5Bsl.i7fXs1Cek5tC3.xL1aJmbghS0_6GncJV9aO_5S.YFRDPV42wENysedMV615FLPdkgMSJ2qWEcnyI9iOPR02YdLuj0XhQWHCmTvkBZuG6.pJBcKsr5A8js3Zy5k0GwcyDjS_c7E2DN2h94C.gD9wYCJWO5A_m4bJLmN46E4IJBqiuU9MISg4nhdhXjvqPV6fAKm9G2P9D3cSbu9b._6KZAESKS83xWzo9cKj8T4UcSL79I',
}
LIST_URL = "https://www.ouyeel.com/search-ng/commoditySearch/queryCommodityResult"
BASE_URL = "https://www.ouyeel.com"

session = requests.Session()

def fetch_web_params():
    """获取第一次请求的 meta content, ts_js 以及动态产生的脚本内容"""
    logger.info("Fetching initial parameters from page...")
    response = session.get("https://www.ouyeel.com/steel/search", headers=HEADERS)
    tree = etree.HTML(response.text)
    
    # 提取 meta
    meta_elements = tree.xpath('//meta[2]/@content')
    if not meta_elements:
        logger.error("Failed to find meta content")
        return None
    meta_content = meta_elements[0]
    
    # 提取脚本
    # 瑞数通常第一个 script 是 $_ts 的配置
    ts_js = tree.xpath('//script[1]/text()')[0]
    
    # 提取动态外部脚本
    auto_script_elements = tree.xpath('//script[@src]/@src')
    if not auto_script_elements:
        logger.error("Failed to find auto script URL")
        return None
        
    auto_script_url = BASE_URL + auto_script_elements[0]
    auto_script_js = session.get(auto_script_url).text
    
    return meta_content, ts_js, auto_script_js

def call_node_env(meta_content, ts_js, auto_script_js):
    """
    调用 Node.js 环境生成 cookie。
    我们将 meta_content 等写入 dynamic_config.json 或传参。
    在这里我们选择写入文件，让 index.js 读取。
    """
    # 1. 更新 target/ouyeel.js (通常需要手动处理或注入，这里简化 index.js 会自动读取)
    # 本方案中，我们需要把 ts_js 和 auto_script_js 拼接到执行的代码里
    # 这里的关键是：Node 端需要执行 ts_js + auto_script_js
    
    # 由于 ts_js 和 auto_script_js 是代码，我们将其通过文件传递给 Node
    # index.js 需要稍微配合，或者我们直接修改 target/ouyeel.js
    
    with open("target/ouyeel.js", "w", encoding="utf-8") as f:
        f.write("// Dynamic injected content\n")
        f.write(ts_js + "\n")
        f.write(auto_script_js + "\n")
    
    # 将 meta 等非 JS 代码的辅助配置放入 dynamic_config.json
    config = {
        "meta": {
            "content": meta_content
        }
    }
    with open("dynamic_config.json", "w", encoding="utf-8") as f:
        json.dump(config, f)

    logger.info("Calling Node.js environment to generate cookie...")
    process = subprocess.Popen(
        ['node', 'index.js'],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding='utf-8',
        cwd='.'
    )
    
    stdout, stderr = process.communicate()
    
    # 优先检查 stdout 中是否有结果
    match = re.search(r'FINAL_RESULT:(.*)', stdout)
    if match:
        try:
            result = json.loads(match.group(1))
            cookie_str = result.get('cookie', '')
            return cookie_str
        except json.JSONDecodeError:
            logger.error(f"Failed to parse JSON result: {match.group(1)}")

    if process.returncode != 0:
        logger.error(f"Node.js Error: {stderr}")
        return None
    
    logger.error(f"FINAL_RESULT not found in Node.output. Stdout: {stdout[:500]}")
    return None

def fetch_data(page_index, cookie_str):
    """使用生成的 cookie 进行最终数据请求"""
    # 处理成 requests 需要的字典格式
    # cookie_str 现在是 Set-Cookie 格式: "name=value; path=/; expires=..."
    # 只取第一个 name=value（实际的 cookie），忽略 path/expires 等属性
    cookie_dict = {}
    if cookie_str:
        first_pair = cookie_str.split(';')[0].strip()
        if '=' in first_pair:
            name, value = first_pair.split('=', 1)
            cookie_dict[name.strip()] = value.strip()
    else:
        logger.warning("Generated cookie string is empty!")
            
    # 同步更新到 session 中，确保 Cookie1 和 Cookie2 同时存在
    session.cookies.update(cookie_dict)
    
    logger.info(f"Final Cookies in Session: {session.cookies.get_dict()}")
    data = {
        "criteriaJson": json.dumps({
            "pageSize": 50,
            "industryComponent": None,
            "channel": None,
            "productType": None,
            "sort": None,
            "warehouseCode": None,
            "key_search": None,
            "is_central": None,
            "searchField": None,
            "companyCode": None,
            "inquiryCategory": None,
            "inquirySpec": None,
            "provider": None,
            "shopCode": None,
            "packCodes": None,
            "steelFactory": None,
            "resourceIds": None,
            "providerCode": None,
            "jsonParam": {"keywordAnalyseResult": None},
            "excludeShowSoldOut": None,
            "pageIndex": page_index,
            "maxPage": 50
        })
    }
    
    logger.info(f"Sending POST request to {LIST_URL} with data...")
    response = session.post(LIST_URL, headers=HEADERS, data=data)
    
    logger.info(f"Response Status: {response.status_code}")
    # logger.info(f"Response Headers: {response.headers}")
    
    if response.status_code == 200:
        if not response.text.strip():
            logger.error("Response text is empty! (Status 200 but no body)")
            return
        try:
            res_json = response.json()
            ret_list_str = res_json.get("resultList")
            if not ret_list_str:
                logger.error(f"resultList is missing in response: {response.text[:500]}")
                return
            ret_list = json.loads(ret_list_str)
            logger.success(f"Page {page_index} Success! Found {len(ret_list)} items.")
            for item in ret_list[:2]: 
                print(f" - {item.get('resourceName')} / {item.get('price')}")
        except Exception as e:
            logger.error(f"Failed to parse response: {e}")
            print(f"First 500 chars of response: {response.text[:500]}")
    else:
        logger.error(f"Response error: {response.status_code}")
        print(f"First 500 chars of response: {response.text[:500]}")

def main():
    for page_index in range(6):
        # 1. 抓取页面最新的瑞数参数
        params = fetch_web_params()
        if not params:
            break
            
        # 2. 调用 Node 环境生成 Cookie
        cookie_str = call_node_env(*params)
        if not cookie_str:
            break
            
        logger.success(f"Generated Cookie: {cookie_str[:100]}...")
        
        # 3. 发送数据请求
        fetch_data(page_index, cookie_str)
        
        # 清理 cookie 等待下一次循环（或维持 session 看具体 JS 逻辑）
        session.cookies.clear()
        time.sleep(2)

if __name__ == "__main__":
    main()
