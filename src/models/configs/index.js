'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (key) => {
    let result = null;

    try{
        result = (await db.get({
            TableName,
            Key: {
                id: '#config',
                sid: '#config#' + key
            }
        }).promise()).Item.value;
    } catch (e) {
        console.log(e)
    }

    return result;
}