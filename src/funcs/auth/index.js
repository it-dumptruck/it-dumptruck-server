'use strict';

const jwt = require('jsonwebtoken');

const res = require('../../utils/res')
const config = require('../../models/configs')
const getLastAccessed = require('../../models/users/getLastAccessed')
const createUID = require('../../services/auth/createUID')

module.exports.index = async (event) => {
    let AESKey = await config('secret')
    let uid = await createUID(event.headers?.uid)
    let agent = event.headers?.['user-agent']
    let token = jwt.sign({ uid }, AESKey, { expiresIn: '1h' })

    if (!agent) return res(400);

    let lastAccessed
    
    if (event.headers?.uid) {
        lastAccessed = await getLastAccessed(uid)
        if (!lastAccessed) lastAccessed = null
    }

    return res(200, {
        uid,
        token,
        lastAccessed
    });
};