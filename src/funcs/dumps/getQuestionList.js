'use strict';

const res = require('../../utils/res')
const verify = require('../../services/auth/verify')
const makeShortenList = require('../../services/dumps/makeShortenList')
const dumpAllQuestions = require('../../models/dumps/dumpAllQuestions')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let dumpID = event.pathParameters?.dump_id
    let dumpData = await dumpAllQuestions(dumpID)

    let result = makeShortenList(dumpData)

    return res(200, result);
};