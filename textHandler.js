const cleanText = (textArray) => {
    for (let stringIndex = 0; stringIndex < textArray.length; stringIndex++) {
        if (textArray[stringIndex] != undefined) {
            textArray[stringIndex] = textArray[stringIndex].replace(/(?:https?|ftp):\/\/[\n\S]+/g, " ");
            textArray[stringIndex] = textArray[stringIndex].replace(/\n|\t|\"|\r|\b|\f|\\|\v|\0/g, " ");
            textArray[stringIndex] = textArray[stringIndex].replace(/[^a-zA-Z0-9 ]/g, " ");
            textArray[stringIndex] = textArray[stringIndex].replace(/,/g, '');
        }
    }

    return textArray.join(" ");
};

const countWords = (allWordsArray) => {
    const notUsedWords = [
        "the",
        "be",
        "to",
        "of",
        "and",
        "a",
        "in",
        "that",
        "have",
        "i",
        "it",
        "for",
        "not",
        "on",
        "with",
        "he",
        "as",
        "you",
        "do",
        "at",
        "this",
        "but",
        "his",
        "by",
        "from",
        "they",
        "we",
        "say",
        "her",
        "she",
        "or",
        "an",
        "will",
        "my",
        "one",
        "would",
        "should",
        "could",
        "so",
        "what",
        "up",
        "out",
        "if",
        "who",
        "get",
        "can",
        "like",
        "just",
        "him",
        "your",
        "some",
        "only",
        "now",
        "then",
        "than",
        "well",
        "because",
        "even",
        "us",
        "well",
        "our",
        "before",
        "after",
        "me"
    ];

    let wordCounts = {};

    for (let wordIndex=0; wordIndex<allWordsArray.length; wordIndex++) {
        let currentWord = allWordsArray[wordIndex];

        if (!notUsedWords.includes(currentWord) && currentWord.length>1)
            wordCounts[currentWord] = wordCounts[currentWord] ? wordCounts[currentWord] + 1 : 1;
    }

    return wordCounts
};

exports.cleanText = cleanText;
exports.countWords = countWords;