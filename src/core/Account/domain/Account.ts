import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AccountId } from './AccountId';
import { CompanyName } from './CompanyName';
import { Vat } from './Vat';
import { Street } from './Street';
import { AddressNumber } from './AddressNumber';
import { PostalCode } from './PostalCode';
import { Region } from './Region';
import { Country } from './Country';
import { PhoneNumber } from '../../Shared/domain/value-object/PhoneNumber';
import { DateValueObject } from '../../Shared/domain/value-object/DateValueObject';
import { UserValueObject } from '../../Shared/domain/value-object/UserValueObject';
import { BoolValueObject } from '../../Shared/domain/value-object/BoolValueObject';

export class Account extends AggregateRoot {
  constructor(
    readonly id: AccountId,
    readonly companyName: CompanyName,
    readonly vat: Vat,
    readonly street: Street,
    readonly addressNumber: AddressNumber,
    readonly postalCode: PostalCode,
    readonly region: Region,
    readonly country: Country,
    readonly phoneNumber: PhoneNumber,
    readonly createdAt: DateValueObject,
    readonly createUsername: UserValueObject,
    readonly updatedAt: DateValueObject,
    readonly updateUsername: UserValueObject,
    readonly disabled: BoolValueObject
  ) {
    super();
  }

  toPrimitives() {
    throw new Error('Method not implemented.');
  }
}

// id String @id @default(uuid()) @db.Uuid

// companyName    String
// vat            String
// street         String
// addressNumber  Int
// postalCode     Int
// region         String   @db.VarChar(2)
// country        String   @db.VarChar(2)
// phoneNumber    String?
// createdAt      DateTime @default(now())
// createUsername String
// updatedAt      DateTime @default(now())
// updateUsername String
// disabled       Boolean  @default(false)
