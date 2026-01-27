import api from "./api";

export default async function VerifyForgotOtps(email: string, otp: string) {
    console.log("verifyOtp", otp);
    console.log("verifyOtp", email);

    const cleanOtp = otp.toString().trim();

    const response = await api.post("/auth/verify-otp", {
        email,
        otp: cleanOtp,
    });

    return response.data;
}
