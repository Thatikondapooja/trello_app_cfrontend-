import { useState } from "react"; // Verified clean import for Vercel deployment
import InputComponent from "../components/comman/inputComponent";
import Button from "../components/comman/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authAPI";
// import { loginSuccess } from "../features/auth/authSlice";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();


    /* ---------------- VALIDATIONS ---------------- */

    const validateEmail = () => {
        if (!email.trim()) {
            setEmailError("Email is required");
            return false;
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            setEmailError("Enter a valid email address");
            return false;
        }

        setEmailError("");
        return true;
    };

    const validatePassword = () => {
        if (!password.trim()) {
            setPasswordError("Password is required");
            return false;
        }

        if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            return false;
        }

        setPasswordError("");
        return true;
    };

    /* ---------------- LOGIN HANDLER ---------------- */

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();

        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();

        if (!isEmailValid || !isPasswordValid) return;
        console.log("login")
        // 🚧 TEMP (frontend-only)
        // Later we will replace this with backend API call
        // dispatch(loginSuccess({ email }));
        dispatch(loginUser({ email, password }))
            .unwrap()//Converts thunk result into normal Promise
            .then(() => navigate("/dashboard"))
            .catch(() => { });
    };

    /* ---------------- REDIRECT ---------------- */

    // if (user) {
    //     return <Navigate to="/" replace />;
    // }

    /* ---------------- UI ---------------- */

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50 px-4">
            <div className="absolute top-2 right-0 w-full h-72 bg-indigo-900 z-20 opacity-[0.03] " style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 110%)' }}></div>

            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-slate-100 p-10 z-20">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-14 h-14 bg-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <svg
                            className="w-8 h-8 text-white ml-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 0v10"
                            />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Sign in to Workspace
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        Enter your credentials to continue
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                        {emailError && (
                            <p className="text-xs text-red-500 mt-1 ml-2">{emailError}</p>
                        )}
                        <InputComponent
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* Password */}
                    <div>
                        {passwordError && (
                            <p className="text-xs text-red-500 mt-1 ml-2">{passwordError}</p>
                        )}
                        <InputComponent
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* Button */}
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
                    >
                        Continue
                    </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <button className="text-sm text-indigo-600 hover:underline">
                        Forgot password?
                    </button>

                    <p className="text-sm text-slate-500 mt-4">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => navigate("/")}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
