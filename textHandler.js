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

exports.cleanText = cleanText;