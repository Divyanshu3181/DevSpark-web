import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error('Failed to fetch requests:', error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error('Failed to fetch requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  if (loading) return <div className="flex justify-center items-center min-h-screen"><span className="loading loading-bars loading-lg"></span></div>;
  if (!requests || requests.length === 0) return <h1 className='flex justify-center my-10'>No Requests Found</h1>;

  return (
    <div className="flex justify-center min-h-screen m-10">
      <div className="w-full max-w-4xl px-4">
        <h1 className="font-bold text-3xl text-white mb-8 text-center">Connection Requests</h1>
        <div className="grid gap-6 grid-cols-1">
          {requests
            .filter((request) => request !== null)
            .map((request) => {
              const { _id, firstName, lastName, photoUrl, age, gender, about } = request.fromUserId;
              return (
                <div
                  key={_id}
                  className="flex flex-col items-center p-6 rounded-lg bg-base-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
                >
                  <img
                    src={photoUrl}
                    alt={`${firstName} ${lastName}`}
                    className="w-24 h-24 rounded-full mb-4"
                  />
                  <h2 className="text-lg font-bold mb-2 text-center">{`${firstName} ${lastName}`}</h2>
                  {age && gender && (
                    <p className="text-sm text-gray-500 mb-2 text-center">{`${age} years old, ${gender}`}</p>
                  )}
                  <p className="text-sm text-gray-700 text-center mb-4">{about}</p>
                  <div className="flex gap-4">
                    <button
                      className="btn btn-primary" onClick={() => reviewRequest("rejected", request._id)}
                    >
                      Reject
                    </button>
                    <button
                      className="btn btn-secondary" onClick={() => reviewRequest("accepted", request._id)}
                    >
                      Accept
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
