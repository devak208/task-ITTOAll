# Task-ITTOAll

A full-stack authentication application with a React frontend and Node.js backend, featuring email/password authentication and Google OAuth integration.

## Project Structure

```
task-ITTOAll/
├── backend/          # Node.js/Express API server
│   ├── README.md     # Backend documentation
│   └── ...
├── frontend/         # React application
│   ├── README.md     # Frontend documentation
│   └── ...
└── README.md         # This file
```

## Features

- **User Authentication**: Email/password registration and login
- **Google OAuth**: Social login integration
- **JWT Tokens**: Secure session management with refresh tokens
- **Responsive UI**: Modern interface built with React and Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Security**: HTTPOnly cookies, CSRF protection, and secure headers

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Google OAuth credentials (for social login)

### Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-ITTOAll
   ```

2. **Set up the backend:**
   ```bash
   cd backend
   npm install
   # Configure .env file (see backend/README.md)
   npx prisma db push
   npm run dev
   ```

3. **Set up the frontend:**
   ```bash
   cd ../frontend
   npm install
   npm start
   ```

4. **Access the application:**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Documentation

- **Backend API**: See [backend/README.md](./backend/README.md) for detailed API documentation
- **Frontend**: See [frontend/README.md](./frontend/README.md) for frontend setup and development

## Technology Stack

### Backend
- **Node.js** with Express.js
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **Passport.js** for Google OAuth
- **bcryptjs** for password hashing

### Frontend
- **React 19** with functional components
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication
- **React Hot Toast** for notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.