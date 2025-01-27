# DevHunge

DevHunge is a social media platform designed for developers to connect, collaborate, and grow their network. It includes features like a feed, connection requests, and user profile management.

## Features

1. **User Authentication**
   - Secure login and signup.
   - Logout functionality.

2. **Feed**
   - View a feed of developers.
   - Display personalized content.

3. **Connection Requests**
   - Send, accept, or reject connection requests.
   - View a list of received requests.

4. **User Profiles**
   - View and edit user profiles.
   - Profile picture and personal information management.

5. **Responsive Navbar**
   - Sticky navbar with navigation links.
   - Dropdown menu for profile options.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router.
- **Backend**: Node.js, Express.js (API integration not included in this repository).
- **State Management**: Redux Toolkit.
- **HTTP Client**: Axios.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/DevHunge.git
   cd DevHunge
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     REACT_APP_BASE_URL=http://localhost:5000
     ```

4. Run the application:
   ```bash
   npm start
   ```

## Usage

1. Start the backend server (not included in this repository).
2. Open the application in your browser at `http://localhost:3000`.
3. Sign up or log in to access features.

## Folder Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── UserCard.jsx
│   └── Requests.jsx
├── utils/
│   ├── constants.js
│   ├── feedSlice.js
│   └── userSlice.js
└── App.js
```

## Contributing

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Make your changes and commit:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).




import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeedFromFeed } from "../utils/feedSlice";

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
  };

  return (
    <div className="card bg-white shadow-lg rounded-lg overflow-hidden w-96">
      <figure className="w-full h-48 overflow-hidden">
        <img
          src={photoUrl || "https://via.placeholder.com/300"}
          alt={`${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {firstName} {lastName}
        </h2>
        {gender && <p className="text-sm text-gray-500">{gender}</p>}
        {age && <p className="text-sm text-gray-500">{age} years old</p>}

        {location && (
          <p className="flex items-center text-sm text-gray-500 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500 mr-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C7.589 0 4 3.589 4 8c0 6.627 8 16 8 16s8-9.373 8-16c0-4.411-3.589-8-8-8zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
            </svg>
            {location}
          </p>
        )}

        <p className="text-gray-700 mt-4">{about || "No description provided."}</p>

        {skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-800 text-sm rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline mt-4 block"
          >
            View GitHub Profile
          </a>
        )}

        <div className="flex justify-between mt-6">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 transition"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 transition"
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
