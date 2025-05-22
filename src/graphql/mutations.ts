/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCharitiesWithCategories = /* GraphQL */ `mutation CreateCharitiesWithCategories(
  $input: CreateCharitiesWithCategoriesInput!
  $condition: ModelCharitiesWithCategoriesConditionInput
) {
  createCharitiesWithCategories(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCharitiesWithCategoriesMutationVariables,
  APITypes.CreateCharitiesWithCategoriesMutation
>;
export const updateCharitiesWithCategories = /* GraphQL */ `mutation UpdateCharitiesWithCategories(
  $input: UpdateCharitiesWithCategoriesInput!
  $condition: ModelCharitiesWithCategoriesConditionInput
) {
  updateCharitiesWithCategories(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCharitiesWithCategoriesMutationVariables,
  APITypes.UpdateCharitiesWithCategoriesMutation
>;
export const deleteCharitiesWithCategories = /* GraphQL */ `mutation DeleteCharitiesWithCategories(
  $input: DeleteCharitiesWithCategoriesInput!
  $condition: ModelCharitiesWithCategoriesConditionInput
) {
  deleteCharitiesWithCategories(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCharitiesWithCategoriesMutationVariables,
  APITypes.DeleteCharitiesWithCategoriesMutation
>;
