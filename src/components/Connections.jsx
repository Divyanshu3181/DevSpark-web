import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import Error from "./Error";

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
    <div className="text-center my-10">
      <h1 className="font-bold text-3xl text-white mb-8">Connections</h1>
      {connections
        .filter((connection) => connection !== null)
        .map((connection) => {
          const { firstName, lastName, photoUrl, age, gender, about } = connection;
          return (
            <div
              key={connection._id}
              className="flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
            >
              <div className="flex text-left mb-4">
                <img
                  src={photoUrl}
                  alt={`${firstName} ${lastName}`}
                  className="w-24 h-24 rounded-lg"
                />
              </div>
              <div className="text-left mx-8">
                <h2 className="text-lg font-bold">
                  {`${firstName} ${lastName}`}
                </h2>
                {age && gender && <p className="text-sm mb-2">{`${age} years old, ${gender}`}</p>}
                <p>{about}</p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Connections;
