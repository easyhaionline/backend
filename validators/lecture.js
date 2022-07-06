const validateMongoID = require('./id')
const validateTypeRequire = require('./type-require')

const validType = ['LIVE', 'RECORDED', 'CAPSULE']

const validateLectureInputs = (inputData) => {
    const {title,description, link, standard, subject, chapter,date,startingtime,duration, topic, practiceTests, type, zoomLink } =
        inputData

    // validating lecture name
    const { isValid: isValidName, message: messageName } = validateTypeRequire(
        'string',
        'Title',
        title
    )
    if (!isValidName) {
        return {
            isValid: isValidName,
            message: messageName,
        }
    }

    // validating lecture link
  if(link){  const { isValid: isValidLink, message: messageLink } = validateTypeRequire(
        'string',
        'Link',
        link
    )
    if (!isValidLink) {
        return {
            isValid: isValidLink,
            message: messageLink,
        }
    }}

    const { isValid: isValidStandard, message: messageStandard } =
        validateMongoID(standard)
    if (!isValidStandard) {
        return {
            isValid: isValidStandard,
            message: messageStandard,
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
    if (date) {
        if (typeof date !== 'string') {
            return {
                isValid: false,
                message: 'Date must be of type string',
            }
        }
    }
    if (duration) {
        if (typeof duration !== 'string') {
            return {
                isValid: false,
                message: 'Duration must be of type string',
            }
        }
    }
    if (startingtime) {
        if (typeof startingtime !== 'string') {
            return {
                isValid: false,
                message: 'startingtime must be of type string',
            }
        }
    }

    if (description) {
        if (typeof description !== 'string') {
            return {
                isValid: false,
                message: 'Topic must be of type string',
            }
        }
    }



    // validating question type
   if(type){ const { isValid: isValidType, message: messageType } = validateTypeRequire(
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
            message: 'Invalid Lecture Type',
        }
    }
}
    if (practiceTests) {
        if (Array.isArray(practiceTests)) {
            for (let i = 0; i < practiceTests.length; i++) {
                let { isValid: isValidTestID, message: messageTestID } =
                    validateMongoID(practiceTests)
                if (!isValidTestID) {
                    return {
                        isValid: false,
                        message: messageTestID,
                    }
                }
            }
        } else {
            return {
                isValid: false,
                message: 'practice test should be an array',
            }
        }
    }

    return {
        isValid: true,
    }
}

module.exports = validateLectureInputs
