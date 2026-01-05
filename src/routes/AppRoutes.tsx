import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/layout/ProtectedRoute";
import Dashboard from "../page/dashboard/Dashboard";
import BoardView from "../features/auth/board/BoardView";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import CreateBoard from "../CreateBoard";


const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Signup />} />
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/board"
                    element={
                        <ProtectedRoute>
                            <BoardView />
                        </ProtectedRoute>
                    }
                />

                <Route path="/board/create" element={<CreateBoard/>}/>
                

            </Routes>
        </BrowserRouter>
       
    );
};

export default AppRoutes;
