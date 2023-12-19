const fs = require('fs')
const path = require('path')
const uploadConfig = require("../configs/upload")

class DiskStorage {

    async saveFile(fileName) {
        try {
            await fs.promises.rename(
                path.resolve(uploadConfig.TMP_FOLDER, fileName),
                path.resolve(uploadConfig.UPLOADS_FOLDER, fileName)
            )

            return fileName

        } catch (e) {
            return e.message
        }
    }

    async deleteFile(fileName) {
        const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, fileName)

        try {
            await fs.promises.stat(filePath)

            await fs.promises.unlink(filePath)
        } catch (e) {
            return e.message
        }
    }
}

module.exports = DiskStorage