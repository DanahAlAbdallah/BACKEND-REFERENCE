# NODEJS Backend

This project provides backend functionality for CRUD operations as a reference.

## Technologies Used

- Node.js
- Express.js
- MongoDB (with Mongoose)
- JWT for authentication
- Bcrypt for password hashing

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/travel-agency-backend.git
   cd travel-agency-backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:

   ```plaintext
   PORT=5000
   HOST=192.168.1.1
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:

   ```bash
   node app.js
   ```
