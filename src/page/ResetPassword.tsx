import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import resetPassword from "../services/resetPwdService";
import InputComponent from "../components/comman/inputComponent";
import axios from "axios";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleReset = async () => {
        if (!password || password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await resetPassword(email, password);
            toast.success("Password Reset Successfully");
            navigate("/");
        } catch (error) {
            if (axios.isAxiosError(error)) {
                toast.error(error.response?.data?.message || "Reset failed");
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900">Reset Password</h2>
                    <p className="text-sm text-slate-500 mt-2">
                        Create a strong password for your account.
                    </p>
                </div>

                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-slate-600 ml-1">New Password</label>
                        <InputComponent
                            className="w-full"
                            placeholder="••••••••"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        className={`w-full bg-indigo-500 text-white font-semibold py-3 rounded-xl hover:bg-indigo-600 transition-all flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleReset}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Updating...</span>
                            </>
                        ) : (
                            "Update Password"
                        )}
                    </button>

                    <button
                        onClick={() => navigate("/")}
                        className="w-full text-slate-500 text-sm hover:text-indigo-600 transition-colors py-2"
                    >
                        Cancel and Login
                    </button>
                </div>
            </div>
        </div>
    );
}
