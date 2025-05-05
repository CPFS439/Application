import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerCharity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Charity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly mission?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly website?: string | null;
  readonly program?: string | null;
  readonly programDescription?: string | null;
  readonly processLink?: string | null;
  readonly product?: string | null;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyCharity = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Charity, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name: string;
  readonly mission?: string | null;
  readonly email?: string | null;
  readonly phone?: string | null;
  readonly website?: string | null;
  readonly program?: string | null;
  readonly programDescription?: string | null;
  readonly processLink?: string | null;
  readonly product?: string | null;
  readonly category?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Charity = LazyLoading extends LazyLoadingDisabled ? EagerCharity : LazyCharity

export declare const Charity: (new (init: ModelInit<Charity>) => Charity) & {
  copyOf(source: Charity, mutator: (draft: MutableModel<Charity>) => MutableModel<Charity> | void): Charity;
}