import api from "./api";

export default function sendForgotOtp(email: string) {
    console.log("sendForgotOtp", email);
    return api.post("/auth/send-otp", {
        email,
        purpose: "FORGOT_PASSWORD"
    });
}
