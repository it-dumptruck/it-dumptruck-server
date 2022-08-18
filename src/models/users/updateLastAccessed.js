'use strict';

const { DynamoDB } = require('aws-sdk')

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid, dumpID, questionID) => {
    await db.update({
        TableName,
        Key: {
            id: '#users#' + uid,
            sid: '#lastAccessed'
        },
        UpdateExpression: 'set #var = :v',
        ExpressionAttributeNames: {
            '#var': 'value'
        },
        ExpressionAttributeValues: {
            ':v': {
                dumpID,
                questionID
            }
        }
    }).promise()
}