API App - Users & Courses Management

=>Overview

This is a RESTful API application built to manage users and courses.
It provides endpoints for user authentication, course enrollment, and administration features

=>Features
. User authentication (sign up, login, logout)

.Profile management

.Course creation, update, and deletion

.Role-based access control

=>Technologies Used

.Node.js

.Express.js

.MongoDB (Mongoose ORM)

.JWT for authentication

--------------API Endpoints-----------------
=>Authentication

.POST /api/auth/register - Register a new user

.POST /api/auth/login - Login user

.POST /api/auth/logout - Logout user

=>Users

.GET /api/users - Get all users (Admin only)

.GET /api/users/:id - Get user by ID

.PUT /api/users/:id - Update user details

.DELETE /api/users/:id - Delete user (Admin only)


=> Courses

POST /api/courses - Create a new course (Admin and manger)

GET /api/courses - Get all courses

GET /api/courses/:id - Get course by ID

PUT /api/courses/:id - Update course details (Admin and mange)

DELETE /api/courses/:id - Delete course (Admin and mange)
