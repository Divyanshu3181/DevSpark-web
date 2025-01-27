import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
    const [githubUrl, setGithubUrl] = useState(user.githubUrl || "");
    const [age, setAge] = useState(user.age || "");
    const [gender, setGender] = useState(user.gender || "");
    const [location, setlocation] = useState(user.location || "");
    const [about, setAbout] = useState(user.about || "");
    const [skills, setSkills] = useState(user.skills || []);
    const [newSkill, setNewSkill] = useState("");
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);
    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const res = await axios.patch(
                BASE_URL + "/profile/edit",
                { firstName, lastName, photoUrl, age, gender, about, skills, githubUrl, location },
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

    const addSkill = () => {
        if (newSkill.trim() && !skills.includes(newSkill.trim())) {
            setSkills([...skills, newSkill.trim()]);
            setNewSkill("");
        }
    };

    const removeSkill = (skill) => {
        setSkills(skills.filter((s) => s !== skill));
    };

    return (
        <>
            <div className="container mx-auto py-8 px-4 lg:px-20">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Edit Profile Form */}
                    <div className="card bg-base-300 shadow-xl p-6">
                        <h2 className="text-2xl font-bold text-center mb-4">Edit Profile</h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label>
                                    <span className="label-text font-medium">First Name</span>
                                    <input
                                        type="text"
                                        value={firstName}
                                        className="input input-bordered w-full mt-2"
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </label>

                                <label>
                                    <span className="label-text font-medium">Last Name</span>
                                    <input
                                        type="text"
                                        value={lastName}
                                        className="input input-bordered w-full mt-2"
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </label>
                            </div>

                            <label>
                                <span className="label-text font-medium">Photo URL</span>
                                <input
                                    type="text"
                                    value={photoUrl}
                                    className="input input-bordered w-full mt-2"
                                    onChange={(e) => setPhotoUrl(e.target.value)}
                                    placeholder="Paste image URL or use upload button"
                                />
                            </label>

                            <label>
                                <span className="label-text font-medium">Github URL</span>
                                <input
                                    type="text"
                                    value={githubUrl}
                                    className="input input-bordered w-full mt-2"
                                    onChange={(e) => setGithubUrl(e.target.value)}
                                    placeholder="Paste image URL or use upload button"
                                />
                            </label>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label>
                                    <span className="label-text font-medium">Age</span>
                                    <input
                                        type="number"
                                        value={age}
                                        className="input input-bordered w-full mt-2"
                                        onChange={(e) => setAge(e.target.value)}
                                    />
                                </label>

                                <label>
                                    <span className="label-text font-medium">Location</span>
                                    <input
                                        type="text"
                                        value={location}
                                        className="input input-bordered w-full mt-2"
                                        onChange={(e) => setlocation(e.target.value)}
                                    />
                                </label>

                                <label>
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
                            </div>

                            <label>
                                <span className="label-text font-medium">About</span>
                                <textarea
                                    value={about}
                                    className="textarea textarea-bordered w-full mt-2"
                                    onChange={(e) => setAbout(e.target.value)}
                                    rows="4"
                                    placeholder="Write something about yourself..."
                                ></textarea>
                            </label>

                            <div>
                                <span className="label-text font-medium">Skills</span>
                                <div className="flex items-center gap-4 mt-2">
                                    <input
                                        type="text"
                                        value={newSkill}
                                        className="input input-bordered w-full"
                                        onChange={(e) => setNewSkill(e.target.value)}
                                        placeholder="Add a skill"
                                    />
                                    <button
                                        className="btn btn-primary"
                                        onClick={addSkill}
                                    >
                                        Add
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    {skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="badge badge-primary cursor-pointer"
                                            onClick={() => removeSkill(skill)}
                                        >
                                            {skill} <span className="ml-2">&times;</span>
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {error && <p className="text-red-500 mt-4">{error}</p>}

                            <button
                                className="btn btn-primary w-full mt-6"
                                onClick={saveProfile}
                            >
                                Save Profile
                            </button>
                        </div>
                    </div>


                    <div className="card bg-base-200 shadow-lg p-6">
                        <h2 className="text-2xl font-bold mb-4 flex justify-center">Profile Preview</h2>
                        <div className="flex justify-center">
                            <div className="card bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white w-80 shadow-xl rounded-lg overflow-hidden">
                                <figure className="w-full h-full overflow-hidden">
                                    <img
                                        src={photoUrl}
                                        alt={firstName + " " + lastName}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/150";
                                        }}
                                    />
                                </figure>
                                <div className="card-body p-6">
                                    <h2 className="card-title text-2xl font-bold mb-2">
                                        {firstName} {lastName}
                                    </h2>

                                    {githubUrl && (
                                        <a
                                            href={githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-400 underline mb-2 hover:text-blue-300 transition"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577v-2.234c-3.338.724-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.418-1.305.762-1.605-2.665-.303-5.467-1.333-5.467-5.93 0-1.31.469-2.38 1.235-3.221-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.841 1.23 1.911 1.23 3.221 0 4.608-2.805 5.623-5.475 5.92.435.372.825 1.102.825 2.221v3.293c0 .324.225.693.825.576 4.765-1.591 8.195-6.084 8.195-11.386 0-6.627-5.373-12-12-12z" />
                                            </svg>
                                            GitHub
                                        </a>
                                    )}

                                    {gender && <p className="text-sm text-gray-400 mb-2">{gender}</p>}
                                    {age && <p className="text-sm text-gray-400 mb-2">{age}</p>}

                                    {location && (
                                        <p className="flex items-center gap-2 text-gray-400 mb-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-4.411 0-8 3.589-8 8 0 6.627 8 16 8 16s8-9.373 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                            </svg>
                                            {location}
                                        </p>
                                    )}

                                    <p className="text-gray-300 mb-4">{about}</p>
                                    <div>
                                    <p className="text-gray-300 mb-4">
                                        {skills && skills.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {skills.map((skill, index) => (
                                                    <span
                                                        key={index}
                                                        className="bg-gray-700 px-2 py-1 rounded-full text-sm text-white shadow-sm"
                                                    >
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            "No skills added"
                                        )}
                                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showToast && (
                <div className="fixed top-4 right-4 z-50">
                    <div className="alert alert-success shadow-lg">
                        <span>Profile saved successfully!</span>
                    </div>
                </div>
            )}
        </>
    )
};

export default EditProfile;
