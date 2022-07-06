const { COURSE_PRICE_MIN, STANDARD_MIN } = require('../utils/constants')

const validateCourseInputs = (inputData) => {
    const {
        startDate,
        endDate,
        standard,
        actualPrice,
        discountPrice,
        location,
        priority,
    } = inputData

    // validating start date
    if (startDate) {
        if (typeof startDate !== 'string') {
            return {
                isValid: false,
                message: 'Start date must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Start date is needed!',
        }
    }

    // validating end date
    if (endDate) {
        if (typeof endDate !== 'string') {
            return {
                isValid: false,
                message: 'End date must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'End date is needed!',
        }
    }

    // validating course standard
    // if (standard || String(standard) === 0) {
    //     if (typeof standard === 'string') {
    //         if (standard < STANDARD_MIN) {
    //             return {
    //                 isValid: false,
    //                 message: `Please provide a valid class!`,
    //             }
    //         }
    //     } else {
    //         return {
    //             isValid: false,
    //             message: 'Course class must be a number!',
    //         }
    //     }
    // } else {
    //     return {
    //         isValid: false,
    //         message: 'Course class is needed!',
    //     }
    // }

    // validating actual price
    if (actualPrice || String(actualPrice) === 0) {
        if (typeof actualPrice === 'string') {
            if (actualPrice < COURSE_PRICE_MIN) {
                return {
                    isValid: false,
                    message: `Please provide a valid amount for actual price!`,
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Course actual price must be a number!',
            }
        }
    }

    // validating discount price
    if (discountPrice || String(discountPrice) === 0) {
        if (typeof discountPrice === 'string') {
            if (discountPrice < COURSE_PRICE_MIN) {
                return {
                    isValid: false,
                    message: `Please provide a valid amount for discount price!`,
                }
            }
        } else {
            return {
                isValid: false,
                message: 'Course discount price must be a number!',
            }
        }
    }

    // validating location
    if (location) {
        if (typeof location !== 'string') {
            return {
                isValid: false,
                message: 'Location must be a string!',
            }
        }
    } 

    // validating priority
    if (priority) {
        if (typeof priority !== 'string') {
            return {
                isValid: false,
                message: 'Priority must be a string!',
            }
        }
    } 

    return {
        isValid: true,
    }
}

module.exports = validateCourseInputs
