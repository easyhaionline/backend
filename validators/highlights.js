const validateHighlightsInput = (highlights, type = 4) => {
    const inputType = type === 3 ? 'Detail' : 'Highlight'

    // validating highlights
    if (highlights) {
        if (Array.isArray(highlights)) {
            if (highlights.length < 1 && highlights.length > type) {
                return {
                    isValid: false,
                    message: `${inputType}s can have minimum one ${inputType} and maximum ${type} ${inputType}s!`,
                }
            } else {
                for (let i = 0; i < highlights.length; i++) {
                    if (typeof highlights[i] === 'object' && highlights[i] !== null) {
                        if (
                            !highlights[i].hasOwnProperty('title') ||
                            !highlights[i].hasOwnProperty('body') ||
                            !highlights[i].hasOwnProperty('image')
                        ) {
                            return {
                                isValid: false,
                                message: `Each ${inputType} must have title, body and image!`,
                            }
                        } else {
                            if (!highlights[i].title) {
                                return {
                                    isValid: false,
                                    message: `Each ${inputType} must have title.`,
                                }
                            } else {
                                if (typeof highlights[i].title !== 'string') {
                                    return {
                                        isValid: false,
                                        message: `Each ${inputType} title must be string`,
                                    }
                                }
                            }

                            if (!highlights[i].body) {
                                return {
                                    isValid: false,
                                    message: `Each ${inputType} must have body.`,
                                }
                            } else {
                                if (typeof highlights[i].body !== 'string') {
                                    return {
                                        isValid: false,
                                        message: `Each ${inputType} body must be string`,
                                    }
                                }
                            }

                            if (!highlights[i].image) {
                                return {
                                    isValid: false,
                                    message: `Each ${inputType} must have image.`,
                                }
                            } else {
                                if (typeof highlights[i].image !== 'string') {
                                    return {
                                        isValid: false,
                                        message: `Each ${inputType} image must be string`,
                                    }
                                }
                            }
                        }
                    } else {
                        return {
                            isValid: false,
                            message: `${inputType}s must be an array of objects!`,
                        }
                    }
                }
            }
        } else {
            return {
                isValid: false,
                message: `${inputType}s must be an array!`,
            }
        }
    } else {
        return {
            isValid: false,
            message: `${inputType} is needed!`,
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateHighlightsInput
