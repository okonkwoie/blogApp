function readingTime(body){
    wordsPerMinute = 200
    numberOfWords = body.split('').length
    minutes = numberOfWords / wordsPerMinute
    readTime = Math.ceil(minutes)
    return `${readTime} min`
}


module.exports = readingTime