const validatebatchesInput = (inputData) => {
    const {
        title,   duration, timing,  subjects,selling_price,  listed_price
    } = inputData

    if (title) {
        if (typeof title !== 'string') {
            return {
                isValid: false,
                message: 'title must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'title is needed!',
        }
    }
 

    if (duration) {
        if (typeof duration !== 'string') {
            return {
                isValid: false,
                message: 'duration must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'duration is needed!',
        }
    }
 

    if (timing) {
        if (typeof timing !== 'string') {
            return {
                isValid: false,
                message: 'timing must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'timing is needed!',
        }
    }
 

    if (selling_price ) {
        if (typeof selling_price  !== 'number') {
            return {
                isValid: false,
                message: 'selling_price  must be a number!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'selling_price  is needed!',
        }
    }
 

    if (listed_price ) {
        if (typeof listed_price  !== 'number') {
            return {
                isValid: false,
                message: 'listed_price  must be a number!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'listed_price  is needed!',
        }
    }
 


}

module.exports = validatebatchesInput
