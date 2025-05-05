/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateCharityInput = {
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
  id?: string | null,
};

export type ModelCharityConditionInput = {
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
  and?: Array< ModelCharityConditionInput | null > | null,
  or?: Array< ModelCharityConditionInput | null > | null,
  not?: ModelCharityConditionInput | null,
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

export type Charity = {
  __typename: "Charity",
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
  id: string,
  createdAt: string,
  updatedAt: string,
};

export type UpdateCharityInput = {
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
  id: string,
};

export type DeleteCharityInput = {
  id: string,
};

export type ModelCharityFilterInput = {
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
  id?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  and?: Array< ModelCharityFilterInput | null > | null,
  or?: Array< ModelCharityFilterInput | null > | null,
  not?: ModelCharityFilterInput | null,
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

export type ModelCharityConnection = {
  __typename: "ModelCharityConnection",
  items:  Array<Charity | null >,
  nextToken?: string | null,
};

export type ModelSubscriptionCharityFilterInput = {
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
  id?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  and?: Array< ModelSubscriptionCharityFilterInput | null > | null,
  or?: Array< ModelSubscriptionCharityFilterInput | null > | null,
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

export type CreateCharityMutationVariables = {
  input: CreateCharityInput,
  condition?: ModelCharityConditionInput | null,
};

export type CreateCharityMutation = {
  createCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCharityMutationVariables = {
  input: UpdateCharityInput,
  condition?: ModelCharityConditionInput | null,
};

export type UpdateCharityMutation = {
  updateCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCharityMutationVariables = {
  input: DeleteCharityInput,
  condition?: ModelCharityConditionInput | null,
};

export type DeleteCharityMutation = {
  deleteCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetCharityQueryVariables = {
  id: string,
};

export type GetCharityQuery = {
  getCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListCharitiesQueryVariables = {
  filter?: ModelCharityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCharitiesQuery = {
  listCharities?:  {
    __typename: "ModelCharityConnection",
    items:  Array< {
      __typename: "Charity",
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
      id: string,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type OnCreateCharitySubscriptionVariables = {
  filter?: ModelSubscriptionCharityFilterInput | null,
};

export type OnCreateCharitySubscription = {
  onCreateCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCharitySubscriptionVariables = {
  filter?: ModelSubscriptionCharityFilterInput | null,
};

export type OnUpdateCharitySubscription = {
  onUpdateCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCharitySubscriptionVariables = {
  filter?: ModelSubscriptionCharityFilterInput | null,
};

export type OnDeleteCharitySubscription = {
  onDeleteCharity?:  {
    __typename: "Charity",
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
    id: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};
