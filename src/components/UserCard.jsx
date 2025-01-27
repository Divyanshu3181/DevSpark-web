import React from "react";
import { Github as GitHub, Mail, Link, Briefcase, MapPin } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeFeedFromFeed } from "../utils/feedSlice";
import { useDispatch } from "react-redux";



const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoUrl,
    gender,
    about,
    age,
    skills,
    githubUrl,
    location,
  } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeedFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error.response?.data || error.message);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className=" rounded-2xl shadow-xl overflow-hidden bg-base-300">
        <div className="relative">
          <img
            src={photoUrl || "https://via.placeholder.com/400"}
            alt={`${firstName} ${lastName}`}
            className="w-full h-[400px] object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-3xl font-bold">
              {firstName} {lastName}
            </h2>
            <div className="flex items-center space-x-2 mt-2">
              <MapPin size={16} />
              <span>{location}</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-medium">
                {gender}
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                {age} years old
              </span>
            </div>
            <div className="flex space-x-3">
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
                >
                  <GitHub size={18} />
                  <span>GitHub</span>
                </a>
              )}

            </div>
          </div>
          <p className="text-gray-600 mb-6 text-lg">{about}</p>
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills && skills.length > 0 ? (
                skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-200 text-gray-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))
              ) : (
                <span className="text-gray-400">No skills added</span>
              )}
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl hover:bg-red-200 transition-colors font-medium"
              onClick={() => handleSendRequest("ignored", _id)}
            >
              Pass
            </button>
            <button
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl hover:opacity-90 transition-opacity font-medium"
              onClick={() => handleSendRequest("interested", _id)}
            >
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
