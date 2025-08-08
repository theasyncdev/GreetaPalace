// Script to reset and recreate admin account
const mongoose = require('mongoose');
const Admin = require('./model/admin');
require('dotenv').config();

const testAdmin = {
    name: 'Test Admin',
    email: 'admin@test.com',
    username: 'admin',
    password: 'admin123'
};

async function resetAdmin() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/greta_palace');
        console.log('✓ Connected to database');

        // Delete existing admin
        const deletedAdmin = await Admin.findOneAndDelete({ username: testAdmin.username });
        if (deletedAdmin) {
            console.log('✓ Deleted existing admin account');
        } else {
            console.log('✓ No existing admin account found');
        }

        // Create new admin
        console.log('Creating new admin account...');
        const newAdmin = await Admin.create(testAdmin);
        console.log('✓ New admin created successfully');
        console.log('  - ID:', newAdmin._id);
        console.log('  - Username:', newAdmin.username);
        console.log('  - Email:', newAdmin.email);
        console.log('  - Has Password:', !!newAdmin.password);
        console.log('  - Has Salt:', !!newAdmin.salt);

        // Test login
        console.log('\nTesting login...');
        try {
            const token = await Admin.matchadminpassword(testAdmin.username, testAdmin.password);
            console.log('✓ Login test successful!');
            console.log('  - Token generated:', token.substring(0, 20) + '...');
        } catch (error) {
            console.log('✗ Login test failed:', error.message);
        }

        console.log('\n✓ Admin reset completed!');
        console.log('You can now login with:');
        console.log('  - Username: admin');
        console.log('  - Password: admin123');
        
    } catch (error) {
        console.error('✗ Reset failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('✓ Disconnected from database');
    }
}

// Run reset if this file is executed directly
if (require.main === module) {
    resetAdmin();
}

module.exports = { resetAdmin }; 