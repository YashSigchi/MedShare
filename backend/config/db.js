import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error('❌ MONGO_URI is not defined in .env file');
      process.exit(1);
    }

    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.error('\n💡 Troubleshooting tips:');
    console.error('  1. Check your MONGO_URI in .env file');
    console.error('  2. Ensure special characters in password are URL-encoded (@ = %40)');
    console.error('  3. Verify your MongoDB Atlas IP whitelist includes 0.0.0.0/0');
    console.error('  4. Check your internet connection\n');
    process.exit(1);
  }
};

export default connectDB;

