'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid) => {
    let result = null;


    let k = (await db.get({
        TableName,
        Key: {
            id: '#users#' + uid
        }
    }).promise())

    if (Object.keys(obj).length === 0)


    return result;
}