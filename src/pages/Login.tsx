import { useState } from "react"; // Verified clean import for Vercel deployment
import InputComponent from "../components/comman/inputComponent";
import Button from "../components/comman/Button";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authAPI";
import { clearError } from "../features/auth/authSlice";
import { useEffect } from "react";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { error, loading } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
    }, [dispatch]);


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
        // 🚧 TEMP (frontend-only)
        // Later we will replace this with backend API call
        // dispatch(loginSuccess({ email }));
        dispatch(loginUser({ email, password }))
            .unwrap()//Converts thunk result into normal Promise
            .then(() => navigate("/dashboard"))
            .catch(() => {

            });
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
                        <label htmlFor="email" className="sr-only">Email</label>
                        {emailError && (
                            <p className="text-xs text-red-500 mt-1 ml-2">{emailError}</p>
                        )}
                        <InputComponent
                            inputId="email"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        {passwordError && (
                            <p className="text-xs text-red-500 mt-1 ml-2">{passwordError}</p>
                        )}
                        <InputComponent
                            inputId="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="p-3 bg-red-50 border border-red-100 rounded-xl">
                            <p className="text-xs text-red-600 text-center font-medium">
                                {error}
                            </p>
                        </div>
                    )}

                    {/* Button */}
                    <Button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-500 text-xl text-white hover:bg-indigo-700 py-2 rounded-xl transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Signing in...</span>
                            </div>
                        ) : (
                            'Continue'
                        )}
                    </Button>



                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    {/* <button className="text-sm text-indigo-600 hover:underline">
                        Forgot password?
                    </button> */}
                    <a
                        href="/forgot-password"
                        className="text-sm text-indigo-600 hover:underline"
                    >
                        Forgot password?
                    </a>
                    <p className="text-sm text-slate-500 mt-4">
                        Don’t have an account?{" "}
                        <button
                            onClick={() => navigate("/Signup")}
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
