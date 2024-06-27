var jwt = require('jsonwebtoken');

const authAdmin = (req, res, next) =>{

    const authToken = req.header('admin-auth-token');

    try {
        if(!authToken)
        {
            throw 'Invalid admin token';    
        }
        else {
            var decoded = jwt.verify(req.header('admin-auth-token'), process.env.ADMIN_SECRET);
            req.header.adminId = decoded.adminId;
            next();
            
        }
    } catch (error) {
        res.status(400);
        res.send(error);
    }
}

module.exports = authAdmin;

