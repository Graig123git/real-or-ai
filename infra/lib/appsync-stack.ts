import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as iam from 'aws-cdk-lib/aws-iam';

interface AppSyncStackProps extends cdk.StackProps {
  userPool: cognito.UserPool;
  stackName?: string;
  description?: string;
}

export class AppSyncStack extends cdk.Stack {
  public readonly api: appsync.GraphqlApi;

  constructor(scope: Construct, id: string, props: AppSyncStackProps) {
    super(scope, id, props);

    // Create the AppSync API
    this.api = new appsync.GraphqlApi(this, 'RealOrAIApi', {
      name: 'RealOrAIApi',
      schema: appsync.SchemaFile.fromAsset('./graphql/schema.graphql'),
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: {
            userPool: props.userPool,
          },
        },
        // No additional authorization modes - all API access requires authentication
      },
      xrayEnabled: true,
    });

    // Output the API URL and ID
    new cdk.CfnOutput(this, 'GraphQLApiURL', {
      value: this.api.graphqlUrl,
    });

    new cdk.CfnOutput(this, 'GraphQLApiID', {
      value: this.api.apiId,
    });
  }
}
