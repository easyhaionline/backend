const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validType = ['SINGLE-CORRECT', 'MULTIPLE-CORRECT', 'INTEGER', 'ASSERTION']
const validDifficulty = ['EASY', 'MEDIUM', 'HARD']
const validMonth = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
]

const validateQuestionInputs = (inputData) => {
    const {
        statement,
        image,
        options,
        correctOptions,
        solution,
        hint,
        difficulty,
        type,
        subject,
        chapter,
        topic,
        time,
        marks,
        negativeMarks,
        previousYear,
    } = inputData

    // validating question statement
    const { isValid: isValidStatement, message: messageStatement } = validateTypeRequire(
        'string',
        'Statement',
        statement
    )
    if (!isValidStatement) {
        return {
            isValid: isValidStatement,
            message: messageStatement,
        }
    }

    // validating question image
    const { isValid: isValidImage, message: messageImage } = validateTypeRequire(
        'string',
        'Image',
        image
    )
    if (!isValidImage) {
        return {
            isValid: isValidImage,
            message: messageImage,
        }
    }

    // validating question solution
    const { isValid: isValidSolution, message: messageSolution } = validateTypeRequire(
        'string',
        'Solution',
        solution
    )
    if (!isValidSolution) {
        return {
            isValid: isValidSolution,
            message: messageSolution,
        }
    }

    if (hint) {
        if (typeof hint !== 'string') {
            return {
                isValid: false,
                message: 'Hint must be of type string',
            }
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

    // validating question type
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

    // validating question difficulty
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

    // validating question marks
    const { isValid: isValidMarks, message: messageMarks } = validateTypeRequire(
        'number',
        'Marks',
        marks
    )
    if (!isValidMarks) {
        return {
            isValid: isValidMarks,
            message: messageMarks,
        }
    }

    if (marks < 0) {
        return {
            isValid: false,
            message: 'Marks should be positive',
        }
    }

    if (negativeMarks) {
        if (typeof negativeMarks !== 'number') {
            return {
                isValid: false,
                message: 'Negative marks should be an integer!',
            }
        } else {
            if (negativeMarks > 0) {
                return {
                    isValid: false,
                    message: 'Negative marks should be negative!',
                }
            }
        }
    }

    if (previousYear) {
        if (typeof previousYear !== 'string') {
            return {
                isValid: false,
                message: "Previous should be of type string 'MMYYYY'",
            }
        } else {
            if (!validMonth.includes(previousYear.substring(0, 2))) {
                return {
                    isValid: false,
                    message: 'Invalid Month!',
                }
            }
            if (previousYear.substring(2).length !== 4) {
                return {
                    isValid: false,
                    message: 'Invalid Year!',
                }
            }
        }
    }

    if (options) {
        if (Array.isArray(options)) {
            // logic to be added
        } else {
            return {
                isValid: false,
                message: `Options must be an array, in case of integers provide an empty array!`,
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Options are required, in case of integers provide an empty array!',
        }
    }

    if (correctOptions) {
        if (Array.isArray(correctOptions)) {
            // logic to be added
            if (correctOptions.length < 1) {
            }
        } else {
            return {
                isValid: false,
                message: `Options must be an array, in case of integers provide an empty array!`,
            }
        }
    } else {
        return {
            isValid: false,
            message: 'Correct Options are required!',
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateQuestionInputs
