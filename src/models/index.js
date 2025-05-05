// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Charity } = initSchema(schema);

export {
  Charity
};