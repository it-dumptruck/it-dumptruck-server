'use strict';

const { S3 } = require("aws-sdk")
const dumpInfo = require("../../models/dumps/dumpInfo")
const Bucket = process.env.bucketName

module.exports = async (dumpID, questionID) => {    
    let totalCount, question

    try {
        let dumpFileName = await dumpInfo(dumpID)

        const s3 = new S3()
        let dumpData = await s3.getObject({
            Bucket,
            Key: 'dumps/' + dumpFileName.data
        }).promise()

        dumpData = JSON.parse(dumpData.Body.toString("utf-8"))
        totalCount = dumpData.length

        if (questionID < 1 || questionID > totalCount) throw new Error()

        question = dumpData[questionID - 1]
    } catch (e) {
        return null
    }
    
    return {
        totalCount,
        question
    }
};