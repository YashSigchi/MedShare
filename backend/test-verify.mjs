// test-verify.mjs
import fetch from "node-fetch";

const BASE_URL = "http://localhost:5001/api/verify";
const MEDICINE_ID = "69137a75f1840cc4fb4bd5b8"; // 👈 your medicine _id
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTEzNmU4MzQ1YjVjYjA3MWEzZTdlZTgiLCJpYXQiOjE3NjI5NTQ5MTcsImV4cCI6MTc2NTU0NjkxN30.SuPTZ9BSDVOppLxhcEtYOregU_gN8-7wQzOu8CLWIsg"; // 👈 paste token from login output

async function runVerification() {
  try {
    const response = await fetch(`${BASE_URL}/${MEDICINE_ID}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        status: "Approved", // you can test "Rejected" too
        verificationNotes: "Verified using AI image check",
      }),
    });

    const data = await response.json();
    console.log("✅ Verification API Response:\n", data);
  } catch (err) {
    console.error("❌ Error calling verify API:", err.message);
  }
}

runVerification();