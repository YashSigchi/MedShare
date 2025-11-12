// test-login.mjs
import fetch from "node-fetch";

const run = async () => {
  const res = await fetch("http://localhost:5001/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "verify1@gmail.com", // change to real verifier email
      password: "verify1"        // change to real verifier password
    }),
  });

  const data = await res.json();
  console.log("Login result:", data);
};

run();
