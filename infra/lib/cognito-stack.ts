import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';

export class CognitoStack extends cdk.Stack {
  public readonly userPool: cognito.UserPool;
  public readonly userPoolClient: cognito.UserPoolClient;
  public readonly identityPool: cognito.CfnIdentityPool;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create Cognito User Pool
    this.userPool = new cognito.UserPool(this, 'RealOrAIUsers', {
      userPoolName: 'RealOrAIUsers',
      selfSignUpEnabled: true,
      signInAliases: {
        email: true,
      },
      autoVerify: {
        email: true,
      },
      standardAttributes: {
        email: {
          required: true,
          mutable: true,
        },
        givenName: {
          required: true,
          mutable: true,
        },
      },
      passwordPolicy: {
        minLength: 8,
        requireLowercase: true,
        requireUppercase: true,
        requireDigits: true,
        requireSymbols: false,
      },
      accountRecovery: cognito.AccountRecovery.EMAIL_ONLY,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    // Create app client
    this.userPoolClient = this.userPool.addClient('RealOrAIAppClient', {
      userPoolClientName: 'RealOrAIAppClient',
      generateSecret: false,
      authFlows: {
        userPassword: true,
        userSrp: true,
        adminUserPassword: true,
        custom: true,
      },
      oAuth: {
        flows: {
          authorizationCodeGrant: true,
        },
        scopes: [
          cognito.OAuthScope.EMAIL,
          cognito.OAuthScope.OPENID,
          cognito.OAuthScope.PROFILE,
        ],
        callbackUrls: [
          'realoraiapp://auth',
        ],
        logoutUrls: [
          'realoraiapp://signout',
        ],
      },
      refreshTokenValidity: cdk.Duration.days(30),
      accessTokenValidity: cdk.Duration.hours(1),
      idTokenValidity: cdk.Duration.hours(1),
    });

    // Add Google as an identity provider
    // Note: You need to provide the actual Google client IDs
    const googleProvider = new cognito.UserPoolIdentityProviderGoogle(this, 'GoogleProvider', {
      userPool: this.userPool,
      clientId: 'GOOGLE_CLIENT_ID', // Replace with actual Google client ID
      clientSecretValue: cdk.SecretValue.unsafePlainText('GOOGLE_CLIENT_SECRET'), // Replace with actual Google client secret
      scopes: ['profile', 'email', 'openid'],
      attributeMapping: {
        email: cognito.ProviderAttribute.GOOGLE_EMAIL,
        givenName: cognito.ProviderAttribute.GOOGLE_NAME,
        profilePicture: cognito.ProviderAttribute.GOOGLE_PICTURE,
      },
    });

    // Ensure the identity providers are created before the client can use them
    this.userPoolClient.node.addDependency(googleProvider);
    
    // Note: Apple provider is commented out until we have valid credentials
    // const appleProvider = new cognito.UserPoolIdentityProviderApple(this, 'AppleProvider', {
    //   userPool: this.userPool,
    //   clientId: 'APPLE_SERVICE_ID', // Replace with actual Apple service ID
    //   teamId: 'APPLE_TEAM_ID', // Replace with actual Apple team ID
    //   keyId: 'APPLE_KEY_ID', // Replace with actual Apple key ID
    //   privateKey: 'APPLE_PRIVATE_KEY', // Replace with actual Apple private key
    //   attributeMapping: {
    //     email: cognito.ProviderAttribute.APPLE_EMAIL,
    //     givenName: cognito.ProviderAttribute.APPLE_NAME,
    //   },
    // });
    // this.userPoolClient.node.addDependency(appleProvider);

    // Create Cognito Identity Pool
    this.identityPool = new cognito.CfnIdentityPool(this, 'RealOrAIIdentityPool', {
      identityPoolName: 'RealOrAIIdentityPool',
      allowUnauthenticatedIdentities: false,
      cognitoIdentityProviders: [
        {
          clientId: this.userPoolClient.userPoolClientId,
          providerName: this.userPool.userPoolProviderName,
        },
      ],
    });

    // Create roles for authenticated users
    const authenticatedRole = new iam.Role(this, 'CognitoAuthenticatedRole', {
      assumedBy: new iam.FederatedPrincipal(
        'cognito-identity.amazonaws.com',
        {
          StringEquals: {
            'cognito-identity.amazonaws.com:aud': this.identityPool.ref,
          },
          'ForAnyValue:StringLike': {
            'cognito-identity.amazonaws.com:amr': 'authenticated',
          },
        },
        'sts:AssumeRoleWithWebIdentity'
      ),
    });

    // Attach policies to the authenticated role
    authenticatedRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'cognito-sync:*',
          'cognito-identity:*',
        ],
        resources: ['*'],
      })
    );

    // Attach roles to the Identity Pool
    new cognito.CfnIdentityPoolRoleAttachment(this, 'IdentityPoolRoleAttachment', {
      identityPoolId: this.identityPool.ref,
      roles: {
        authenticated: authenticatedRole.roleArn,
      },
    });

    // Output the User Pool ID and App Client ID
    new cdk.CfnOutput(this, 'UserPoolId', {
      value: this.userPool.userPoolId,
    });

    new cdk.CfnOutput(this, 'UserPoolClientId', {
      value: this.userPoolClient.userPoolClientId,
    });

    new cdk.CfnOutput(this, 'IdentityPoolId', {
      value: this.identityPool.ref,
    });
  }
}
