/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createCharity = /* GraphQL */ `mutation CreateCharity(
  $input: CreateCharityInput!
  $condition: ModelCharityConditionInput
) {
  createCharity(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.CreateCharityMutationVariables,
  APITypes.CreateCharityMutation
>;
export const updateCharity = /* GraphQL */ `mutation UpdateCharity(
  $input: UpdateCharityInput!
  $condition: ModelCharityConditionInput
) {
  updateCharity(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.UpdateCharityMutationVariables,
  APITypes.UpdateCharityMutation
>;
export const deleteCharity = /* GraphQL */ `mutation DeleteCharity(
  $input: DeleteCharityInput!
  $condition: ModelCharityConditionInput
) {
  deleteCharity(input: $input, condition: $condition) {
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
` as GeneratedMutation<
  APITypes.DeleteCharityMutationVariables,
  APITypes.DeleteCharityMutation
>;
