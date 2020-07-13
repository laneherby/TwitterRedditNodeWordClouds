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
        "them",
        "gonna",
        "got",
        "them",
        "much",
        "good",
        "same",
        "didn",
        "already",
        "those",
        "always",
        "anything",
        "really",
        "very",
        "lot",
        "also",
        "which",
        "other",
        "also",
        "been",
        "thank",
        "thanks",
        "many",
        "let",
        "most",
        "its",
        "might",
        "without",
        "though",
        "nice",
        "were",
        "isn",
        "still",
        "actually",
        "going",        
        "the",
        "every",
        "too",
        "sure",
        "was",
        "is",
        "about",
        "all",
        "don",
        "re",
        "more",
        "how",
        "are",
        "no",
        "any",
        "when",
        "wasn",
        "aren",
        "won",
        "why",
        "yes",
        "ve",
        "way",
        "into",
        "here",
        "does",
        "their",
        "there",
        "they",
        "does",
        "am",
        "where",
        "ll",
        "sure",
        "these",
        "doesn",
        "did",
        "had",
        "has",
        "have",        
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

        if (!notUsedWords.includes(currentWord) && currentWord.length>1 && /\S/.test(currentWord))
            wordCounts[currentWord] = wordCounts[currentWord] ? wordCounts[currentWord] + 1 : 1;
    }

    return wordCounts
};

const createTopWordObject = (wordCounts, numWords) => {
    const sortedArrayEntries = Object.entries(wordCounts).sort((a,b) => b[1]-a[1]);

    let topWordsObject = {};

    for (let wCount=0; wCount<numWords; wCount++) {
        topWordsObject[sortedArrayEntries[wCount][0]] = sortedArrayEntries[wCount][1];
    }

    return topWordsObject;
};

exports.cleanText = cleanText;
exports.countWords = countWords;
exports.createTopWordObject = createTopWordObject;