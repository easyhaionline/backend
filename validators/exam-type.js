const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validateExamInputs = (inputData) => {
    const { name } = inputData
console.log(name);
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

    
  
    return {
        isValid: true,
    }
}

module.exports = validateExamInputs
