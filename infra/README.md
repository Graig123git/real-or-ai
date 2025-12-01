# Real or AI Infrastructure

This directory contains the AWS CDK infrastructure code for the Real or AI application.

## Architecture

The infrastructure consists of the following AWS services:

- **Amazon Cognito User Pool**: For user authentication with Email, Google, and Apple login
- **Amazon AppSync**: GraphQL API with Cognito authentication
- **Amazon DynamoDB**: NoSQL database for storing user data

## Prerequisites

- Node.js 14.x or later
- AWS CLI configured with appropriate credentials
- AWS CDK installed globally (`npm install -g aws-cdk`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Update OAuth provider credentials:

Edit `lib/cognito-stack.ts` to replace placeholder values with actual credentials:

- Google OAuth: Replace `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
- Apple OAuth: Replace `APPLE_SERVICE_ID`, `APPLE_TEAM_ID`, `APPLE_KEY_ID`, and `APPLE_PRIVATE_KEY`

3. Bootstrap CDK (if not already done):

```bash
cdk bootstrap
```

## Deployment

Deploy all stacks:

```bash
npm run deploy
```

This will deploy the following stacks:
- RealOrAI-DynamoDB
- RealOrAI-Cognito
- RealOrAI-AppSync

## Outputs

After deployment, the CDK will output important values:

- Cognito User Pool ID
- Cognito App Client ID
- Identity Pool ID
- AppSync GraphQL API URL

These values should be used in the mobile application configuration.

## Clean Up

To remove all resources:

```bash
npm run destroy
```

## Development

- `npm run build`: Compile TypeScript to JavaScript
- `npm run watch`: Watch for changes and compile
- `npm run synth`: Synthesize CloudFormation templates
