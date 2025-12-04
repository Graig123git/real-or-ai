/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
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

export const listUsers = /* GraphQL */ `
  query ListUsers {
    listUsers {
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
