import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [about, setAbout] = useState(user.about || "");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about },
                { withCredentials: true }
            );
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } catch (error) {
            setError(error.response.data);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8 my-10 px-4">
            <div className="card bg-base-300 shadow-xl w-full max-w-lg">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">
                        Edit Profile
                    </h2>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="label-text font-medium">First Name</span>
                            <input
                                type="text"
                                value={firstName}
                                className="input input-bordered w-full mt-2"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="label-text font-medium">Last Name</span>
                            <input
                                type="text"
                                value={lastName}
                                className="input input-bordered w-full mt-2"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="label-text font-medium">Photo URL</span>
                            <input
                                type="text"
                                value={photoUrl}
                                className="input input-bordered w-full mt-2"
                                onChange={(e) => setPhotoUrl(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="label-text font-medium">Age</span>
                            <input
                                type="number"
                                value={age}
                                className="input input-bordered w-full mt-2"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </label>

                        <label className="block">
                            <span className="label-text font-medium">Gender</span>
                            <select
                                className="select select-bordered w-full mt-2"
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <option disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </label>

                        <label className="block">
                            <span className="label-text font-medium">About</span>
                            <textarea
                                value={about}
                                className="textarea textarea-bordered w-full mt-2"
                                onChange={(e) => setAbout(e.target.value)}
                                rows="4"
                                placeholder="Write something about yourself..."
                            ></textarea>
                        </label>
                    </div>

                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    <div className="card-actions justify-center mt-6">
                        <button className="btn btn-primary w-full" onClick={saveProfile}>
                            Save Profile
                        </button>
                    </div>
                </div>
            </div>

            <div className="card bg-base-200 shadow-lg w-full max-w-md">
                <div className="card-body">
                    <h2 className="card-title justify-center text-2xl font-bold mb-4">
                        Profile Preview
                    </h2>
                    <div className="flex justify-center">
                        <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
                    </div>
                </div>
            </div>

            {showToast && (
                <div className="toast toast-top toast-end">
                    <div className="alert alert-success">
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;
