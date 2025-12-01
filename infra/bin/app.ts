#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { CognitoStack } from '../lib/cognito-stack';
import { AppSyncStack } from '../lib/appsync-stack';
import { DynamoDBStack } from '../lib/dynamodb-stack';

const app = new cdk.App();

// Create the stacks
const dynamodbStack = new DynamoDBStack(app, 'RealOrAIDynamoDBStack', {
  stackName: 'RealOrAI-DynamoDB',
  description: 'DynamoDB stack for Real or AI application',
});

const cognitoStack = new CognitoStack(app, 'RealOrAICognitoStack', {
  stackName: 'RealOrAI-Cognito',
  description: 'Cognito stack for Real or AI application',
});

const appsyncStack = new AppSyncStack(app, 'RealOrAIAppSyncStack', {
  stackName: 'RealOrAI-AppSync',
  description: 'AppSync stack for Real or AI application',
  userPool: cognitoStack.userPool,
});

// Add dependencies between stacks
appsyncStack.node.addDependency(cognitoStack);
