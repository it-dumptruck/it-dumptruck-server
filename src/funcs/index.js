'use strict';

const config = require("../models/configs")
const res = require("../utils/res")

module.exports.index = async (event) => {
    return res(301, null, {
        Location: await config("url")
    });
};