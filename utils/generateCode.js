// to generate a UNIQUE code for a document *************************************
const generateCode = (type = 'DEFAULT', name = 'Document Name') => {
    let code = type.toUpperCase()[0]

    const nameSplitArray = name.toUpperCase().split(' ')

    nameSplitArray.forEach((fragment) => {
        code =
            code +
            '_' +
            fragment[0] +
            (fragment[1] ? fragment[1] : '') +
            (fragment[2] ? fragment[2] : '')
    })

    code = code + '__' + 0

    return code
}

// to regenerate the code in case of collision **********************************
const regenerateCode = (code) => {
    const codeSplitArray = code.split('__')

    const lastCount = Number(codeSplitArray[1])

    const newCode = codeSplitArray[0] + '__' + (lastCount + 1)

    return newCode
}

module.exports = { generateCode, regenerateCode }
