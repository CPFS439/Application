/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCharitiesWithCategories = /* GraphQL */ `query GetCharitiesWithCategories($id: ID!) {
  getCharitiesWithCategories(id: $id) {
    id
    name
    mission
    email
    phone
    website
    program
    programDescription
    processLink
    product
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCharitiesWithCategoriesQueryVariables,
  APITypes.GetCharitiesWithCategoriesQuery
>;
export const listCharitiesWithCategories = /* GraphQL */ `query ListCharitiesWithCategories(
  $filter: ModelCharitiesWithCategoriesFilterInput
  $limit: Int
  $nextToken: String
) {
  listCharitiesWithCategories(
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      name
      mission
      email
      phone
      website
      program
      programDescription
      processLink
      product
      category
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCharitiesWithCategoriesQueryVariables,
  APITypes.ListCharitiesWithCategoriesQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
    id
    email
    militaryBranch
    age
    phoneNumber
    profilePicture
    address {
      street
      city
      state
      zipCode
      country
      __typename
    }
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      email
      militaryBranch
      age
      phoneNumber
      profilePicture
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
