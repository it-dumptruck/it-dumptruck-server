'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async () => {
    let result = (await db.get({
        TableName,
        Key: {
            id: '#dumps',
            sid: '#dumps#list'
        }
    }).promise())?.Item?.value;

    return result;
}