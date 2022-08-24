'use strict';

const res = require('../../utils/res')
const dumpList = require('../../models/dumps/dumpList')
const verify = require('../../services/auth/verify')

module.exports = async (event) => {
    let uid = await verify(event.headers)
    if (!uid) return res(401)

    return res(200, {
        dumps: await dumpList()
    });
};