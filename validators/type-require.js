const validateTypeRequire = (inputType, inputName, inputValue = null) => {
    if (inputValue !== null || inputValue !== undefined) {
        if (typeof inputValue !== inputType) {
            return { isValid: false, message: `${inputName} must be ${inputType}!` }
        }
    } else {
        return { isValid: false, message: `${inputName} is required!` }
    }
    return { isValid: true }
}

module.exports = validateTypeRequire
