# DevSpark

DevSpark is a social media platform designed for developers to connect, collaborate, and grow their network. It includes features like a feed, connection requests, and user profile management.

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

. **Chat Functionality**
   - User can chat with eachother.

## Tech Stack

- **Frontend**: React.js, Tailwind CSS, React Router.
- **Backend**: Node.js, Express.js (API integration not included in this repository).
- **State Management**: Redux Toolkit.
- **HTTP Client**: Axios.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/DevSpark.git
   cd DevSpark
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




