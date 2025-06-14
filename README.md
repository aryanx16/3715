# 🚀 LeetTracker

A modern web application to track your LeetCode progress and coding journey. Built with React, Node.js, and MongoDB.

## ✨ Features

- **User Authentication**: Secure login and registration system
- **Progress Tracking**: Monitor your coding practice and improvements
- **Question Management**: Organize and track LeetCode problems
- **Beautiful UI**: Modern, responsive design with smooth animations
- **Real-time Notifications**: Toast notifications for user feedback
- **Dashboard**: Comprehensive overview of your coding statistics

## 🛠 Tech Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **Recoil** for state management
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications
- **Axios** for API calls

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### ⭐ If you found this project helpful, please give it a star on GitHub!

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v16 or higher)
- npm or yarn
- MongoDB database (local or cloud)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/leettracker.git
cd leettracker
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to your `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

```bash
# Start the backend server
npm start
# or for development with nodemon
npm run dev
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Create .env file
touch .env
```

Add the following environment variables to your frontend `.env` file:

```env
VITE_BACKEND_URL=http://localhost:5000
# For production: VITE_BACKEND_URL=https://your-backend-domain.com
```

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
leettracker/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.tsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── authroutes.js
│   │   └── questionroutes.js
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── README.md
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/profile` - Get user profile (protected)

### Questions
- `GET /api/questions` - Get all questions (protected)
- `POST /api/questions` - Add new question (protected)
- `PUT /api/questions/:id` - Update question (protected)
- `DELETE /api/questions/:id` - Delete question (protected)

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Set environment variables in your hosting dashboard

### Backend (Vercel/Heroku)
1. Deploy your backend code
2. Set environment variables in your hosting dashboard
3. Update frontend `VITE_BACKEND_URL` to point to your deployed backend

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


## 🐛 Issues

If you encounter any issues or have suggestions, please [open an issue](https://github.com/yourusername/leettracker/issues) on GitHub.

## 📧 Contact

Your Name - aryanbabare1@gmail.com

Project Link: [https://lc.babare.site](https://github.com/aryanx16/3715)


⭐ If you found this project helpful, please give it a star on GitHub!