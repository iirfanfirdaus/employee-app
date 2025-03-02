const MsgList = require('./MessageList')

String.prototype.format = function(args) {
    var str = this
    return str.replace(String.prototype.format.regex, function(item) {
        var intVal = parseInt(item.substring(1, item.length - 1))
        var replace
        if (intVal >= 0) {
            replace = args[intVal]
        } else if (intVal === -1) {
            replace = "{"
        } else if (intVal === -2) {
            replace = "}"
        } else {
            replace = ""
        }
        return replace
    })
}
String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g")

const formatMessage = (baseMsg, ...param) => {
    return baseMsg.format(param)
}

const duplicateMessage = (param) => {
    return formatMessage(MsgList.FOUND_DUPLICATE, param)
}

const notFoundInMasterMessage = (param) => {
    return formatMessage(MsgList.NOT_FOUND_IN_MASTER, param)
}

module.exports = {
    formatMessage,
    duplicateMessage,
    notFoundInMasterMessage,
    errorDuringSearch: () => {
        return MsgList.ERROR_ON_SEARCH
    },
    errorDuringSave: () => {
        return MsgList.ERROR_ON_SAVING
    },
    errorDuringUpdate: () => {
        return MsgList.ERROR_ON_UPDATE
    },
    errorDuringDelete: () => {
        return MsgList.ERROR_ON_DELETE
    },
    errorDuringGeneration: () => {
        return MsgList.ERROR_ON_GENERATE
    },
    savedSuccessfully: () => {
        return MsgList.SAVED_SUCCESSFULLY
    },
    updatedSuccessfully: () => {
        return MsgList.UPDATED_SUCCESSFULLY
    },
    deletedSuccessfully: () => {
        return MsgList.DELETED_SUCCESSFULLY
    },
    dataFound: () => {
        return MsgList.DATA_FOUND
    },
    dataNotFound: () => {
        return MsgList.DATA_NOT_FOUND
    },
    success: () => {
        return MsgList.SUCCESS
    }
}