'use strict';

const { DynamoDB } = require("aws-sdk")
const { res } = require("../utils")

const db = new DynamoDB.DocumentClient()
const TableName = process.env.usersTable

module.exports.list = async (event) => {
    //not complete
    return res(200, {
        dumps: [
            {
                groupName: 'Amazon',
                dumps: [
                    {
                        dumpID: '9a6de53f1daf252e41c720bfbb73e4b47a4d0407',
                        dumpName: 'Solution Architect Associate (C02)',
                        image: 'https://dumptruck-assets.s3.ap-northeast-2.amazonaws.com/icons/saa.png',
                        lastUpdated: 1628178571
                    }
                ]
            }
        ]
    });
};