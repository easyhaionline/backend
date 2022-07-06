const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validType = ['PRACTICE', 'SERIES', 'ASSIGNMENT', ' PREVIOUS', 'PREPARATORY']
const validDifficulty = ['EASY', 'MEDIUM', 'HARD']

const validateTestInputs = (inputData) => {
    const { name, date, time, totalMarks, subject, chapter, topic, type, difficulty ,question} =
        inputData

    // validating test name
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

    const { isValid: isValidSubject, message: messageSubject } = validateMongoID(subject)
    if (!isValidSubject) {
        return {
            isValid: isValidSubject,
            message: messageSubject,
        }
    }

    const { isValid: isValidChapter, message: messageChapter } = validateMongoID(chapter)
    if (!isValidChapter) {
        return {
            isValid: isValidChapter,
            message: messageChapter,
        }
    }

    if (topic) {
        if (typeof topic !== 'string') {
            return {
                isValid: false,
                message: 'Topic must be of type string',
            }
        }
    }

    // validating test marks
    const { isValid: isValidMarks, message: messageMarks } = validateTypeRequire(
        'number',
        'Total Marks',
        totalMarks
    )
    if (!isValidMarks) {
        return {
            isValid: isValidMarks,
            message: messageMarks,
        }
    }

    if (totalMarks < 0) {
        return {
            isValid: false,
            message: 'Marks should be positive',
        }
    }

    // validating test type
    const { isValid: isValidType, message: messageType } = validateTypeRequire(
        'string',
        'Type',
        type
    )
    if (!isValidType) {
        return {
            isValid: isValidType,
            message: messageType,
        }
    }

    if (!validType.includes(type)) {
        return {
            isValid: false,
            message: 'Invalid Question Type',
        }
    }

    // validating test difficulty
    const { isValid: isValidDifficulty, message: messageDifficulty } =
        validateTypeRequire('string', 'Difficulty', difficulty)
    if (!isValidDifficulty) {
        return {
            isValid: isValidDifficulty,
            message: messageDifficulty,
        }
    }

    if (!validDifficulty.includes(difficulty)) {
        return {
            isValid: false,
            message: 'Invalid Question Difficulty',
        }
    }

    if (time) {
        if (typeof time !== 'number') {
            return {
                isValid: false,
                message: 'Time should be of type Number!',
            }
        } else {
            if (time < 10) {
                return {
                    isValid: false,
                    message: 'Time should be at least 10sec!',
                }
            }
        }
    }

    // validating date
    if (date) {
        if (typeof date !== 'string') {
            return {
                isValid: false,
                message: 'Date must be a string!',
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Date is needed!',
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateTestInputs
