import { useState } from "react"; // Verified clean import for Vercel deployment
import InputComponent from "../components/comman/inputComponent";
import Button from "../components/comman/Button";
import Tooltip from "../components/comman/Tooltip";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { registerUser } from "../features/auth/authAPI";
import { useAppSelector } from "../app/hooks";


export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();


    const [FullName, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [nameerror, setNameErrors] = useState("")
    const [emailerror, setemailErrors] = useState("")
    const [passworderror, setpasswordErrors] = useState("")
    const [confirmPassworderror, setConfirmPasswordErrors] = useState("")
    const { error, loading } = useAppSelector((state) => state.auth);



    /* ---------------- HANDLERS ---------------- */

    function names(e: React.ChangeEvent<HTMLInputElement>) {
        setName(e.target.value)

    }
    function emailId(e: React.ChangeEvent<HTMLInputElement>) {
        setEmail(e.target.value)
    }
    function passwords(e: React.ChangeEvent<HTMLInputElement>) {
        setPassword(e.target.value)
    }
    function confirmPwd(e: React.ChangeEvent<HTMLInputElement>) {
        setConfirmPassword(e.target.value)
    }

    /* ---------------- VALIDATIONS ---------------- */

    function nameValidate() {
        // Name
        if (!FullName.trim()) {
            setNameErrors("Full name is required");
            return false;
        }
        if (FullName.length < 2) {
            setNameErrors("Name must be at least 2 characters");
            return false;
        }
        return true
    }


    function emailValidate() {
        // Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.trim()) {
            setemailErrors("Email is required");
            return false;
        }
        if (!emailRegex.test(email)) {
            setemailErrors("Enter a valid email address");
            return false;
        }
        return true
    }

    function passwordValidate() {

        // Password
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{4,}$/;
        if (!password) {
            setpasswordErrors("Password is required");
            return false;
        }
        if (!passwordRegex.test(password)) {
            setpasswordErrors
                ("Password must be at least 4 characters and include letters & numbers");
            return false;
        }

        return true
    }
    function confirmPwdValidation() {
        // Confirm Password
        if (!confirmPassword) {
            setConfirmPasswordErrors("Please confirm your password");
            return false;
        }
        if (password !== confirmPassword) {
            setConfirmPasswordErrors("Passwords do not match");
            return false;
        }
        return true
    }

    /* ---------------- SUBMIT ---------------- */

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("register")
        const isName = nameValidate()
        const isEmail = emailValidate()
        const isPwd = passwordValidate()
        const isCpwd = confirmPwdValidation()
        if (!isName || !isEmail || !isPwd || !isCpwd) return
        console.log("register after valid")


        // 🚧 Next step: API call
        // await signupUser(formData)

        dispatch(registerUser({ FullName, email, password }))
            .unwrap()
            .then(() => navigate("/"))
            .catch(() => { });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-3 relative overflow-hidden">
            {/* Subtle background decoration to match Login */}
            <div className="absolute top-0 right-0 w-full h-72 bg-indigo-900 z-0 opacity-[0.03] " style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)' }}></div>

            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-slate-100 p-10 z-20">
                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-white border border-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <svg className="w-7 h-7 text-indigo-600 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create your account</h1>
                    <p className="text-sm text-slate-500 mt-2">Start organizing your projects today</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <label htmlFor="FullName" className="sr-only">Full Name</label>
                        <form className="space-y-4" onSubmit={handleSignup}>
                            {/* Name */}
                            <div>
                                {nameerror && (
                                    <p className="text-xs text-red-500 mt-1 ml-2">{nameerror}</p>
                                )}
                                <InputComponent
                                inputId="FullName"
                                    name="FullName"
                                    type="text"
                                    placeholder="Full name"
                                    value={FullName}
                                    onChange={names}
                                />

                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                {emailerror && (
                                    <p className="text-xs text-red-500 mt-1 ml-2">{emailerror}</p>
                                )}
                                <InputComponent
                                    name="email"
                                    inputId="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={email}
                                    onChange={emailId}
                                />

                            </div>

                            {/* Password */}
                            <div>

                             <label htmlFor="password" className="sr-only">Password</label>
                                {passworderror && (
                                    <p className="text-xs text-red-500 mt-1 ml-2">{passworderror}</p>
                                )}
                                <InputComponent
                                    name="password"
                                    inputId="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={passwords}
                                />

                            </div>

                            {/* Confirm Password */}
                            <div>
                               <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                                {confirmPassworderror && (
                                    <p className="text-xs text-red-500 mt-1 ml-2">
                                        {confirmPassworderror}
                                    </p>
                                )}
                                <InputComponent
                                    name="confirmPassword"
                                    inputId="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    value={confirmPassword}
                                    onChange={confirmPwd}
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
                            {/* button */}

                            <Button
                                type="submit"
                                disabled={loading}
                                className={`w-full bg-indigo-500 text-xl text-white hover:bg-indigo-700 py-2 rounded-xl transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Signing up...</span>
                                    </div>
                                ) : (
                                    'Get Started for Free'
                                )}
                            </Button>

                        </form>

                    </div>
                    <div className="mt-2 text-center border-t border-slate-50 pt-3">
                        <p className="text-sm text-slate-500">
                            Already have an account?{" "}
                            <button
                                onClick={() => navigate("/")}
                                className="text-indigo-600 font-semibold hover:text-indigo-700 transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    <p className="text-[10px] text-center text-slate-400 mt-6 px-4">
                        By clicking "Get Started", you agree to our
                        <Tooltip content="Read our Terms of Service">
                            <span className="underline cursor-pointer mx-1">Terms of Service</span>
                        </Tooltip>
                        and
                        <Tooltip content="Learn how we protect your data">
                            <span className="underline cursor-pointer ml-1">Privacy Policy</span>
                        </Tooltip>.
                    </p>
                </div>
            </div>
        </div>
    );
}
