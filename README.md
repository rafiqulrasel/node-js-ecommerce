# E-Commerce Backend REST API

A robust, multi-lingual, and scalable E-commerce backend REST API built using **Node.js**, **Express 5**, and **MongoDB**. This project implements a modular service-repository architecture, secure JWT authentication, request validation, standardized API responses, and localization (i18n) support.

---

## 🚀 Tech Stack

- **Runtime Environment:** Node.js (ES Modules)
- **Framework:** Express 5
- **Database:** MongoDB (via Mongoose ODM)
- **Authentication & Security:** JSON Web Tokens (JWT), bcryptjs, Helmet
- **Request Validation:** express-validator
- **Localization:** i18next & i18next-http-middleware
- **Logging & Monitoring:** Winston & Morgan
- **Other Utilities:** Compression, CORS, Multer, Cloudinary, Nodemailer, Stripe

---

## 🛠️ Key Features

- **Multi-lingual Translation (i18n):** Dynamically detects language preferences from the client via the `Accept-Language` header (supports English `en` and Bengali `bn`).
- **Standardized API Response & Error Handling:** Uniform structure for all successful responses and error instances (including validation and operational database errors).
- **Security Protections:** HTTP headers security via Helmet, Gzip compression, and standard CORS policies.
- **Service-Repository Architecture:** Separates business logic from data access layers, promoting clean, maintainable, and testable code.

---

## 📁 Directory Structure

```text
node_js_ecommerce_mongo/
├── src/
│   ├── config/            # Server, database, i18n, & service configurations
│   ├── locales/           # Translation dictionaries (JSON namespace files)
│   │   ├── en/            # English translations (default)
│   │   └── bn/            # Bengali translations
│   ├── middlewares/       # Custom Express middlewares (auth, validation, errors)
│   ├── modules/           # Feature modules (Auth, User, Product, Cart, etc.)
│   │   └── auth/          # Authentication module containing controller, repository, & service
│   ├── routes/            # Express router mappings and route registration
│   ├── utils/             # Helper classes & response format utilities
│   ├── validators/        # Request body validators definitions
│   ├── app.js             # Express application initialization & middleware stack
│   └── server.js          # App bootstrap, DB connection, & server startup listener
├── .env                   # Local environment configuration file
├── package.json           # Scripts, dependencies, and manifest configuration
└── README.md              # Project documentation
```

---

## ⚙️ Environment Variables Config

Create a `.env` file in the root directory and populate it with the following environment variables:

```env
# Application Port
PORT=****

# Run Mode (development / production)
NODE_ENV=****

# MongoDB Connection String
MONGO_URI=****

# JSON Web Token Config
JWT_SECRET=****
JWT_EXPIRE=****

# Cloudinary Config (for media uploads)
CLOUD_NAME=****
CLOUD_KEY=****
CLOUD_SECRET=****
```

---

## 🏁 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (running locally or a remote MongoDB Atlas URI)

### Installation
1. Clone the project and navigate into the root directory.
2. Install the package dependencies:
   ```bash
   npm install
   ```
3. Configure your local `.env` variables as outlined in the [Environment Variables Config](#️-environment-variables-config) section.

### Run the Server
- Run the server in **development mode** (with hot-reloading via nodemon):
  ```bash
  npm run dev
  ```
- Run the server in **production mode**:
  ```bash
  npm start
  ```

---

## 📖 API Documentation (Authentication)

### Global Headers

- **`Accept-Language`** (Optional): Specifies the translation language for response messages. 
  - Supported values: `en` (English, Default), `bn` (Bengali).
- **`Authorization`** (Required for protected endpoints): A Bearer authentication token.
  - Format: `Bearer <JWT_TOKEN>`

---

### Endpoints Reference

#### 1. Register User
Creates a new user account and returns a JWT access token.

- **URL:** `/api/auth/register`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`, `Accept-Language: <lang>`
- **Request Body Fields:**
  - `name` (String, Required, minlength: 2, maxlength: 80)
  - `email` (String, Required, must be a valid email format)
  - `password` (String, Required, minlength: 8)

##### Request Example
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "strongpassword123"
}
```

##### Success Response (201 Created)
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "user": {
      "id": "65f3d4ef6fa1456d2cf99a12",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjNkNGVmNmZhMTQ1NmQyY2Y5OWExMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzMTUzNzQ4LCJleHAiOjE3MTM3NTg1NDh9.signature"
  }
}
```

##### Validation Error Response (400 Bad Request)
Returned when request parameters violate validation constraints.
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "name",
      "message": "Name is required"
    },
    {
      "field": "email",
      "message": "Invalid email address"
    },
    {
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

##### Email Already Exists Response (409 Conflict)
```json
{
  "success": false,
  "message": "Email already exists",
  "errors": null
}
```

---

#### 2. Login User
Authenticates user credentials and returns a JWT access token.

- **URL:** `/api/auth/login`
- **Method:** `POST`
- **Headers:** `Content-Type: application/json`, `Accept-Language: <lang>`
- **Request Body Fields:**
  - `email` (String, Required, must be a valid email format)
  - `password` (String, Required)

##### Request Example
```json
{
  "email": "johndoe@example.com",
  "password": "strongpassword123"
}
```

##### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "65f3d4ef6fa1456d2cf99a12",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user",
      "isActive": true
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjNkNGVmNmZhMTQ1NmQyY2Y5OWExMiIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzEzMTUzNzQ4LCJleHAiOjE3MTM3NTg1NDh9.signature"
  }
}
```

##### Invalid Credentials Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Invalid email or password",
  "errors": null
}
```

##### Account Disabled Response (403 Forbidden)
```json
{
  "success": false,
  "message": "Account is disabled",
  "errors": null
}
```

---

#### 3. Get Current User Profile (Protected)
Retrieves the logged-in user's profile details.

- **URL:** `/api/auth/me`
- **Method:** `GET`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`, `Accept-Language: <lang>`

##### Success Response (200 OK)
```json
{
  "success": true,
  "message": "Profile found successfully",
  "data": {
    "id": "65f3d4ef6fa1456d2cf99a12",
    "name": "John Doe",
    "email": "johndoe@example.com",
    "role": "user",
    "isActive": true
  }
}
```

##### Missing or Invalid Token Response (401 Unauthorized)
```json
{
  "success": false,
  "message": "Unauthorized access",
  "errors": null
}
```
