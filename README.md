# 💬 Real-Time Chat Application

A modern, full-stack real-time chat application built with React.js, Node.js, Express, MongoDB, and Socket.io. This application provides instant messaging capabilities with user authentication, avatar selection, and real-time message delivery.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure registration and login system with password hashing
- **Real-time Messaging**: Instant message delivery using Socket.io
- **Avatar System**: Custom avatar selection for personalized user experience
- **Contact Management**: View and chat with all registered users
- **Responsive Design**: Modern UI that works on desktop and mobile devices

### Technical Features
- **Real-time Communication**: WebSocket-based messaging for instant delivery
- **Secure Authentication**: Bcrypt password hashing and JWT-like session management
- **Database Integration**: MongoDB for persistent data storage
- **Modern UI**: Styled-components for beautiful, responsive design
- **Error Handling**: Comprehensive error handling with user-friendly notifications
- **Docker Support**: Containerized deployment with Docker Compose

## 🛠️ Tech Stack

### Frontend
- **React.js 18** - Modern UI framework
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Socket.io Client** - Real-time communication
- **Axios** - HTTP client for API calls
- **SweetAlert2** - Beautiful alert notifications
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional communication
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB** - Database container

## 📁 Project Structure

```
Chat-App/
├── App/                          # Frontend React Application
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   │   ├── Chatcontainer.jsx # Main chat interface
│   │   │   ├── Chatinput.jsx     # Message input component
│   │   │   ├── Contacts.jsx      # User contacts list
│   │   │   ├── Logout.jsx        # Logout functionality
│   │   │   ├── Messages.jsx      # Message display component
│   │   │   └── Welcome.jsx       # Welcome screen
│   │   ├── pages/                # Page components
│   │   │   ├── Chat.jsx          # Main chat page
│   │   │   ├── Login.jsx         # Login page
│   │   │   ├── Register.jsx      # Registration page
│   │   │   └── SetAvatar.jsx     # Avatar selection page
│   │   ├── utils/
│   │   │   └── APIRoutes.js      # API endpoint definitions
│   │   ├── assets/               # Static assets (images, icons)
│   │   ├── App.js                # Main App component
│   │   └── index.js              # Application entry point
│   ├── public/                   # Public assets
│   ├── package.json              # Frontend dependencies
│   └── dockerfile                # Frontend Docker configuration
├── Server/                       # Backend Node.js Application
│   ├── controllers/              # Request handlers
│   │   ├── userController.js     # User-related operations
│   │   └── messagesController.js # Message-related operations
│   ├── models/                   # Database models
│   │   ├── userModel.js          # User schema
│   │   └── messageModel.js       # Message schema
│   ├── routes/                   # API routes
│   │   ├── userRoutes.js         # User endpoints
│   │   └── messagesRoute.js      # Message endpoints
│   ├── volume/                   # MongoDB data persistence
│   ├── server.js                 # Server entry point
│   ├── package.json              # Backend dependencies
│   └── dockerfile                # Backend Docker configuration
├── dockercompose.yml             # Docker Compose configuration
└── README.md                     # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- MongoDB (if running locally)

### Installation

#### Option 1: Docker Deployment (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat-App
   ```

2. **Start the application with Docker Compose**
   ```bash
   docker-compose up --build
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - MongoDB: localhost:27017

#### Option 2: Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Chat-App
   ```

2. **Install frontend dependencies**
   ```bash
   cd App
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../Server
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the Server directory:
   ```env
   MONGO_URL=mongodb://localhost:27017/chat-app
   PORT=3001
   ```

5. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo systemctl start mongod
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

6. **Start the backend server**
   ```bash
   cd Server
   npm start
   ```

7. **Start the frontend application**
   ```bash
   cd App
   npm start
   ```

## 🎯 Usage

### User Registration
1. Navigate to the registration page
2. Fill in your details:
   - Username (minimum 8 characters)
   - Email address
   - Password
   - Confirm password
3. Click "Create User" to register

### User Login
1. Go to the login page
2. Enter your username and password
3. Click "Sign in" to authenticate

### Avatar Selection
1. After successful login, you'll be redirected to avatar selection
2. Choose from available avatar options
3. Your avatar will be set for your profile

### Chatting
1. Once logged in, you'll see the main chat interface
2. Select a contact from the left sidebar
3. Type your message in the input field
4. Press Enter or click the send button
5. Messages are delivered in real-time

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/setavatar/:id` - Set user avatar
- `GET /api/auth/allusers/:id` - Get all users (except current user)

### Message Routes
- `POST /api/messages/addmsg` - Send a message
- `POST /api/messages/getmsg` - Get conversation messages

## 🐳 Docker Configuration

The application is fully containerized with three services:

### Frontend Service
- **Port**: 3000
- **Build**: React application
- **Environment**: Development mode

### Backend Service
- **Port**: 3001
- **Build**: Node.js/Express server
- **Dependencies**: MongoDB service
- **Environment**: Production-like setup

### MongoDB Service
- **Port**: 27017
- **Image**: MongoDB 7
- **Persistence**: Volume mounting for data persistence

## 🎨 UI/UX Features

- **Modern Design**: Dark theme with vibrant accent colors
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Real-time Updates**: Instant message delivery and status updates
- **User-friendly Notifications**: SweetAlert2 for beautiful alerts
- **Smooth Animations**: CSS transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support

## 🔒 Security Features

- **Password Hashing**: Bcrypt for secure password storage
- **Input Validation**: Client and server-side validation
- **CORS Protection**: Configured for secure cross-origin requests
- **Session Management**: Local storage-based user sessions
- **Error Handling**: Secure error messages without sensitive data exposure

## 🚀 Deployment

### Production Deployment
1. Build the frontend for production:
   ```bash
   cd App
   npm run build
   ```

2. Update Docker Compose for production:
   ```yaml
   # Add production environment variables
   environment:
     NODE_ENV: production
   ```

3. Deploy using Docker Compose:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Environment Variables
Create a `.env` file in the Server directory:
```env
MONGO_URL=mongodb://localhost:27017/chat-app
PORT=3001
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js community for the amazing framework
- Socket.io for real-time communication capabilities
- MongoDB for flexible data storage
- Styled-components for beautiful styling solutions

## 📞 Support

If you have any questions or need help with the application, please:
1. Check the existing issues in the repository
2. Create a new issue with detailed description
3. Contact the development team

---

**Happy Chatting! 💬✨**