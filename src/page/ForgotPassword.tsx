import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import InputComponent from "../components/comman/inputComponent";
import sendForgotOtp from "../services/sendOtpService";
import axios from "axios";


export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSendOtp = async () => {
        if (!email || email.trim() === "") {
            toast.error("Please enter a valid email");
            return;
        }

        setLoading(true);
        try {
            const res = await sendForgotOtp(email);
            console.log("OTP sent response:", res);
            toast.success("OTP sent to your Email");

            navigate("/verify-forgot-otp", {
                state: { email },
            });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                // Displays "User not found" or "Email not registered" if returned by backend
                toast.error(err.response?.data?.message || "Error sending OTP");
            } else {
                toast.error("An unexpected error occurred");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="absolute top-2 right-0 w-full h-72 bg-indigo-900 z-10 opacity-[0.03] " style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 110%)' }}></div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-10 z-20">
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">Forgot Password?</h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Enter your registered email to receive a password reset OTP.
                    </p>
                </div>

                <div className="space-y-4">
                    <InputComponent
                        className="w-full"
                        placeholder="Enter your email"
                        value={email}
                        inputId="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <button
                        className={`w-full bg-indigo-500 text-white font-semibold py-3 rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleSendOtp}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Sending...</span>
                            </>
                        ) : (
                            "Send OTP"
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full text-slate-500 text-sm hover:text-indigo-600 transition-colors py-2"
                    >
                        Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
}
