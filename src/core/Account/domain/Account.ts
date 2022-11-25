import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AccountId } from './value-object/AccountId';
import { CompanyName } from './value-object/CompanyName';
import { Vat } from './value-object/Vat';
import { Primitives } from '../../Shared/domain/Primitives';
import { Disabled } from '../../Shared/domain/value-object/Disabled';
import { MetaAccount, MetaAccountPrimitives } from './MetaAccount/MetaAccount';
import { Address } from '../../Shared/domain/Address/Address';

export type AccountPrimitives = Primitives<Account> & {
  metaAccount: MetaAccountPrimitives;
};

export class Account extends AggregateRoot {
  constructor(
    readonly id: AccountId,
    private _companyName: CompanyName,
    readonly vat: Vat,
    readonly disabled: Disabled,
    private _address: Address,
    private _metaAccount: MetaAccount
  ) {
    super();
  }

  get companyName(): CompanyName {
    return this._companyName;
  }

  get address(): Address {
    return this._address;
  }

  get metaAccount(): MetaAccount {
    return this._metaAccount;
  }

  change(companyName: CompanyName, address: Address) {
    this._companyName = companyName;
    this._address = address;
  }

  static create(
    id: AccountId,
    companyName: CompanyName,
    vat: Vat,
    disabled: Disabled,
    address: Address,
    metaAccount: MetaAccount
  ): Account {
    return new Account(id, companyName, vat, disabled, address, metaAccount);
  }

  static fromPrimitives(plainData: AccountPrimitives): Account {
    return new Account(
      new AccountId(plainData.id),
      new CompanyName(plainData.companyName),
      new Vat(plainData.vat),
      new Disabled(plainData.disabled),
      Address.fromPrimitives(plainData.address),
      MetaAccount.fromPrimitives(plainData.metaAccount)
    );
  }

  toPrimitives(): AccountPrimitives {
    return {
      id: this.id.value,
      companyName: this._companyName.value,
      vat: this.vat.value,
      disabled: this.disabled.value,
      address: this._address.toPrimitives(),
      metaAccount: this._metaAccount.toPrimitives(),
    };
  }
}
