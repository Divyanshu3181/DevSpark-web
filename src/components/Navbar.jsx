import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
    const user = useSelector((store) => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
            dispatch(removeUser());
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
        {user && <div className="navbar bg-base-200 shadow-md sticky top-0 z-50">
            <div className="flex-1">
                <Link to="/" className="text-2xl font-bold text-primary">DevTinder</Link>
            </div>

            <div className="flex-none gap-4 items-center">
                <div className="hidden md:block">
                    <Link to="/" className="btn btn-outline btn-sm mx-2">Feed</Link>
                    <Link to="/connections" className="btn btn-outline btn-sm mx-2">Connections</Link>
                    <Link to="/requests" className="btn btn-outline btn-sm mx-2">Requests</Link>
                </div>
                {user && (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="user photo" src={user.photoUrl} />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
                        >
                            <li>
                                <Link to="/profile" className="justify-between">
                                    Profile
                                    <span className="badge badge-primary">New</span>
                                </Link>
                            </li>
                            <li><Link to="/connections">Connections</Link></li>
                            <li><Link to="/requests">Requests</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                )}
                
            </div>
        </div>}
        </div>
    );
};

export default Navbar;
