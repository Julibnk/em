import {
  RestClient,
  isResponseWithMessage,
} from '../Shared/RestClient/RestClient';
import { FetchRestClient } from '../Shared/RestClient/FetchRestClient';
import { Contact } from './Contact';
import { ContactRepository } from './ContactRepository';

export class RestContactRepository implements ContactRepository {
  constructor(private client: RestClient) {}

  async save(contact: Contact): Promise<void> {
    const response = await this.client.put<Contact>(
      `contact/${contact.id}`,
      contact
    );

    if (!response.ok) {
      const body: unknown = await response.json();

      if (isResponseWithMessage(body)) {
        throw new Error(body.message);
      }

      throw new Error('El contacto no se ha podido guardar');
    }
  }

  async searchAll(): Promise<Contact[]> {
    const response = await this.client.get('contact');
    const contacts: Contact[] = await response.json();
    return contacts;
  }

  async searchById(): Promise<Contact> {
    throw new Error('Method not implemented.');
  }

  static create(): RestContactRepository {
    return new RestContactRepository(new FetchRestClient());
  }
}
