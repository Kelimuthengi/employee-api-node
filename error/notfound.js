const pageNotFound = (req, res,) => {
    try {
        res.status(404).json({success:false, message:'page has not been found!'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = pageNotFound 