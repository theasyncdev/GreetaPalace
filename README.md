# Greta Palace Hotel Management System

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [User Roles & Permissions](#user-roles--permissions)
- [File Structure](#file-structure)
- [Deployment](#deployment)
- [Contributing](#contributing)

## 🏨 Overview

Greta Palace is a comprehensive hotel management system built with Node.js, Express, and MongoDB. The system provides a complete solution for hotel operations including room management, booking system, user management, and administrative controls.

### Key Features
- **Multi-role authentication** (Admin/User)
- **Room booking system** with date validation
- **Real-time room availability** tracking
- **Admin dashboard** for hotel management
- **User profile management** with image upload
- **Responsive modern UI** with animations
- **Booking status management** (Booked, Checked-In, Completed, Cancelled)

## ✨ Features

### For Users
- 🔐 **User Registration & Login** with secure authentication
- 🏠 **Room Browsing** with detailed descriptions and images
- 📅 **Date-based Booking** with availability checking
- 💳 **Booking Management** with status tracking
- 👤 **Profile Management** with image upload
- 📱 **Responsive Design** for all devices

### For Administrators
- 🎛️ **Admin Dashboard** with comprehensive overview
- 🏨 **Room Management** (Add, Edit, Delete rooms)
- 👥 **User Management** with search functionality
- 📊 **Booking Management** with status updates
- 📈 **Analytics & Reports** (coming soon)
- 🔧 **System Configuration** and settings

## 🛠️ Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **Multer** - File upload handling
- **Express Session** - Session management
- **Connect Flash** - Flash messages

### Frontend
- **EJS** - Template engine
- **CSS3** - Styling with modern features
- **JavaScript (ES6+)** - Client-side functionality
- **GSAP** - Advanced animations
- **Font Awesome** - Icons
- **Google Fonts** - Typography

### Development Tools
- **Nodemon** - Development server
- **Morgan** - HTTP request logger
- **Dotenv** - Environment variables

## 📁 Project Structure

```
greeta_palace/
├── apis/                    # API endpoints
│   └── apis.js             # REST API routes
├── controllers/             # Business logic
│   ├── admin.js            # Admin operations
│   ├── booking.js          # Booking operations
│   └── user.js             # User operations
├── middlewares/            # Custom middleware
│   ├── auth.js             # Authentication middleware
│   └── bookingdatecheck.js # Booking validation
├── model/                  # Database models
│   ├── admin.js            # Admin model
│   ├── booking.js          # Booking model
│   ├── room.js             # Room model
│   └── user.js             # User model
├── public/                 # Static assets
│   ├── css/                # Stylesheets
│   ├── images/             # Images
│   ├── js/                 # JavaScript files
│   └── uploads/            # User uploads
├── routes/                 # Route handlers
│   ├── admin.js            # Admin routes
│   ├── static.js           # Static pages
│   └── user.js             # User routes
├── services/               # Business services
│   ├── auth.js             # Authentication service
│   └── multer.js           # File upload service
├── views/                  # EJS templates
│   ├── partials/           # Reusable components
│   └── *.ejs              # Page templates
├── app.js                  # Main application file
├── conn.js                 # Database connection
├── package.json            # Dependencies
└── .env                    # Environment variables
```

## 🚀 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd greeta_palace
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Database Setup**
   ```bash
   # Start MongoDB service
   mongod
   ```

5. **Start the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Access the application**
   - Frontend: `http://localhost:3000`
   - Admin Panel: `http://localhost:3000/admin/login`

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGO_URL=mongodb://localhost:27017/greta_palace

# JWT Secrets
USER_key=your_user_jwt_secret_here
ADMIN_key=your_admin_jwt_secret_here

# Session Secret
SESSION_SECRET=your_session_secret_here
```

## 📚 API Documentation

### Authentication Endpoints

#### User Authentication
```http
POST /user/login
POST /user/register
GET /user/logout
```

#### Admin Authentication
```http
POST /admin/login
POST /admin/register
GET /admin/logout
```

### Room Management API

#### Get All Rooms
```http
GET /api/getrooms?page=1&limit=4
```

#### Room Operations (Admin)
```http
POST /admin/rooms                    # Add new room
GET /admin/updaterooms/:id          # Update room form
POST /admin/updaterooms/:id         # Update room
GET /admin/deleteroom/:id           # Delete room
```

### Booking API

#### User Booking
```http
GET /user/bookroom/:id              # Booking form
POST /user/bookroom/:id             # Create booking
GET /user/bookings                  # User's bookings
POST /user/booking/cancel/:id       # Cancel booking
```

#### Admin Booking Management
```http
GET /admin/bookings                 # All bookings
POST /admin/booking/updatebooking/:id  # Update booking status
```

### User Management API

#### User Operations
```http
GET /user/profile                   # User profile
POST /user/updateprofile            # Update profile
```

#### Admin User Management
```http
GET /admin/users                    # All users
GET /admin/userinfo/:id             # User details
```

## 🗄️ Database Schema

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: Number (required, unique),
  Address: String,
  password: String (required, hashed),
  role: String (default: "User"),
  bookings: [ObjectId] (ref: "booking"),
  userImg: String,
  createdAt: Date
}
```

### Room Model
```javascript
{
  roomName: String (required),
  roomDesc: String (required),
  price: Number (required),
  totallRooms: Number (required),
  occupiedRoom: Number (default: 0),
  availableRooms: Number,
  currentBookings: [ObjectId] (ref: "booking"),
  roomImg: String
}
```

### Booking Model
```javascript
{
  checkInDate: String (required),
  checkOutDate: String (required),
  Nights: Number (required),
  BookedBy: ObjectId (ref: "user"),
  bookedRoom: {
    roomName: String,
    room_id: String
  },
  guestNum: Number (required),
  totallCost: Number (required),
  status: String (enum: ['Booked', 'completed', 'checked-In', 'cancelled']),
  CreatedAt: Date
}
```

## 👥 User Roles & Permissions

### User Role
- **Access**: Public pages, room browsing
- **Authentication**: Register/Login required for booking
- **Permissions**:
  - View available rooms
  - Make bookings
  - Manage personal bookings
  - Update profile
  - Cancel own bookings

### Admin Role
- **Access**: Admin dashboard and management tools
- **Authentication**: Admin login required
- **Permissions**:
  - Full system access
  - Room management (CRUD)
  - User management
  - Booking management
  - System configuration

## 🔐 Security Features

- **Password Hashing**: SHA-256 with salt
- **JWT Authentication**: Secure token-based auth
- **Session Management**: Express sessions
- **Input Validation**: Server-side validation
- **File Upload Security**: Multer with validation
- **CSRF Protection**: Built-in Express protection
- **XSS Prevention**: Input sanitization

## 🎨 UI/UX Features

### Modern Design
- **Responsive Layout**: Mobile-first approach
- **Modern Animations**: GSAP-powered animations
- **Gradient Design**: Professional color schemes
- **Interactive Elements**: Hover effects and transitions
- **Loading States**: User feedback for actions

### User Experience
- **Intuitive Navigation**: Clear menu structure
- **Form Validation**: Real-time validation
- **Flash Messages**: Success/error notifications
- **Pagination**: Efficient data loading
- **Search Functionality**: Quick data access

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment

1. **Environment Setup**
   ```bash
   NODE_ENV=production
   PORT=3000
   ```

2. **Database Setup**
   - Configure MongoDB connection
   - Set up indexes for performance

3. **File Uploads**
   - Configure static file serving
   - Set up cloud storage (optional)

4. **Security**
   - Enable HTTPS
   - Configure CORS
   - Set up rate limiting

### Deployment Platforms
- **Heroku**: Easy deployment with Git
- **Vercel**: Serverless deployment
- **AWS**: Scalable cloud deployment
- **DigitalOcean**: VPS deployment

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Room booking functionality
- [ ] Admin dashboard access
- [ ] Room management operations
- [ ] Booking status updates
- [ ] File upload functionality
- [ ] Responsive design testing
- [ ] Cross-browser compatibility

### Automated Testing (Future)
- Unit tests with Jest
- Integration tests
- E2E tests with Cypress
- API testing with Supertest

## 🔧 Configuration

### Database Configuration
```javascript
// conn.js
const dbconn = mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### Session Configuration
```javascript
// app.js
app.use(expressSession({
  resave: false,
  cookie: { maxAge: 60000 },
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET
}));
```

### File Upload Configuration
```javascript
// services/multer.js
const upload = multer({
  dest: 'public/uploads/',
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});
```

## 📈 Performance Optimization

### Current Optimizations
- **Database Indexing**: Optimized queries
- **Pagination**: Efficient data loading
- **Image Optimization**: Compressed uploads
- **Caching**: Session-based caching
- **CDN Ready**: Static asset optimization

### Future Optimizations
- **Redis Caching**: Session and data caching
- **Database Optimization**: Query optimization
- **Image CDN**: Cloud image hosting
- **Compression**: Gzip compression
- **Load Balancing**: Multiple server instances

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Code Standards
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **Conventional Commits**: Commit message format
- **Documentation**: Inline code comments

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- **Email**: support@gretapalace.com
- **Documentation**: [Wiki Link]
- **Issues**: GitHub Issues

## 🔄 Version History

### v1.0.0 (Current)
- Initial release
- Complete hotel management system
- User and admin functionality
- Modern responsive UI
- Booking system with validation

### Future Versions
- **v1.1.0**: Advanced analytics
- **v1.2.0**: Mobile app integration
- **v1.3.0**: Payment gateway integration
- **v2.0.0**: Multi-hotel support

---

**Built with ❤️ for Greta Palace Hotel Management** 