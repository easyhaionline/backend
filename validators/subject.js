const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validateSubjectInputs = (ok) => {
    const { name, teachers, standard } = ok;
    console.log(ok,"dfgdfg");
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
    

    const { isValid: isValidStandard, message: messageStandard } = validateMongoID(
        standard,
        'Standard'
    )
    if (!isValidStandard) {
        return {
            isValid: isValidStandard,
            message: messageStandard,
        }
    }
    if (teachers) {
        if (Array.isArray(teachers)) {
            // logic to be added
            return {
                isValid: true,
            }
        
        } else {
            return {
                isValid: false,
                message: `teachers must be an array`,
            }
        }
    } else {
        return {
            isValid: false,
            message: 'teachers are required',
        }
    }
    {

        return {   
            isValid: true,
        }
    }

    
}

module.exports = validateSubjectInputs
