const Admin = require('../model/admin');
const Room = require('../model/room');

async function handleAdminRegister(req, res) {
    const {name, email, username, password} = req.body;
    
    try {
        // Check if admin already exists
        const existingAdmin = await Admin.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        if (existingAdmin) {
            return res.render("adminregister", {
                error: "Admin with this username or email already exists."
            });
        }

        // Create new admin
        await Admin.create({
            name,
            email,
            username,
            password,
        });
        
        res.redirect("/admin/login");
    } catch (error) {
        console.error("Admin registration error:", error);
        res.render("adminregister", {
            error: "Failed to create admin account. Please try again."
        });
    }
}

async function handleAdminLogin(req, res) {
    const {username, password} = req.body;
    
    try {
        // Validate input
        if (!username || !password) {
            return res.render("adminlogin", {
                error: "Please provide both username and password."
            });
        }

        const token = await Admin.matchadminpassword(username, password);
        
        res.cookie("aid", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).redirect("/admin/dashboard");
    } catch (error) {
        console.error("Admin login error:", error);
        res.render("adminlogin", {
            error: "Invalid username or password. Please try again."
        });
    }
}

function adminLogout(req, res) {
    res.clearCookie("aid").redirect("/admin/login");
}

module.exports = {
    handleAdminLogin,
    handleAdminRegister,
    adminLogout,
}