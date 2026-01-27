// import api from "./api";

// export default async function verifyOtp(email: string, otp: string, purpose: 'LOGIN' | 'FORGOT_PASSWORD') {
//     console.log("verifyOtp", otp);
//     console.log("verifyOtp", email, purpose);

//     const cleanOtp = otp.toString().trim();

//     const response = await api.post("/auth/verify-otp", {
//         email,
//         otp: cleanOtp,
//         purpose,  // ✅ Add purpose
//     });

//     return response.data;
// }
import api from "./api";

export default function verifyForgotOtp(email: string, otp: string) {
  return api.post("/auth/verify-otp", {
    email,
    otp: otp.trim(),
    purpose: "FORGOT_PASSWORD", // ✅ MUST MATCH ENUM EXACTLY
  });
}
