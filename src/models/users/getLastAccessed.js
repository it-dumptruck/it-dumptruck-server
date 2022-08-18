'use strict';

const { DynamoDB } = require('aws-sdk')

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid) => {
    let query = (await db.query({
        TableName,
        ExpressionAttributeValues: {
          ':id': '#users#' + uid,
          ':sid': '#lastAccessed'
        },
        KeyConditionExpression: 'id = :id and sid = :sid',
        Limit: 1,
    }).promise())?.Items[0]?.value

    return query;
}