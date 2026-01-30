import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyForgotOtps from "../services/verifyForgotPwdOtpService";
import axios from "axios";

export default function VerifyForgotOtp() {
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleVerify = async () => {
        if (!otp || otp.length < 4) {
            toast.error("Please enter a valid OTP");
            return;
        }

        setLoading(true);
        try {
            await VerifyForgotOtps(email, otp);
            toast.success("OTP Verified Successfully");
            navigate("/reset-password", { state: { email } });
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Invalid OTP");
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
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">Verify OTP</h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Enter the verification code sent to <br />
                        <span className="font-semibold text-slate-700">{email || "your email"}</span>
                    </p>
                </div>

                <div className="space-y-6">
                    <input
                        className="w-full text-center text-3xl tracking-[1rem] font-bold border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                        placeholder="0000"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />

                    <button
                        className={`w-full bg-indigo-500 text-white font-semibold py-3 rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleVerify}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Verifying...</span>
                            </>
                        ) : (
                            "Verify OTP"
                        )}
                    </button>

                    <div className="text-center">
                        <button
                            onClick={() => navigate("/")}
                            className="text-slate-500 text-sm hover:text-indigo-600 transition-colors py-2"
                        >
                            Back to Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
