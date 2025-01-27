import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import Error from "./Error";
import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';

const Connections = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", { withCredentials: true });
      dispatch(addConnections(res.data.data));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (loading)
    return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;

  if (error)
    return <Error message={error} />;

  if (!connections || connections.length === 0)
    return <h1 className="flex justify-center m-10">No accepted connections found</h1>;

  return (
    <div className="text-center my-10 ">
      <h1 className="font-bold text-3xl text-white mb-8">Connections</h1>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 ">
        {connections
          .filter((connection) => connection !== null)
          .map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about, skills, location, githubUrl } = connection;
            return (
              <div
                key={_id}
                className="bg-base-300 rounded-xl shadow-lg overflow-hidden border hover:shadow-xl transition-shadow"
              >
                {/* Header with Image */}
                <div className="p-4 flex items-center gap-4">
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{`${firstName} ${lastName}`}</h3>
                    {age && gender && <p className="text-sm text-gray-400">{`${age} years old, ${gender}`}</p>}
                    {location && (
                      <div className="flex items-center text-gray-400 text-sm">
                        <MapPin size={16} className="mr-1" />
                        {location}
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="px-4 pb-4">
                  <p className="text-gray-700 text-sm mb-3 text-center">{about}</p>
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {skills?.map((skill) => (
                      <span key={skill} className="px-2 py-1 bg-purple-100 text-green-600 rounded-full text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Link to={"/chat/" + _id}>
                      <button className="flex items-center justify-center gap-2 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 10h8m-4-4h.01M21 12.34a7.96 7.96 0 01-1.344 4.016l.34.008h.001A2.992 2.992 0 0120 20l-3.614-1.464a7.963 7.963 0 01-3.906.93 8.005 8.005 0 01-7.997-8c0-4.412 3.588-8 8-8a8.004 8.004 0 018 8z"
                          />
                        </svg>
                        <span>Message</span>
                      </button>
                    </Link>

                    {githubUrl && (
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors text-center"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div >
  );
};

export default Connections;
