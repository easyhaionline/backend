const {
    EMAIL_LEN_MAX,
    EMAIL_REGEX,
    USERNAME_REGEX,
    PASSWORD_REGEX,
} = require('../utils/constants')

const validateAdminInputs = (inputData, isEdit = false) => {
    const { username, email, password, image } = inputData

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

    // validating  username
    if (username) {
        if (typeof username === 'string') {
            if (!username.match(USERNAME_REGEX)) {
                return {
                    isValid: false,
                    message: 'Please enter a valid username!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Username must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'You cannot create an account without providing an username!',
        }
    }

    // validating image
    if (image) {
        if (typeof image !== 'string') {
            return {
                isValid: false,
                message: 'Image must be a string!',
            }
        }
    } 

    // validating password
    if (password) {
        if (typeof password === 'string') {
            if (!password.match(PASSWORD_REGEX)) {
                return {
                    isValid: false,
                    message:
                        'Password must be 6-16 characters along with a special character and a number!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Password must be a string!',
            }
        }
    } else {
        if (!isEdit) {
            return {
                isValid: false,
                message: 'Password must be provided, in case you wish to login!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateAdminInputs
