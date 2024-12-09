require("dotenv").config(); // Load environment variables from .env file

const globals = {
    connectionStrings: {
        // MongoDB connection string from .env file
        MongoDB: process.env.CONNECTION_STRING_MONGODB,
    },
    credentials: {
        // Basic Authentication credentials from .env file
        username: process.env.AUTH_USERNAME,
        password: process.env.AUTH_PASSWORD,
    },
    server: {
        // Server port
        port: process.env.PORT || 5000,
    },
};

// Export the globals object for use in other parts of the application
module.exports = globals;

