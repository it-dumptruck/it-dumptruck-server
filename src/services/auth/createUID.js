'use strict';

const { DynamoDB } = require("aws-sdk")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports = async (uid = null) => {
    const regExp = /^([a-zA-Z0-9]{10})$/

    if (uid && regExp.test(uid)) return uid;

    let create = function () {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
      
        return result;
    }

    while (true) {
        uid = create();
    
        let duplicateCheck = (await db.query({
            TableName,
            ExpressionAttributeValues: {
              ':id' : '#users#' + uid
            },
            KeyConditionExpression: 'id = :id',
        }).promise()).Count

        if (duplicateCheck === 0) break;
    }

    return uid;
}