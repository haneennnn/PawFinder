# PawFinder Backend

PawFinder is a backend API for a platform that helps people report lost and found pets and reconnect them with their owners.

## Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- Postman

## Modules

### Pet Reports

Manages lost pet reports.

### Found Pet Reports

Manages reports for pets that have been found.

### Claims

Manages claims made by people who believe a reported pet belongs to them.

### Rescue Cases

Manages animal rescue cases.

## API Routes

### Pet Reports

- POST `/api/v1/petReports`
- GET `/api/v1/petReports`
- GET `/api/v1/petReports/:id`
- PATCH `/api/v1/petReports/:id`
- DELETE `/api/v1/petReports/:id`

### Found Pet Reports

- POST `/api/v1/foundPetReports`
- GET `/api/v1/foundPetReports`
- GET `/api/v1/foundPetReports/:id`
- PATCH `/api/v1/foundPetReports/:id`
- DELETE `/api/v1/foundPetReports/:id`

### Claims

- POST `/api/v1/claims`
- GET `/api/v1/claims`
- GET `/api/v1/claims/:id`
- PATCH `/api/v1/claims/:id`
- DELETE `/api/v1/claims/:id`

### Rescue Cases

- POST `/api/v1/rescueCases`
- GET `/api/v1/rescueCases`
- GET `/api/v1/rescueCases/:id`
- PATCH `/api/v1/rescueCases/:id`
- DELETE `/api/v1/rescueCases/:id`

## Database

The project uses MongoDB Atlas with Mongoose.

The MongoDB connection string is stored in the `.env` file.

Create a `.env` file inside the backend folder:

```env
MONGO_URI=your_mongodb_connection_string
PORT=3000
```

Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string.

Do not upload the `.env` file because it contains private database information.

## Installation

### 1. Install Node.js

Make sure Node.js is installed on your computer.

Check the Node.js version:

```bash
node -v
```

Check the npm version:

```bash
npm -v
```

### 2. Open the Project

Open a terminal and navigate to the backend folder:

```bash
cd PawFinder/backend
```

### 3. Install Dependencies

Install the packages required by the project:

```bash
npm install
```

## Run the Server

Start the development server with:

```bash
npm run dev
```

Nodemon will start the server and automatically restart it when changes are made.

If everything is working correctly, the terminal should show:

```text
Connected to MongoDB Atlas
Server running on port 3000
```

The API will be available at:

```text
http://localhost:3000
```

## Testing

The API endpoints are tested using Postman.

The current modules support the following CRUD operations:

- POST - Create a new item
- GET - Get items
- PATCH - Update an item
- DELETE - Delete an item

The current modules have been tested using Postman.


## Features

- CRUD operations for Pet Reports, Found Pet Reports, Claims, and Rescue Cases
- Image upload for Pet Reports using Multer
- Uploaded image path saved with the Pet Report in MongoDB
- API testing using Postman



## Authentication

The authentication module allows users to create accounts, log in securely, and access protected routes using JWT authentication.

### User Roles

PawFinder currently supports:

- `user` — regular application user
- `admin` — administrator

### Authentication Features

- User registration
- Password hashing using bcryptjs
- User login
- JWT token generation
- JWT token verification
- Protected routes
- Authentication testing using Postman

### Authentication Routes

| Method | Route | Description | Protected |
|---|---|---|---|
| POST | `/api/v1/auth/signup` | Register a new user and return a JWT token | No |
| POST | `/api/v1/auth/login` | Login with email and password | No |
| GET | `/api/v1/auth/profile` | Get the authenticated user's profile | Yes |

### API Usage Examples

**Signup**

Send the user's name, email, password, phone, and role to the signup endpoint. A successful registration returns a JWT token.

**Login**

Send the user's email and password to the login endpoint. With valid credentials, the API returns a JWT token.

**Protected Profile**

Send a GET request to the profile endpoint and include the JWT token in the Authorization header as a Bearer token. If the token is valid, the authenticated user's profile is returned.

**Invalid Login**

Sending an incorrect email or password returns an authentication error.

**Unauthorized Request**

Accessing the protected profile route without a valid JWT token is rejected.

### Running the Authentication Module

1. Install the project dependencies:

```bash
npm install

2. Create a .env file and add the required environment variables:
PORT=3000
JWT_SECRET=your_secret_key

Also add your existing MongoDB connection variable.




