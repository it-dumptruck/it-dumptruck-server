'use strict';

const dumpAllQuestions = require('./dumpAllQuestions');

module.exports = async (dumpID) => {
    let dumpData = await dumpAllQuestions(dumpID);

    if (!dumpData) throw new Error();

    return {
        dumpData,
        totalCount: dumpData.length,
        getQuestion: function (questionId) {
            let totalCount = this.dumpData.length

            if (!totalCount || questionId < 1 || questionId > totalCount) throw new Error()

            return this.dumpData[questionId - 1]
        }
    }
};