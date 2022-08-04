'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.configsTable

module.exports = async (key) => {
    let result = null;

    try{
        result = (await db.get({
            TableName,
            Key: {
                key
            }
        }).promise()).Item.value;
    } catch (e) {
        console.log(e)
    }

    return result;
}