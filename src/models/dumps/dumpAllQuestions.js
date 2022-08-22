'use strict';

const { S3 } = require('aws-sdk')
const dumpInfo = require('./getDumpInfo')
const Bucket = process.env.bucketName

module.exports = async (dumpID) => {    
    let dumpData

    try {
        let dumpFileName = await dumpInfo(dumpID)

        const s3 = new S3()
        dumpData = await s3.getObject({
            Bucket,
            Key: 'dumps/' + dumpFileName.data
        }).promise()

        console.log(dumpData)

        dumpData = JSON.parse(dumpData.Body.toString('utf-8'))
    } catch (e) {
        return null
    }

    return dumpData
};