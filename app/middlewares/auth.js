const jwt = require('jsonwebtoken')

module.exports = {
    auth: (req, res, next) => {
        const token = req.cookies['auth-token']
        if(!token){
            return res.status(403).send('Acces interdit!')
        }
        try{
            
            const verified = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
            // If everything is ok we can add that to our req.user
            req.user = verified
            
            console.log(`Le token vient d'etre verifier avec cet id :  ${req.user.id} `)
            next()
        } catch(e){
            res.status(403).send('Token invalide')
        }
    },

  }