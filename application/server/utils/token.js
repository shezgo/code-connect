
const jwt = require('jsonwebtoken');

exports.make_rest_token = (email)=>{
    return jwt.sign({
        data: `reset/${email}`
    }, process.env.TOKEN_SECRET, { expiresIn: '15m' })    
}

exports.make_verify_token = (email)=>{
    return jwt.sign({
        data: `verify/${email}`
    }, process.env.TOKEN_SECRET, { expiresIn: '15m' })    
}

const decode_token = (token)=>{
    // Verifying the JWT token 
   return jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) {
        if (err) {
            throw err;
        }
        else {
            return decoded;
        }
    });
}
exports.get_verify_email = (token)=>{
    const decoded_data = decode_token(token).data
    if(decoded_data.indexOf('verify/')===-1) throw Error('Verify token is not correct')
    return decoded_data.split('/')[1]
}
exports.get_reset_email = (token)=>{
    const decoded_data = decode_token(token).data
    if(decoded_data.indexOf('reset/')===-1) throw Error('Reset token is not correct')
    return decoded_data.split('/')[1]
}


