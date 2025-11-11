# MedShare Backend API

A Node.js + Express + MongoDB backend for the MedShare medicine donation platform.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/medi_soft
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

## 📚 API Endpoints

### Authentication

#### Register User
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "donor" // or "receiver" or "verifier"
}
```

#### Login
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Profile
- **GET** `/api/auth/profile`
- **Headers:** `Authorization: Bearer <token>`

### Medicines

#### Upload Medicine (Donor only)
- **POST** `/api/medicines/upload`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** FormData with:
  - `name`: string
  - `manufacturer`: string
  - `expiryDate`: date
  - `quantity`: number
  - `condition`: "New" | "Opened"
  - `photo`: file (image)

#### Get My Uploads (Donor only)
- **GET** `/api/medicines/myuploads`
- **Headers:** `Authorization: Bearer <token>`

#### Get Pending Medicines (Verifier only)
- **GET** `/api/medicines/pending`
- **Headers:** `Authorization: Bearer <token>`

#### Approve/Reject Medicine (Verifier only)
- **PATCH** `/api/medicines/:id/approve`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "status": "Approved" | "Rejected",
  "verificationNotes": "Optional notes"
}
```

#### Get Marketplace Medicines
- **GET** `/api/medicines/marketplace`
- **Query Params:**
  - `search`: string (optional)
  - `expiryBefore`: date (optional)
  - `condition`: "New" | "Opened" (optional)

### Verification

#### Get Pending Verifications (Verifier only)
- **GET** `/api/verify/pending`
- **Headers:** `Authorization: Bearer <token>`

#### Verify Medicine (Verifier only)
- **PATCH** `/api/verify/:id`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "status": "Approved" | "Rejected",
  "verificationNotes": "Optional notes"
}
```

### Marketplace

#### Get All Verified Medicines
- **GET** `/api/marketplace`
- **Query Params:**
  - `search`: string (optional)
  - `expiryBefore`: date (optional)
  - `condition`: "New" | "Opened" (optional)

#### Request Medicine (Receiver only)
- **POST** `/api/marketplace/request/:id`
- **Headers:** `Authorization: Bearer <token>`

### Notifications

#### Get Notifications
- **GET** `/api/notifications`
- **Headers:** `Authorization: Bearer <token>`

#### Mark Notification as Read
- **PATCH** `/api/notifications/:id/read`
- **Headers:** `Authorization: Bearer <token>`

#### Mark All as Read
- **PATCH** `/api/notifications/read-all`
- **Headers:** `Authorization: Bearer <token>`

### AI (Placeholder)

#### Validate Expiry
- **POST** `/api/ai/validate-expiry`
- **Headers:** `Authorization: Bearer <token>`
- **Body:** FormData with `image` file
- **Response:**
```json
{
  "expiry_valid": true,
  "condition": "Good",
  "confidence": 0.93
}
```

## 🔐 Authentication

All protected routes require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

Tokens are returned on login/register and expire after 30 days.

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js              # MongoDB connection
├── controllers/
│   ├── authController.js
│   ├── medicineController.js
│   ├── verifyController.js
│   ├── marketplaceController.js
│   ├── notificationController.js
│   └── aiController.js
├── middleware/
│   ├── authMiddleware.js  # JWT verification
│   └── roleMiddleware.js  # Role-based access control
├── models/
│   ├── User.js
│   ├── Medicine.js
│   └── Notification.js
├── routes/
│   ├── authRoutes.js
│   ├── medicineRoutes.js
│   ├── verifyRoutes.js
│   ├── marketplaceRoutes.js
│   ├── notificationRoutes.js
│   └── aiRoutes.js
├── uploads/               # Uploaded images
├── utils/
│   └── generateToken.js
├── server.js
└── package.json
```

## 🧪 Testing Flow

1. Register accounts for each role (Donor, Receiver, Verifier)
2. Donor uploads a medicine
3. Verifier sees it in pending → approves it
4. Receiver sees it in marketplace → requests it
5. Notifications are generated accordingly

## 🚢 Deployment

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account
2. Create a cluster
3. Get your connection string
4. Update `MONGO_URI` in `.env`

### Deploy to Render/Railway

1. Push code to GitHub
2. Connect repository to Render/Railway
3. Set environment variables:
   - `PORT` (auto-set by platform)
   - `MONGO_URI` (your MongoDB Atlas connection string)
   - `JWT_SECRET` (generate a strong secret)
   - `CORS_ORIGIN` (your frontend URL)
4. Deploy!

## 📝 Notes

- File uploads are stored in `/uploads` directory
- Images are served statically at `/uploads/:filename`
- Passwords are hashed using bcryptjs
- JWT tokens expire after 30 days
- All dates should be in ISO format

## 🔧 Troubleshooting

**Connection Error:**
- Check MongoDB is running (if local)
- Verify `MONGO_URI` in `.env`

**CORS Error:**
- Update `CORS_ORIGIN` in `.env` to match frontend URL

**File Upload Error:**
- Ensure `uploads/` directory exists
- Check file size limits (10MB max)

