'use strict';

const getMarkedQuestion = require('../../models/users/getMarkedQuestion')
const updateMarkedQuestion = require('../../models/users/updateMarkedQuestion')

module.exports = async (uid, dumpID, questionToken, isAddFn) => {
    let markedList = await getMarkedQuestion(uid, dumpID)
    let idx = markedList.indexOf(questionToken)

    if (isAddFn && idx < 0) markedList.push(questionToken)
    else if (!isAddFn && idx >= 0) markedList.splice(idx, 1)

    await updateMarkedQuestion(uid, dumpID, markedList)

    return isAddFn;
}