const JWT = require("jsonwebtoken");
const userSecret = process.env.USER_key;
const adminSecret = process.env.ADMIN_key;

function createTokenForUser(user){
    const upayload = {
        _id : user._id,
        name : user.name,
        email: user.email,
        role: user.role,
    }

    const usertoken = JWT.sign(upayload, userSecret);
    return usertoken;
}

function verifyuserToken(usertoken){
    try {
        const payload = JWT.verify(usertoken, userSecret);
        return payload;
    } catch (error) {
        console.error("User token verification error:", error);
        throw new Error("Invalid user token");
    }
}

function createTokenForAdmin(admin){
    const apayload = {
        _id : admin._id,
        name : admin.name,
        username: admin.username,
        role: admin.role,
    }

    const admintoken = JWT.sign(apayload, adminSecret);
    return admintoken;
}

function verifyadminToken(admintoken){
    try {
        const payload = JWT.verify(admintoken, adminSecret);
        return payload;
    } catch (error) {
        console.error("Admin token verification error:", error);
        throw new Error("Invalid admin token");
    }
}

module.exports = {
    createTokenForUser,
    verifyuserToken,
    createTokenForAdmin,
    verifyadminToken,
};