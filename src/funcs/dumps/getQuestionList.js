'use strict';

const res = require('../../utils/res')
const verify = require('../../services/auth/verify')
const makeShortenList = require('../../services/dumps/makeShortenList')
const dumpAllQuestions = require('../../models/dumps/dumpAllQuestions')
const getDumpInfo = require('../../models/dumps/getDumpInfo')

module.exports = async (event) => {
    let uid = await verify(event.headers)
    if (!uid) return res(401)

    let dumpID = event.pathParameters?.dump_id
    let dumpInfo = await getDumpInfo(dumpID)

    if (!dumpInfo) return res(404)

    let dumpData = await dumpAllQuestions(dumpID)
    let result = makeShortenList(dumpData)

    result.dump = {
        dumpID: dumpInfo.dumpID,
        image: dumpInfo.image,
        dumpName: dumpInfo.dumpName,
        lastUpdated: dumpInfo.lastUpdated,
    }

    return res(200, result);
};