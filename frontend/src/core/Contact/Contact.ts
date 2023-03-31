import { Phone } from '../Shared/Phone';
import { Properties } from '../Shared/Primitives';

export class Contact {
  private constructor(
    readonly id: string,
    public name: string,
    public lastName: string,
    public phone: Phone
  ) {}

  static create(id: string, name: string, lastName: string, phone: Phone) {
    return new Contact(id, name, lastName, phone);
  }

  static createEmpty(id: string) {
    return new Contact(id, '', '', Phone.createEmpty());
  }

  static fromPrimitives(plainData: Properties<Contact>): Contact {
    return new Contact(
      plainData.id,
      plainData.name,
      plainData.lastName,
      Phone.fromPrimitives(plainData.phone)
    );
  }
}
