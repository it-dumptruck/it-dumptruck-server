'use strict';

module.exports = (dumpData, markedList) => {
    dumpData = JSON.parse(JSON.stringify(dumpData))

    dumpData.forEach(e => {
        e.marked = markedList.indexOf(e.id) >= 0
    })

    return dumpData
}