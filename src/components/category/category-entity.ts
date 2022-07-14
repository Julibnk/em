// import { isUIID } from '../../utils/validators';

import { validate as validateUuid } from 'uuid';
export interface Category {
  // PK
  accountId: string;
  // id: string;
  name: string;
  shortDescription?: string;
}

interface BuildCategory {
  validateUuid: typeof validateUuid;
}

export const buildMakeCategory =
  ({ validateUuid }: BuildCategory) =>
  ({ accountId, name, shortDescription = '' }: Category): Category => {
    if (!accountId) {
      throw Error('Falta id de cuenta');
    }

    // if (!isUIID(id)) {
    //   throw Error('Id de categoria invalido');
    // }
    console.log(accountId);
    if (!validateUuid(accountId)) {
      throw Error('Id de cuenta invalido');
    }

    if (!name) {
      throw Error('La categoria debe de tener un nombre');
    }

    const categoryEntity: Category = {
      accountId,
      // id,
      name,
      shortDescription,
    };
    return categoryEntity;
  };

const makeCategory = buildMakeCategory({ validateUuid });

export default makeCategory;
