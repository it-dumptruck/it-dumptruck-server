'use strict';

module.exports = async (statusCode, body, additionalHeaders = null) => {
    const headers = {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...additionalHeaders
    };

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}