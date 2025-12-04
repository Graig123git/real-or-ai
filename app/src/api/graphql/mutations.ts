/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $email: String!
    $name: String!
    $country: String
  ) {
    createUser(
      email: $email
      name: $name
      country: $country
    ) {
      id
      email
      name
      avatarUrl
      level
      xp
      coins
      country
      createdAt
    }
  }
`;

export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $id: ID!
    $name: String
    $avatarUrl: String
    $country: String
  ) {
    updateUser(
      id: $id
      name: $name
      avatarUrl: $avatarUrl
      country: $country
    ) {
      id
      email
      name
      avatarUrl
      level
      xp
      coins
      country
      createdAt
    }
  }
`;
