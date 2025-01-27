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
                    <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            className="w-6 h-6"
                        >
                            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm5 10.93a.75.75 0 0 1-1.03.33L12 11.48l-3.97 1.78a.75.75 0 1 1-.66-1.36l4.26-1.92a.75.75 0 0 1 .62 0l4.26 1.92a.75.75 0 0 1 .33 1.03ZM12 4a8 8 0 1 1-8 8 8 8 0 0 1 8-8Z" />
                        </svg>
                        DevHunge
                    </Link>
                </div>

                <div className="flex-none gap-4 items-center">
                    <div className="hidden md:block">
                        <Link
                            to="/"
                            className="btn btn-outline btn-sm mx-2 items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 text-blue-500"
                            >
                                <path d="M12 3c5.062 0 9 2.686 9 6s-3.938 6-9 6-9-2.686-9-6 3.938-6 9-6zm0 13c5.062 0 9 2.686 9 6h-2c0-2.205-3.582-4-7-4s-7 1.795-7 4h-2c0-3.314 3.938-6 9-6zm-6.5-7c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5zm6.5 0c.828 0 1.5.672 1.5 1.5s-.672 1.5-1.5 1.5-1.5-.672-1.5-1.5.672-1.5 1.5-1.5z" />
                            </svg>
                            Feed
                        </Link>


                        <Link
                            to="/connections"
                            className="btn btn-outline btn-sm mx-2 items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 text-red-500"
                            >
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            Connections
                        </Link>

                        <Link
                            to="/requests"
                            className="btn btn-outline btn-sm mx-2  items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-4 h-4 text-purple-500"
                            >
                                <path d="M16 2h-8c-1.104 0-2 .896-2 2v16c0 1.104.896 2 2 2h8c1.104 0 2-.896 2-2v-16c0-1.104-.896-2-2-2zm-1 14h-6v-2h6v2zm0-4h-6v-2h6v2zm0-4h-6v-2h6v2z" />
                            </svg>
                            Requests
                        </Link>
                        <Link
                            to="/profile"
                            className="btn btn-outline btn-sm mx-2  items-center gap-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                className="w-5 h-5 text-indigo-500"
                            >
                                <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8s-2.1-4.8-4.8-4.8-4.8 2.1-4.8 4.8 2.1 4.8 4.8 4.8zm0 1.8c-3.7 0-11.2 1.9-11.2 5.6v2.4h22.4v-2.4c0-3.7-7.5-5.6-11.2-5.6z" />
                            </svg>
                            Profile
                        </Link>

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
                                <li><Link to="/">Feed</Link></li>
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
