'use strict';

const res = require('../../utils/res')
const dumpQuestionWrapper = require('../../models/dumps/dumpQuestionWrapper')
const getMarkedQuestion = require('../../models/users/getMarkedQuestion')
const getLastAccessed = require('../../models/users/getLastAccessed')
const updateLastAccessed = require('../../models/users/updateLastAccessed')
const verify = require('../../services/auth/verify')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let type = event.headers?.type;
    let dumpId = event.pathParameters?.dump_id
    let questionToken = parseInt(event.pathParameters?.question_token)
    if (!questionToken) questionToken = 1

    let markedList = (await getMarkedQuestion(uid, dumpId)).sort((a, b) => a - b);

    let wrapper;
    try {
        wrapper = await dumpQuestionWrapper(dumpId);
    } catch (e) {
        return res(404);
    }

    let result = [];
    let maxLength = Math.min(5, parseInt(event.pathParameters?.amount));

    if (type === 'random') {
        result = Array.from({length: wrapper.totalCount}, (_, i) => i + 1).sort(() => 0.5 - Math.random()).slice(0, maxLength);
        result.splice(0, 0, questionToken);
    } else if (type === 'marked') {
        let idx = markedList.indexOf(questionToken);
        result = markedList.slice(idx, idx + maxLength + 1);
    } else {
        result = [...Array(maxLength + 1).keys()].map(e => e + questionToken);
    }
    //요청 갯수보다 1개 더 많은 문제를 불러온다. (next_id를 포함하기 위함)

    for (let i = 0; i < result.length; i++) {
        try{
            result[i] = {
                id: result[i],
                questionID: result[i],
                marked: markedList.indexOf(result[i]) >= 0,
                ...wrapper.getQuestion(result[i])
            }
        } catch (e) {
            result.splice(i, 1);
            i--;
        }
    }

    let next_id = null;
    if (result.length > maxLength) {
        next_id = result[result.length - 1];
        result.splice(result.length - 1, 1);
    }

    let prev_id;
    if (type === 'random') {
        prev_id = null;
    } else if (type === 'marked') {
        let idx = markedList.indexOf(questionToken)

        if (idx - 1 >= 0) prev_id = markedList[idx - 1]
        else prev_id = null
    } else {
        prev_id = questionToken > 1 ? questionToken - 1 : null
    }

    await updateLastAccessed(uid, dumpId, questionToken)

    return res(200, {
        prev_id,
        next_id : next_id?.questionID,
        questions: result
    });
};