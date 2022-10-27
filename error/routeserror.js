const { CustomError } = require("../error/customerror");

const controllererror = (err, req, res, next) => {
    if(err instanceof CustomError){
        return res.status(err.statusccode).json({ message: err.message });
    }
    return res.status(500).json({message:err.message});
}

module.exports = controllererror;