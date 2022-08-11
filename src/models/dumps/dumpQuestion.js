'use strict';

const dumpAllQuestions = require('./dumpAllQuestions');

module.exports = async (dumpID, questionID) => {    
    let totalCount, question

    try {
        let dumpData = await dumpAllQuestions(dumpID)
        totalCount = dumpData.length

        if (!totalCount || questionID < 1 || questionID > totalCount) throw new Error()

        question = dumpData[questionID - 1]
    } catch (e) {
        return null
    }

    return {
        totalCount,
        question
    }
};