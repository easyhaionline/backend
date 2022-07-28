const {
    EMAIL_LEN_MAX,
    EMAIL_REGEX,
    PHONE_REGEX,
    USERNAME_REGEX,
} = require('../utils/constants')
const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validateStudentInputs = (inputData) => {
    const { name, email, phone, standard, course, freeTrial } = inputData

    // validating student name
    if (name) {
        if (typeof name === 'string') {
            if (!name.match(USERNAME_REGEX)) {
                return {
                    isValid: false,
                    message: 'Please provide a valid student name!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Student name must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Student name is needed!',
        }
    }

    // validating email
    if (email) {
        if (typeof email === 'string') {
            if (email.trim().length > EMAIL_LEN_MAX) {
                return {
                    isValid: false,
                    message: 'Email address too long!',
                }
            } else {
                if (!email.match(EMAIL_REGEX)) {
                    return {
                        isValid: false,
                        message: 'Please provide a valid email address!',
                    }
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Email address must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Email address is needed!',
        }
    }

    // validating phone number
    if (phone) {
        if (typeof phone === 'string') {
            if (!phone.match(PHONE_REGEX)) {
                return {
                    isValid: false,
                    message: 'Phone number seems invalid to us!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Phone number must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Make sure to provide the phone number!',
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

    const { isValid: isValidFreeTrial, message: messageFreeTrial } = validateTypeRequire(
        'boolean',
        'Free Trial',
        freeTrial
    )
    if (!isValidFreeTrial) {
        return {
            isValid: isValidFreeTrial,
            message: messageFreeTrial,
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateStudentInputs
