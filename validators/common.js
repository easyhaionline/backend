const { DESCRIPTION_LEN_MAX, NAME_REGEX } = require('../utils/constants')

const validateCommonInputs = (inputData, imageCount = 1, isCourse = false) => {
    const { name, description, image, mobileImage, desktopImage } = inputData

    // validating program name
    if (name) {
        if (typeof name === 'string') {
            if (!name.match(NAME_REGEX)) {
                return {
                    isValid: false,
                    message: 'Please provide a valid name!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Name must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Name field is required!',
        }
    }

    // validating image
    if (imageCount === 1) {
        if (image) {
            if (typeof image !== 'string') {
                return {
                    isValid: false,
                    message: 'Image must be a string!',
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Image is needed!',
            }
        }
    } else {
        if (mobileImage && desktopImage) {
            if (typeof mobileImage !== 'string' && typeof desktopImage !== 'string') {
                return {
                    isValid: false,
                    message: 'Image must be a string!',
                }
            }
        } 
    }

    // validating  description
    if (description) {
        if (typeof description === 'string') {
            if (description.length > DESCRIPTION_LEN_MAX) {
                return {
                    isValid: false,
                    message: `Description is too long! Allowed maximum length is ${DESCRIPTION_LEN_MAX} characters`,
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Description must be a string!',
            }
        }
    } else {
        if (!isCourse) {
            return {
                isValid: false,
                message: 'Description is required!',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateCommonInputs
