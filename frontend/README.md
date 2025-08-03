BlogHub – Simple MERN Stack Blog

Features-
User Authentication (JWT)

Full CRUD for blog posts (Create, Read, Update, Delete)

Redux Toolkit for state management

Tailwind CSS for a modern, responsive UI

Form validation and clear UX

Deployed on Render (see below!)

Project Structure-
bloghub/
├── backend/          # Express + MongoDB API server
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
├── frontend/         # React + Vite client
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   └── services/
│   └── package.json
└── README.md


1. Clone and install server (backend):
bash
git clone https://github.com/<your-username>/bloghub.git
cd bloghub/backend
npm install
# Create a .env file (see below)
npm starT

2. Clone and install client (frontend):
bash
cd ../frontend
npm install

# Create a .env file (see below)
npm start

 Environment Variables

Backend (backend/.env)

MONGODB_URI=_mongodb_atlas_url

JWT_SECRET=your_jwt_secret

FRONTEND_URL=http://localhost:5173
PORT=5000

Frontend (frontend/.env)
VITE_API_URL=http://localhost:5000/api



REACT_APP_API_URL=http://localhost:5000/api


 Deployment (Render.com)

Both frontend and backend are deployed on Render:

Push your project to GitHub (both /frontend and /backend folders).

Deploy backend:

 New → Web Service

 Root Directory: backend

 Build Command: npm install

 Start Command: npm start

 Set environment variables (MONGODB_URI, JWT_SECRET, FRONTEND_URL—no quotes)

Deploy frontend:

 New → Web Service (or Static Site)

 Root Directory: frontend

 Build Command: npm install && npm run build

 Start Command: npm start (serve -s dist in package.json)

 Set VITE_API_URL to your Render backend URL

API Endpoints

Auth
POST /api/auth/register — Register new user

POST /api/auth/login — Login user

GET /api/auth/me — View own user profile

Blog
GET /api/blogs — List ALL published blogs

GET /api/blogs/:id — View single blog

POST /api/blogs — Create blog (auth required)

PUT /api/blogs/:id — Update blog (author only)

DELETE /api/blogs/:id — Delete blog (author only)

User
GET /api/users/me — Your profile & stats (auth required)



 Hosted Demos
Frontend: https://blog-3-qy2g.onrender.com

Backend: https://blog-1-xfi4.onrender.com

 Notes-Fully decoupled, clearly organized folders — easy to maintain and deploy

No context API: state is with Redux Toolkit only

Minimal, clean folder and component structure

Tailwind CSS for responsive, beautiful UI

API and environment configs are clearly separated for local/dev/prod
