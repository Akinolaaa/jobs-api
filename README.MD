## Job Posting REST API
This project is a REST API built with Node.js, Express, and MongoDB, serving as the backend for a job posting website. It provides functionality for user authentication and CRUD operations for job listings.

### Features
* User Authentication: Secure user authentication and authorization system using the User schema.
* Job Listings CRUD: Create, Read, Update, and Delete operations for job listings using the Job schema.
* Security Measures: Implemented security features like helmet, xss-clean, and express-rate-limit to protect against common web vulnerabilities.

### Installation
Clone the repository.

Install the dependencies using npm install.

Set up the MongoDB database and configure the connection in the .env file.

Run the application using npm start.

## API Documentation
The API documentation is written using Swagger YAML. You can access the documentation by running the application and visiting the /api-docs endpoint.

## Usage
User Authentication:

Register a new user: POST /auth/register
Login: POST /auth/login
Logout: POST /auth/logout
Job Listings:

* Create a new job listing: POST /jobs
* Get all job listings: GET /jobs
* Get a specific job listing: GET /jobs/:id
* Update a job listing: PUT /jobs/:id
* Delete a job listing: DELETE /jobs/:id
* Please refer to the API documentation for detailed information on request payloads and responses.


#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with the correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in the controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```
