/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCharitiesWithCategoriesInput = {
  id?: string | null,
  name: string,
  mission?: string | null,
  email?: string | null,
  phone?: string | null,
  website?: string | null,
  program?: string | null,
  programDescription?: string | null,
  processLink?: string | null,
  product?: string | null,
  category?: string | null,
};

export type ModelCharitiesWithCategoriesConditionInput = {
  name?: ModelStringInput | null,
  mission?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  website?: ModelStringInput | null,
  program?: ModelStringInput | null,
  programDescription?: ModelStringInput | null,
  processLink?: ModelStringInput | null,
  product?: ModelStringInput | null,
  category?: ModelStringInput | null,
  and?: Array< ModelCharitiesWithCategoriesConditionInput | null > | null,
  or?: Array< ModelCharitiesWithCategoriesConditionInput | null > | null,
  not?: ModelCharitiesWithCategoriesConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type CharitiesWithCategories = {
  __typename: "CharitiesWithCategories",
  id?: string | null,
  name: string,
  mission?: string | null,
  email?: string | null,
  phone?: string | null,
  website?: string | null,
  program?: string | null,
  programDescription?: string | null,
  processLink?: string | null,
  product?: string | null,
  category?: string | null,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCharitiesWithCategoriesInput = {
  id: string,
  name?: string | null,
  mission?: string | null,
  email?: string | null,
  phone?: string | null,
  website?: string | null,
  program?: string | null,
  programDescription?: string | null,
  processLink?: string | null,
  product?: string | null,
  category?: string | null,
};

export type DeleteCharitiesWithCategoriesInput = {
  id: string,
};

export type CreateUserInput = {
  id?: string | null,
  email: string,
  militaryBranch?: string | null,
  age?: string | null,
  phoneNumber?: string | null,
  profilePicture?: string | null,
  address?: AddressInput | null,
};

export type AddressInput = {
  street?: string | null,
  city?: string | null,
  state?: string | null,
  zipCode?: string | null,
  country?: string | null,
};

export type ModelUserConditionInput = {
  email?: ModelStringInput | null,
  militaryBranch?: ModelStringInput | null,
  age?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  and?: Array< ModelUserConditionInput | null > | null,
  or?: Array< ModelUserConditionInput | null > | null,
  not?: ModelUserConditionInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type User = {
  __typename: "User",
  id: string,
  email: string,
  militaryBranch?: string | null,
  age?: string | null,
  phoneNumber?: string | null,
  profilePicture?: string | null,
  address?: Address | null,
  createdAt: string,
  updatedAt: string,
};

export type Address = {
  __typename: "Address",
  street?: string | null,
  city?: string | null,
  state?: string | null,
  zipCode?: string | null,
  country?: string | null,
};

export type UpdateUserInput = {
  id: string,
  email?: string | null,
  militaryBranch?: string | null,
  age?: string | null,
  phoneNumber?: string | null,
  profilePicture?: string | null,
  address?: AddressInput | null,
};

export type DeleteUserInput = {
  id: string,
};

export type ModelCharitiesWithCategoriesFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  mission?: ModelStringInput | null,
  email?: ModelStringInput | null,
  phone?: ModelStringInput | null,
  website?: ModelStringInput | null,
  program?: ModelStringInput | null,
  programDescription?: ModelStringInput | null,
  processLink?: ModelStringInput | null,
  product?: ModelStringInput | null,
  category?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCharitiesWithCategoriesFilterInput | null > | null,
  or?: Array< ModelCharitiesWithCategoriesFilterInput | null > | null,
  not?: ModelCharitiesWithCategoriesFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelCharitiesWithCategoriesConnection = {
  __typename: "ModelCharitiesWithCategoriesConnection",
  items:  Array<CharitiesWithCategories | null >,
  nextToken?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDInput | null,
  email?: ModelStringInput | null,
  militaryBranch?: ModelStringInput | null,
  age?: ModelStringInput | null,
  phoneNumber?: ModelStringInput | null,
  profilePicture?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCharitiesWithCategoriesFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  mission?: ModelSubscriptionStringInput | null,
  email?: ModelSubscriptionStringInput | null,
  phone?: ModelSubscriptionStringInput | null,
  website?: ModelSubscriptionStringInput | null,
  program?: ModelSubscriptionStringInput | null,
  programDescription?: ModelSubscriptionStringInput | null,
  processLink?: ModelSubscriptionStringInput | null,
  product?: ModelSubscriptionStringInput | null,
  category?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCharitiesWithCategoriesFilterInput | null > | null,
  or?: Array< ModelSubscriptionCharitiesWithCategoriesFilterInput | null > | null,
};

export type ModelSubscriptionIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  in?: Array< string | null > | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionUserFilterInput = {
  id?: ModelSubscriptionIDInput | null,
  email?: ModelSubscriptionStringInput | null,
  militaryBranch?: ModelSubscriptionStringInput | null,
  age?: ModelSubscriptionStringInput | null,
  phoneNumber?: ModelSubscriptionStringInput | null,
  profilePicture?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
};

export type CreateCharitiesWithCategoriesMutationVariables = {
  input: CreateCharitiesWithCategoriesInput,
  condition?: ModelCharitiesWithCategoriesConditionInput | null,
};

export type CreateCharitiesWithCategoriesMutation = {
  createCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCharitiesWithCategoriesMutationVariables = {
  input: UpdateCharitiesWithCategoriesInput,
  condition?: ModelCharitiesWithCategoriesConditionInput | null,
};

export type UpdateCharitiesWithCategoriesMutation = {
  updateCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCharitiesWithCategoriesMutationVariables = {
  input: DeleteCharitiesWithCategoriesInput,
  condition?: ModelCharitiesWithCategoriesConditionInput | null,
};

export type DeleteCharitiesWithCategoriesMutation = {
  deleteCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
  condition?: ModelUserConditionInput | null,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
  condition?: ModelUserConditionInput | null,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCharitiesWithCategoriesQueryVariables = {
  id: string,
};

export type GetCharitiesWithCategoriesQuery = {
  getCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCharitiesWithCategoriesQueryVariables = {
  filter?: ModelCharitiesWithCategoriesFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCharitiesWithCategoriesQuery = {
  listCharitiesWithCategories?:  {
    __typename: "ModelCharitiesWithCategoriesConnection",
    items:  Array< {
      __typename: "CharitiesWithCategories",
      id?: string | null,
      name: string,
      mission?: string | null,
      email?: string | null,
      phone?: string | null,
      website?: string | null,
      program?: string | null,
      programDescription?: string | null,
      processLink?: string | null,
      product?: string | null,
      category?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      email: string,
      militaryBranch?: string | null,
      age?: string | null,
      phoneNumber?: string | null,
      profilePicture?: string | null,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCharitiesWithCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCharitiesWithCategoriesFilterInput | null,
};

export type OnCreateCharitiesWithCategoriesSubscription = {
  onCreateCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCharitiesWithCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCharitiesWithCategoriesFilterInput | null,
};

export type OnUpdateCharitiesWithCategoriesSubscription = {
  onUpdateCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCharitiesWithCategoriesSubscriptionVariables = {
  filter?: ModelSubscriptionCharitiesWithCategoriesFilterInput | null,
};

export type OnDeleteCharitiesWithCategoriesSubscription = {
  onDeleteCharitiesWithCategories?:  {
    __typename: "CharitiesWithCategories",
    id?: string | null,
    name: string,
    mission?: string | null,
    email?: string | null,
    phone?: string | null,
    website?: string | null,
    program?: string | null,
    programDescription?: string | null,
    processLink?: string | null,
    product?: string | null,
    category?: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    id: string,
    email: string,
    militaryBranch?: string | null,
    age?: string | null,
    phoneNumber?: string | null,
    profilePicture?: string | null,
    address?:  {
      __typename: "Address",
      street?: string | null,
      city?: string | null,
      state?: string | null,
      zipCode?: string | null,
      country?: string | null,
    } | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
