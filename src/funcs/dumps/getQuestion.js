'use strict';

const res = require('../../utils/res')
const dumpQuestion = require('../../models/dumps/dumpQuestion')
const getMarkedQuestion = require('../../models/users/getMarkedQuestion')
const verify = require('../../services/auth/verify')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let type = event.headers?.type;
    let dumpId = event.pathParameters?.dump_id
    let questionToken = parseInt(event.pathParameters?.question_token)
    if (!questionToken) questionToken = 1

    let dumpData = await dumpQuestion(dumpId, questionToken);
    if (!dumpData) return res(404);

    let prev_id = questionToken > 1 ? questionToken - 1 : null
    let next_id = questionToken < dumpData.totalCount ? questionToken + 1 : null

    let markedList = await getMarkedQuestion(uid, dumpId)

    if (type === 'random') {
        prev_id = null
        next_id = Math.floor(Math.random() * dumpData.totalCount) + 1
    } else if (type === 'marked') {
        markedList.sort();
        let idx = markedList.indexOf(questionToken)

        if (idx + 1 < markedList.length) next_id = markedList[idx + 1]
        else next_id = null

        if (idx - 1 >= 0) prev_id = markedList[idx - 1]
        else prev_id = null
    }

    let result = {
        id: questionToken,
        prev_id,
        next_id,
        marked: markedList.indexOf(questionToken) >= 0,
        ...dumpData.question
    }

    return res(200, result);
};