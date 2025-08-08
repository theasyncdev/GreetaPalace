const mongoose = require('mongoose');
const {createHmac, randomBytes} = require('crypto');
const {createTokenForAdmin} = require('../services/auth');

const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  salt:{
    type:String
  },
  role: {
    type: String,
    default: 'Admin'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

adminSchema.pre("save", function(next) {
    const admin = this;

    if(!admin.isModified("password")) return;

    const salt = randomBytes(16).toString();
    const hashedPassword = createHmac("sha256", salt).update(admin.password).digest("hex");
    
    this.salt = salt;
    this.password = hashedPassword;
    
    next();
});

adminSchema.static('matchadminpassword', async function(username, password){
    try {
        const admin = await this.findOne({username});
        
        if (!admin) {
            throw new Error("Invalid username or password");
        }

        const salt = admin.salt;
        const hashedPassword = admin.password;

        const adminProvidedpass = createHmac("sha256", salt).update(password).digest("hex");
       
        if(hashedPassword !== adminProvidedpass) {
            throw new Error("Invalid username or password");
        }
        
        const admintoken = createTokenForAdmin(admin);
        return admintoken;
    } catch (error) {
        console.error("Admin authentication error:", error);
        throw new Error("Invalid username or password");
    }
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;
