import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth/authSlice';
import { RootState } from '../../../app/rootReducer';

interface UserDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    workplaceRoute?: string; // Optional prop for custom workplace route
    boardsRoute?: string; // Optional prop for custom boards route
}

const UserDropdown: React.FC<UserDropdownProps> = ({ 
    isOpen, 
    onClose, 

}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.auth.user);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [isOpen, onClose]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
        onClose();
    };

    const getInitials = (name: string): string => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase();
        }
        return names[0][0].toUpperCase();
    };

    if (!isOpen) return null;

    return (
        <div 
            ref={dropdownRef}
            className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50"
            style={{ top: '100%', right: '0', marginTop: '8px' }}
        >
            {/* User Info Section */}
            <div className="px-4 py-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center">
                        <span className="text-indigo-600 font-bold text-sm">
                            {getInitials(user?.FullName || user?.email || 'User')}
                        </span>
                    </div>
                    <div>
                        <p className="font-semibold text-slate-900 text-sm">
                            {user?.FullName || 'User'}
                        </p>
                        <p className="text-xs text-slate-500">
                            {user?.email || 'user@example.com'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="py-1">
                {/* <button
                    onClick={() => {
                        navigate('/board/:boardId');
                        onClose();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                    Project Workplace
                </button> */}
                
                {/* <button
                    onClick={() => {
                        navigate('/profile');
                        onClose();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                    Profile Settings
                </button> */}
                 
                <button
                    onClick={() => {
                        navigate('/dashboard');
                        onClose();
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                >
                    My Boards
                </button>
            </div>

            {/* Divider */}
            <div className="border-t border-slate-100 my-1"></div>

            {/* Logout */}
            <div className="px-4 py-2">
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default UserDropdown;
