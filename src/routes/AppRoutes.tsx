import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import Dashboard from "../page/dashboard/Dashboard";
import BoardView from "../features/auth/board/BoardView";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreateBoard from "../features/auth/board/CreateBoard";
import ForgotPassword from "../page/ForgotPassword";
import ResetPassword from "../page/ResetPassword";
import VerifyForgotOtp from "../page/VerifyForgotPwd";
import SendOtp from "../page/SendOtp";
import { ToastContainer } from "react-toastify";


const AppRoutes = () => {

    return (
        <BrowserRouter>
            {/* ✅ Toast Container */}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/Signup" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />

                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/board/:boardId"
                    element={
                        <ProtectedRoute>
                            <BoardView />
                        </ProtectedRoute>
                    }
                />
                <Route path="/board/create" element={<CreateBoard />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* <Route path="/OtpLogin" element={<OtpLogin />} /> */}
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-forgot-otp" element={<VerifyForgotOtp />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/SendOtp" element={<SendOtp />} />

            </Routes>
        </BrowserRouter>

    );
};

export default AppRoutes;
