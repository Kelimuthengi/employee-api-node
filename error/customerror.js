class CustomError extends Error {
    constructor(message, statusccode){
        super(message)
        this.statusccode = statusccode;
    }
}

// const newError = new CustomError('please add your name', 401)

const createCustomError = (msg, statcode) => {
    return new CustomError(msg, statcode);
}

module.exports = {CustomError, createCustomError};
