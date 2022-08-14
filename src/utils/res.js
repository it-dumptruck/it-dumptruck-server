'use strict';

module.exports = (statusCode, body, additionalHeaders = null) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        ...additionalHeaders
    };

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}