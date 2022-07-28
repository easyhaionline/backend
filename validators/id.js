const { ObjectID } = require('mongodb'); //ObjectID is deprecated 

const validateMongoID = (inputID, inputType = '') => {
    if (inputID) {
        if (!ObjectID.isValid(inputID)) {
            return {
                isValid: false,
                message: `${inputType} ${inputID} Invalid ID of!`,
            }
        }
    } else {
        return {
            isValid: false,
            message: `${inputType} ${inputID} ID is required`,
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateMongoID
