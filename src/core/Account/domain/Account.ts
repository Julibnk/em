import { AggregateRoot } from '../../Shared/domain/AggregateRoot';
import { AccountId } from './value-object/AccountId';
import { CompanyName } from './value-object/CompanyName';
import { Vat } from './value-object/Vat';
import { Street } from './value-object/Street';
import { AddressNumber } from './value-object/AddressNumber';
import { PostalCode } from './value-object/PostalCode';
import { Region } from './value-object/Region';
import { Country } from './value-object/Country';
import { PhoneId } from '../../Shared/domain/Phone/value-object/PhoneId';
import { Primitives } from '../../Shared/domain/Primitives';
import { UserId } from '../../User/domain/value-object/UserId';
import { ContactId } from '../../Contact/domain/value-object/ContactId';
import { TemplateId } from '../../Template/domain/value-object/TemplateId';
import { CategoryId } from '../../Category/domain/value-object/CategoryId';

export class Account extends AggregateRoot {
  constructor(
    readonly id: AccountId,
    readonly companyName: CompanyName,
    readonly vat: Vat,
    readonly street: Street,
    readonly addressNumber: AddressNumber,
    readonly postalCode: PostalCode,
    readonly region: Region,
    readonly country: Country, // readonly phoneId: PhoneId
    readonly userIds: Array<UserId>,
    readonly accountPhoneIds: Array<PhoneId>,
    readonly contactIds: Array<ContactId>,
    readonly templateIds: Array<TemplateId>,
    readonly categoryIds: Array<CategoryId>
  ) {
    super();
  }

  static fromPrimitives(plainData: Primitives<Account>): Account {
    return new Account(
      new AccountId(plainData.id),
      new CompanyName(plainData.companyName),
      new Vat(plainData.vat),
      new Street(plainData.street),
      new AddressNumber(plainData.addressNumber),
      new PostalCode(plainData.postalCode),
      new Region(plainData.region),
      new Country(plainData.country),
      plainData.userIds.map((userId) => new UserId(userId)),
      plainData.accountPhoneIds.map((phoneId) => new PhoneId(phoneId)),
      plainData.contactIds.map((contactId) => new ContactId(contactId)),
      plainData.templateIds.map((templateId) => new TemplateId(templateId)),
      plainData.categoryIds.map((categoryId) => new CategoryId(categoryId))
    );
  }

  toPrimitives(): Primitives<Account> {
    return {
      id: this.id.value,
      companyName: this.companyName.value,
      vat: this.vat.value,
      street: this.street.value,
      addressNumber: this.addressNumber.value,
      postalCode: this.postalCode.value,
      region: this.region.value,
      country: this.country.value,
      userIds: this.userIds.map((userId) => userId.value),
      accountPhoneIds: this.accountPhoneIds.map((phoneId) => phoneId.value),
      contactIds: this.contactIds.map((contactId) => contactId.value),
      templateIds: this.templateIds.map((templateId) => templateId.value),
      categoryIds: this.categoryIds.map((categoryId) => categoryId.value),
    };
  }
}
