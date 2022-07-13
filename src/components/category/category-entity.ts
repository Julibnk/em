import { isUIID } from '../../utils/validators';

export interface Category {
  // PK
  accountId: string;
  id: string;
  name: string;
  shortDescription?: string;
}

type UuidValidator = typeof isUIID;

interface BuildCategory {
  isUIID: UuidValidator;
}

export const buildMakeCategory =
  ({ isUIID }: BuildCategory) =>
  ({ accountId, id, name, shortDescription = '' }: Category): Category => {
    if (!accountId) {
      throw Error('Falta id de cuenta');
    }

    if (!isUIID(id)) {
      throw Error('Id de categoria invalido');
    }

    if (!isUIID(accountId)) {
      throw Error('Id de cuenta invalido');
    }

    if (!name) {
      throw Error('La categoria debe de tener un nombre');
    }

    const categoryEntity: Category = {
      accountId,
      id,
      name,
      shortDescription,
    };
    return categoryEntity;
  };

// return makeCategory;

const makeCategory = buildMakeCategory({ isUIID });

export default makeCategory;
