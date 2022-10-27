const asyncwrapper = (fnc) => {

    return async (req, res, next) => {
        try {
            fnc(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = asyncwrapper;