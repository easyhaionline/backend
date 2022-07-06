const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validateChapterInputs = (inputData) => {
    const { subject,name } = inputData

    const { isValid: isValidName, message: messageName } = validateTypeRequire(
        'string',
        'Name',
        name
    )
    if (!isValidName) {
        return {
            isValid: isValidName,
            message: messageName,
        }
    }
   
    
}

module.exports = validateChapterInputs
