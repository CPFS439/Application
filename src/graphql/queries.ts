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
