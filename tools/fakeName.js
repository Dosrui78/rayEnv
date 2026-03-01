const words = [
    // 使用 Set 去重后的数组
    ...new Set([
        "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "lemon", "pineapple", "orange", "raspberry", "strawberry", "tangerine", "watermelon",
        "dusk", "morning", "afternoon", "evening", "night", "sunrise", "sunset", "dawn",
        "duck", "goose", "swan", "turkey", "rooster", "pig", "cow", "sheep", "goat", "horse", "donkey", "monkey", "elephant", "lion", "tiger", "wolf", "zebra", "giraffe", "hippo", "rhino",
        "sun", "moon", "star", "cloud", "rain", "snow", "wind", "tree", "flower", "grass", "leaves", "bark", "leaf", "branch", "root", "stem", "petal", "seed", "sprout", "bloom", "thunder",
        "river", "lake", "ocean", "mountain", "hill", "valley", "peak", "canyon", "dune", "plateau", "cave", "cavern", "tunnel", "passage", "bridge", "tower", "castle", "fort", "palace", "sword"
    ])
]

function generateRandomWords(count = 5) {
    const result = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        result.push(words[randomIndex]);
    }
    return '' + result.join('') + '';
}

module.exports = {
    generateRandomWords
}