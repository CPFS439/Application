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
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser($filter: ModelSubscriptionUserFilterInput) {
  onCreateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser($filter: ModelSubscriptionUserFilterInput) {
  onUpdateUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser($filter: ModelSubscriptionUserFilterInput) {
  onDeleteUser(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onCreateBookmark = /* GraphQL */ `subscription OnCreateBookmark($filter: ModelSubscriptionBookmarkFilterInput) {
  onCreateBookmark(filter: $filter) {
    id
    userId
    charityName
    charityId
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnCreateBookmarkSubscriptionVariables,
  APITypes.OnCreateBookmarkSubscription
>;
export const onUpdateBookmark = /* GraphQL */ `subscription OnUpdateBookmark($filter: ModelSubscriptionBookmarkFilterInput) {
  onUpdateBookmark(filter: $filter) {
    id
    userId
    charityName
    charityId
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnUpdateBookmarkSubscriptionVariables,
  APITypes.OnUpdateBookmarkSubscription
>;
export const onDeleteBookmark = /* GraphQL */ `subscription OnDeleteBookmark($filter: ModelSubscriptionBookmarkFilterInput) {
  onDeleteBookmark(filter: $filter) {
    id
    userId
    charityName
    charityId
    category
    createdAt
    updatedAt
    __typename
  }
}
` as GeneratedSubscription<
  APITypes.OnDeleteBookmarkSubscriptionVariables,
  APITypes.OnDeleteBookmarkSubscription
>;
