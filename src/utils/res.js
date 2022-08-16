'use strict';

module.exports = (statusCode, body, additionalHeaders = null) => {
    const headers = {
        'Content-Type': 'application/json',
        ...additionalHeaders
    };

    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    }
}