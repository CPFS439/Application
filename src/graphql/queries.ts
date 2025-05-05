/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getCharity = /* GraphQL */ `query GetCharity($id: ID!) {
  getCharity(id: $id) {
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
    id
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedQuery<
  APITypes.GetCharityQueryVariables,
  APITypes.GetCharityQuery
>;
export const listCharities = /* GraphQL */ `query ListCharities(
  $filter: ModelCharityFilterInput
  $limit: Int
  $nextToken: String
) {
  listCharities(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      id
      createdAt
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListCharitiesQueryVariables,
  APITypes.ListCharitiesQuery
>;
