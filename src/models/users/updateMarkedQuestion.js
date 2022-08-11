'use strict';

const { DynamoDB } = require('aws-sdk')

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid, dumpID, list) => {
    await db.update({
        TableName,
        Key: {
            id: '#users#' + uid,
            sid: '#dumps#' + dumpID
        },
        UpdateExpression: 'set #var = :v',
        ExpressionAttributeNames: {
            '#var': 'value'
        },
        ExpressionAttributeValues: {
            ':v': list
        }
    }).promise()
}