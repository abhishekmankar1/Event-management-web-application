# Event Management Web Application

This is a full-stack MERN application for creating, viewing, and managing events with role-based login.

## Technologies Used
- React.js + Tailwind CSS
- Node.js + Express
- MongoDB + Mongoose
- JWT Auth + Role-based access

## Setup Instructions
1. `cd client && npm install`
2. `cd ../server && npm install`
3. Create `.env` in server with your MongoDB URI and JWT_SECRET
4. Run backend: `npm run dev`
5. Run frontend: `cd ../client && npm start`

## Features
- Organizer/user registration & login
- Create/Edit/Delete events (organizer only)
- View/search events (all users)
