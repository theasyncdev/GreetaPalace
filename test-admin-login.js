// Test script for admin login functionality
const mongoose = require('mongoose');
const Admin = require('./model/admin');
require('dotenv').config();

// Test admin credentials
const testAdmin = {
    name: 'Test Admin',
    email: 'admin@test.com',
    username: 'admin',
    password: 'admin123'
};

async function testAdminLogin() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost:27017/greta_palace');
        console.log('✓ Connected to database');

        // Check if admin exists
        const existingAdmin = await Admin.findOne({ username: testAdmin.username });
        
        if (!existingAdmin) {
            console.log('Creating test admin...');
            const newAdmin = await Admin.create(testAdmin);
            console.log('✓ Test admin created successfully');
            console.log('  - ID:', newAdmin._id);
            console.log('  - Username:', newAdmin.username);
            console.log('  - Has Password:', !!newAdmin.password);
            console.log('  - Has Salt:', !!newAdmin.salt);
        } else {
            console.log('✓ Test admin already exists');
        }

        // Test login with correct credentials
        console.log('\nTesting admin login with correct credentials...');
        try {
            const token = await Admin.matchadminpassword(testAdmin.username, testAdmin.password);
            console.log('✓ Login successful!');
            console.log('  - Token:', token.substring(0, 20) + '...');
        } catch (error) {
            console.log('✗ Login failed:', error.message);
        }

        // Test login with wrong password
        console.log('\nTesting admin login with wrong password...');
        try {
            await Admin.matchadminpassword(testAdmin.username, 'wrongpassword');
            console.log('✗ ERROR: Invalid login should have failed');
        } catch (error) {
            console.log('✓ Invalid login correctly rejected:', error.message);
        }

        // Test login with non-existent username
        console.log('\nTesting admin login with non-existent username...');
        try {
            await Admin.matchadminpassword('nonexistent', testAdmin.password);
            console.log('✗ ERROR: Non-existent username should have failed');
        } catch (error) {
            console.log('✓ Non-existent username correctly rejected:', error.message);
        }

        console.log('\n✓ All tests completed!');
        
    } catch (error) {
        console.error('✗ Test failed:', error);
    } finally {
        await mongoose.disconnect();
        console.log('✓ Disconnected from database');
    }
}

// Run test if this file is executed directly
if (require.main === module) {
    testAdminLogin();
}

module.exports = { testAdminLogin }; 