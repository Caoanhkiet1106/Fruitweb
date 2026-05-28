const jwt = require('jsonwebtoken')


const genarateAccessToken = (user) =>{
    return jwt.sign({
        id:user.id,
        admin:user.isadmin
    },
    process.env.JWT_ACCESS_KEY,
    {
        expiresIn : "1d"
    }
)
}

const genarateRefreshToken = (user) =>{
    return jwt.sign({
        id:user.id,
        admin:user.isadmin
    },
    process.env.JWT_REFRESH_KEY,
    {
        expiresIn : "7d"
    }
)
}

module.exports = {genarateAccessToken, genarateRefreshToken}