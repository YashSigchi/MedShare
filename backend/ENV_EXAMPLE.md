Environment variables required by the backend:

MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/medshare?retryWrites=true&w=majority
JWT_SECRET=change_this_to_a_strong_secret
CORS_ORIGIN=http://localhost:5173
PORT=5000

Notes:
- Ensure special characters in the password are URL-encoded (e.g., @ => %40).
- If you use MongoDB Atlas, whitelist your IP or use 0.0.0.0/0 for testing.


