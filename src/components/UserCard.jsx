import axios from "axios";
import React from "react";
import { BASE_URL} from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
 
  const {_id, firstName, lastName, photoUrl, gender, about, age } = user;
  const dispatch = useDispatch();

  

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {withCredentials:true});
      dispatch(removeFeedFromFeed(userId));
    } catch (error) {
      console.error("Error sending request:", error.response?.data || error.message);
    }
  }

  return (
    <div className="card bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white w-80 shadow-xl rounded-lg overflow-hidden">
      <figure className="w-full h-full overflow-hidden">
        <img
          src={photoUrl}
          alt={firstName+ " " +lastName}
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
        { gender &&<p className="text-sm text-gray-400 mb-2">{gender}</p>}
        {age &&<p className="text-sm text-gray-400 mb-2">{age}</p>}
        
        <p className="text-gray-300 mb-4">{about}</p>
        <div className="card-actions flex justify-between">
          <button className="btn btn-primary bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
          onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button className="btn btn-secondary bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-200"
          onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
