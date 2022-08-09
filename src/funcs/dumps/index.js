'use strict';

const res = require("../../utils/res")
const dumpList = require("../../models/dumps")
const verify = require("../../services/auth/verify")

module.exports.list = async (event) => {
    let uid = await verify(event.headers?.token);
    if (!uid) return res(401);

    return res(200, {
        dumps: await dumpList()
    });
};