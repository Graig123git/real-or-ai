# Real or AI App

## Environment Variables

This app uses environment variables for configuration. To set up the environment variables:

1. Create a `.env` file in the app directory (this directory)
2. Add the following environment variables to the `.env` file:

```
EXPO_PUBLIC_AWS_USER_POOL_ID=your_user_pool_id
EXPO_PUBLIC_AWS_USER_POOL_CLIENT_ID=your_user_pool_client_id
EXPO_PUBLIC_AWS_IDENTITY_POOL_ID=your_identity_pool_id
```

You can copy the `.env.example` file and replace the placeholder values with your actual AWS Cognito configuration.

## Running the App

To run the app:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

Then, follow the instructions in the terminal to run the app on your device or emulator.
