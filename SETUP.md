# MedShare - Full Stack Setup Guide

This guide will help you set up and run the MedShare application locally.

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## 🚀 Quick Start

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your MongoDB connection string
# For local MongoDB: mongodb://localhost:27017/medi_soft
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/medi_soft

# Start the backend server
npm run dev
```

The backend will run on `http://localhost:5000`

### 2. Frontend Setup

```bash
# Navigate to project root
cd ..

# Install dependencies
npm install

# Create .env file (optional, defaults to http://localhost:5000/api)
cp .env.example .env

# Start the frontend development server
npm run dev
```

The frontend will run on `http://localhost:3000` (or the port Vite assigns)

## 🔧 Environment Variables

### Backend (.env in backend/ directory)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medi_soft
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

### Frontend (.env in root directory)

```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing the Application

1. **Register Test Accounts:**
   - Create a Donor account
   - Create a Receiver account
   - Create a Verifier account

2. **Test Flow:**
   - Login as Donor → Upload a medicine
   - Login as Verifier → View pending medicines → Approve/Reject
   - Login as Receiver → Browse marketplace → Request medicine
   - Check notifications for all users

## 📁 Project Structure

```
medi_soft/
├── backend/              # Node.js + Express backend
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & role middleware
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── uploads/         # Uploaded images
│   ├── utils/           # Utility functions
│   ├── server.js        # Express server
│   └── package.json
├── src/                 # React frontend
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── utils/           # API utilities
│   └── ...
└── package.json
```

## 🚢 Deployment

### Backend Deployment (Render/Railway)

1. Push code to GitHub
2. Connect repository to your deployment platform
3. Set environment variables:
   - `MONGO_URI` (MongoDB Atlas connection string)
   - `JWT_SECRET` (strong random secret)
   - `CORS_ORIGIN` (your frontend URL)
4. Deploy!

### Frontend Deployment (Vercel/Netlify)

1. Push code to GitHub
2. Connect repository to your deployment platform
3. Set environment variable:
   - `VITE_API_URL` (your backend API URL)
4. Deploy!

## 🔍 Troubleshooting

**Backend won't start:**
- Check MongoDB is running (if using local)
- Verify `.env` file exists and has correct values
- Check port 5000 is not in use

**Frontend can't connect to backend:**
- Verify backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env`
- Check CORS settings in backend `.env`

**File uploads not working:**
- Ensure `backend/uploads/` directory exists
- Check file size (max 10MB)
- Verify file type (images only)

**Authentication issues:**
- Clear browser localStorage
- Check JWT_SECRET is set correctly
- Verify token is being sent in requests

## 📚 API Documentation

See `backend/README.md` for complete API documentation.

## 🎯 Features

- ✅ User Authentication (JWT)
- ✅ Role-based Access Control (Donor/Receiver/Verifier)
- ✅ Medicine Upload with Image
- ✅ Verification System
- ✅ Marketplace with Filters
- ✅ Notifications
- ✅ AI Expiry Validation (Placeholder)

## 📝 Notes

- Images are stored in `backend/uploads/`
- Passwords are hashed with bcryptjs
- JWT tokens expire after 30 days
- All API endpoints are documented in `backend/README.md`

