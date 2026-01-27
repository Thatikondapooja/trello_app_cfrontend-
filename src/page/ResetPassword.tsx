import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import resetPassword from "../services/resetPwdService";
import InputComponent from "../components/comman/inputComponent";
import axios from "axios";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleReset = async () => {
        try {
            await resetPassword(email, password);
            toast.success("Password Reset Successfully");

            navigate("/");
        } catch (error) {
             if (axios.isAxiosError(error)) {
            toast.error(error.response?.data?.message || "Reset failed");
        }}
    };

    return (
        <div className=" min-h-screen flex items-center justify-center bg-slate-900 font-sans ">

            <div className="flex flex-col items-center p-10 border-transparent bg-white rounded-md  text-blue-800 font-lato">

            <h2 className="text-xl font-semibold mb-4">Reset Password</h2>

            <InputComponent
                className="border p-2 rounded w-full"
                placeholder="New Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="mt-4 bg-indigo-600  hover:bg-indigo-700 text-white rounded px-4 py-2"
                onClick={handleReset}
            >
                Update Password
            </button>
        </div>
        </div>
    );
}
