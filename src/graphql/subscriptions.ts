/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "../API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateCharity = /* GraphQL */ `subscription OnCreateCharity($filter: ModelSubscriptionCharityFilterInput) {
  onCreateCharity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateCharitySubscriptionVariables,
  APITypes.OnCreateCharitySubscription
>;
export const onUpdateCharity = /* GraphQL */ `subscription OnUpdateCharity($filter: ModelSubscriptionCharityFilterInput) {
  onUpdateCharity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateCharitySubscriptionVariables,
  APITypes.OnUpdateCharitySubscription
>;
export const onDeleteCharity = /* GraphQL */ `subscription OnDeleteCharity($filter: ModelSubscriptionCharityFilterInput) {
  onDeleteCharity(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteCharitySubscriptionVariables,
  APITypes.OnDeleteCharitySubscription
>;
