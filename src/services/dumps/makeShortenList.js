'use strict';

module.exports = (dumpData, idx) => {
    let result = {
        lists: []
    }

    if (!idx) {
        idx = []

        for (let i = 1; i <= dumpData.length; i++) idx.push(i)
    }

    idx.forEach(e => {
        let question = dumpData[e - 1].question

        if (question.length >= 88) question = question.substr(0, 88) + '...'

        result.lists.push({
            id: e,
            questionID: e,
            question
        })
    })

    return result
}