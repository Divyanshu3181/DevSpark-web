import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';
import Error from './Error';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res.data));
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (loading)
    return <div className='flex justify-center items-center min-h-screen'><span className='loading loading-bars loading-lg'></span></div>;

  if (error)
    return <Error message={error} />;

  if (!feed || feed.length <= 0)
    return <h1 className='justify-center flex my-10'>No new user found</h1>;

  return (
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;
