/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCharitiesWithCategories = /* GraphQL */ `subscription OnCreateCharitiesWithCategories(
  $filter: ModelSubscriptionCharitiesWithCategoriesFilterInput
) {
  onCreateCharitiesWithCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCharitiesWithCategoriesSubscriptionVariables,
  APITypes.OnCreateCharitiesWithCategoriesSubscription
>;
export const onUpdateCharitiesWithCategories = /* GraphQL */ `subscription OnUpdateCharitiesWithCategories(
  $filter: ModelSubscriptionCharitiesWithCategoriesFilterInput
) {
  onUpdateCharitiesWithCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCharitiesWithCategoriesSubscriptionVariables,
  APITypes.OnUpdateCharitiesWithCategoriesSubscription
>;
export const onDeleteCharitiesWithCategories = /* GraphQL */ `subscription OnDeleteCharitiesWithCategories(
  $filter: ModelSubscriptionCharitiesWithCategoriesFilterInput
) {
  onDeleteCharitiesWithCategories(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCharitiesWithCategoriesSubscriptionVariables,
  APITypes.OnDeleteCharitiesWithCategoriesSubscription
>;
