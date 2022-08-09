'use strict';

const jwt = require('jsonwebtoken');
const config = require("../../models/configs")

module.exports = async (token) => {
    let AESKey = await config('secret')
    let decoded

    try{
        decoded = jwt.verify(token, AESKey)
    } catch (e) {
        return null
    }

    return decoded?.uid
}