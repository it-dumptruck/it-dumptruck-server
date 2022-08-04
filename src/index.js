'use strict';

const { config, res } = require("./utils")

module.exports.index = async (event) => {
    return res(301, null, {
        Location: await config("url")
    });
};