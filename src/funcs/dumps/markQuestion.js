'use strict';

const res = require('../../utils/res')
const dumpQuestion = require('../../models/dumps/dumpQuestion')
const markQuestion = require('../../services/dumps/markQuestion')
const verify = require('../../services/auth/verify')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let dumpId = event.pathParameters?.dump_id
    let questionToken = parseInt(event.pathParameters?.question_token)

    let dumpData = await dumpQuestion(dumpId, questionToken)
    if (!dumpData) return res(404);

    let isAddFn = !(event.headers?.type?.toString().toLowerCase() === 'delete')

    let result = await markQuestion(uid, dumpId, questionToken, isAddFn)

    return res(200, result);
};