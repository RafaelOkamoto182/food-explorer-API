const AppError = require("../utils/AppError")

function verifyUserAuthorization(requiredRoles) {
    return (req, res, next) => {
        const { role } = req.user

        //desse jeito funciona caso mais de uma role tenha autorização
        if (!requiredRoles.includes(role)) {
            throw new AppError("Unauthorized", 401)
        }

        return next()
    }

}

module.exports = verifyUserAuthorization
