'use strict';

const res = require('../../utils/res')
const verify = require('../../services/auth/verify')
const makeShortenList = require('../../services/dumps/makeShortenList')
const dumpAllQuestions = require('../../models/dumps/dumpAllQuestions')
const getMarkedQuestion = require('../../models/users/getMarkedQuestion')
const getDumpInfo = require('../../models/dumps/getDumpInfo')

module.exports = async (event) => {
    let uid = await verify(event.headers);
    if (!uid) return res(401);

    let dumpID = event.pathParameters?.dump_id
    let dumpInfo = await getDumpInfo(dumpID)
    let dumpData = await dumpAllQuestions(dumpID);
    if (!dumpData) return res(404);

    let markedQuestion = await getMarkedQuestion(uid, dumpID)
    markedQuestion.sort()

    let result = makeShortenList(dumpData, markedQuestion)

    result.dump = {
        dumpID: dumpInfo.dumpID,
        image: dumpInfo.image,
        dumpName: dumpInfo.dumpName,
        lastUpdated: dumpInfo.lastUpdated,
    }

    return res(200, result);
};