# smart-brain-api

The **smart-brain-api** is a RESTful API built using Node.js, Express, and PostgreSQL that provides face detection functionality. It allows users to submit images and detects faces in those images.

## Installation

To install and run the **smart-brain-api** locally, follow these steps:

1. Clone the repository: `git clone https://github.com/can/smart-brain-api.git`
2. Navigate to the project directory: `cd smart-brain-api`
3. Install dependencies: `npm install`
4. Set up PostgreSQL database: Create a PostgreSQL database and configure the database connection details in the `.env` file.
5. Run migrations: `npm run migrate`
6. Start the API server: `npm start`
7. The API server will be running on `http://localhost:3001`.

## API Endpoints

The **smart-brain-api** provides the following endpoints:

- **POST /signin**: Endpoint for user sign-in. Expects a JSON body with user credentials and returns a token for authentication.
- **POST /register**: Endpoint for user registration. Expects a JSON body with user details and returns a newly created user object.
- **GET /profile/:id**: Endpoint for retrieving user profile information by user ID. Requires a valid authorization token.
- **PUT /image**: Endpoint for submitting an image URL for face detection. Requires a valid authorization token.
- **POST /image**: Endpoint for submitting an image file for face detection. Requires a valid authorization token.

## Usage

To use the **smart-brain-api** in your application, you can make HTTP requests to the endpoints listed above using a tool like `curl`, Postman, or any other HTTP client. Here's an example using `curl`:

