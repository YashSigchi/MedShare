import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import Tesseract from "tesseract.js";

/**
 * 🧠 analyzeMedicineImage
 * Uses Tesseract OCR to extract expiry dates from uploaded images.
 * Returns AI decision: safe | near-expiry | expired | invalid | error.
 */
export async function analyzeMedicineImage(imagePath, expiryDateFromForm = null) {
  const result = {
    status: "unknown",
    confidence: 0.0,
    reason: "",
    detectedExpiry: null,
    isExpired: false,
  };

  try {
    // 1️⃣ Ensure valid image path
    if (!imagePath) {
      return {
        ...result,
        status: "invalid",
        confidence: 0.3,
        reason: "No image provided for AI analysis.",
      };
    }
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

// Build absolute path to uploaded image (inside backend/uploads)
const fullPath = join(__dirname, "../", imagePath.replace(/^\/+/, ""));

await fs.access(fullPath); // Ensure file exists
await fs.access(fullPath); // Ensure file exists


    console.log("🧠 Running OCR on image:", fullPath);
    const { data } = await Tesseract.recognize(fullPath, "eng", {
      logger: (m) => {
        if (m.status === "recognizing text") {
          process.stdout.write(`\r🔍 OCR Progress: ${(m.progress * 100).toFixed(1)}%`);
        }
      },
    });

    const text = data.text.replace(/\s+/g, " ").trim();
    console.log("\n📄 OCR Extracted Text:", text);

    // 2️⃣ Detect expiry patterns
    const dateRegex = /\b(?:EXP(?:IRY)?[:\-\s]*)?(\d{1,2}[/\-]\d{2,4}|\d{4})\b/gi;
    const matches = [...text.matchAll(dateRegex)].map((m) => m[1]);

    let detectedDate = null;
    if (matches.length > 0) {
      const parsed = matches[0].replace(/[^0-9/\\-]/g, "");
      detectedDate = parseExpiryDate(parsed);
      if (detectedDate) result.detectedExpiry = detectedDate.toISOString().split("T")[0];
    }

    // 3️⃣ Decide which expiry date to trust
    const expiry = detectedDate || (expiryDateFromForm ? new Date(expiryDateFromForm) : null);

    if (!expiry || isNaN(expiry)) {
      result.status = "invalid";
      result.confidence = 0.5;
      result.reason = "Unable to determine expiry date from image or input.";
      return result;
    }

    // 4️⃣ Compare with current date
    const now = new Date();
    const diffDays = Math.ceil((expiry - now) / (1000 * 60 * 60 * 24));

    if (diffDays < 0) {
      result.status = "expired";
      result.isExpired = true;
      result.confidence = 0.98;
      result.reason = `Medicine expired on ${expiry.toDateString()}.`;
    } else if (diffDays <= 30) {
      result.status = "near-expiry";
      result.confidence = 0.9;
      result.reason = `Medicine will expire in ${diffDays} days.`;
    } else {
      result.status = "safe";
      result.confidence = 0.96;
      result.reason = `Medicine is safe to use. Expires on ${expiry.toDateString()}.`;
    }

    if (data.confidence && data.confidence < 70) {
      result.confidence *= 0.8;
      result.reason += " (Low text clarity)";
    }

    return result;
  } catch (err) {
    console.error("⚠️ AI OCR Error:", err.message);
    return {
      ...result,
      status: "error",
      confidence: 0.0,
      reason: "Error during OCR or AI analysis.",
    };
  }
}

// 🧮 Helper: Parse expiry date
function parseExpiryDate(rawText) {
  try {
    const parts = rawText.split(/[/\-]/).map((p) => p.trim());
    if (parts.length === 2) {
      const [mm, yy] = parts;
      const year = yy.length === 2 ? `20${yy}` : yy;
      const date = new Date(`${year}-${mm.padStart(2, "0")}-28`);
      return isNaN(date) ? null : date;
    }
    if (/^\d{4}$/.test(rawText)) {
      return new Date(`${rawText}-12-31`);
    }
    return null;
  } catch {
    return null;
  }
}