const jwt = require('jsonwebtoken')

function JWTAuthMiddleWare(req, res, next){
    let token = req.headers.authorization.split(" ")[1]
    // console.log("JWTAUthToken>>>", token)
    if (token) {
        let userData = jwt.verify(token, process.env.jwt_secret_key)
        if(userData){
            req.body.id = userData.id
        }
        else{
            req.body.id = null
        }
    }
    else {
        req.body = null
    }
    next()
}

module.exports = JWTAuthMiddleWare