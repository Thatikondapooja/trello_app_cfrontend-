import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyForgotOtps from "../services/verifyForgotOtpService";
import api from "../services/api";
import axios from "axios";

export default function VerifyForgotOtp() {
    const [otp, setOtp] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleVerify = async () => {
        try {
            await VerifyForgotOtps(email, otp);

            toast.success("OTP Verified");

            navigate("/reset-password", { state: { email } });
        } catch (err) {
            if (axios.isAxiosError(err)) {
                toast.error(err.response?.data?.message || "Invalid OTP");
            } else {
                toast.error("Invalid OTP");
            }
        }
    };

    return (
        <div className=" min-h-screen flex items-center justify-center bg-slate-900 font-sans ">

            <div className="flex flex-col items-center p-10 border-transparent bg-white rounded-md  text-green-800 font-lato">
                <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>

                <input
                    className="border p-2 rounded w-full text-center"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                />

                <button
                    className="mt-4 bg-indigo-600 text-white rounded px-4 py-2"
                    onClick={handleVerify}
                >
                    Verify OTP
                </button>
            </div> </div>
    );
}
