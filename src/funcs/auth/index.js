'use strict';

const jwt = require('jsonwebtoken');

const res = require("../../utils/res")
const config = require("../../models/configs")
const createUID = require("../../services/auth/createUID")

module.exports.index = async (event) => {
    let AESKey = await config('secret')
    let uid = await createUID(event.headers?.uid)
    let token = jwt.sign({ uid }, AESKey, { expiresIn: '1h' });

    return res(200, {
        uid,
        token
    });
};