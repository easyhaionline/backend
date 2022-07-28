const { unlink } = require('fs')

const deleteFile = (path) => {
    unlink(path, (err) => {
        if (err) {
            throw new Error('Something went wrong while deleting the file!')
        }
    })
}

module.exports = deleteFile;
