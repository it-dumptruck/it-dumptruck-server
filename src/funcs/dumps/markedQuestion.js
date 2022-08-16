'use strict';

const res = require('../../utils/res')
const verify = require('../../services/auth/verify')
const dumpAllQuestions = require('../../models/dumps/dumpAllQuestions')
const getMarkedQuestion = require('../../models/users/getMarkedQuestion')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let dumpID = event.pathParameters?.dump_id
    let dumpData = await dumpAllQuestions(dumpID);
    if (!dumpData) return res(404);

    let markedQuestion = await getMarkedQuestion(uid, dumpID)
    markedQuestion.sort()

    let result = {
        lists: []
    }

    markedQuestion.forEach(e => {
        let question = dumpData[e - 1].question

        if (question.length >= 96) question = question.substr(0, 96) + '...'

        result.lists.push({
            id: e,
            question
        })
    })

    return res(200, result);
};