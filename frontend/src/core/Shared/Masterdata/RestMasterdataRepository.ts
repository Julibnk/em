import { FetchRestClient } from '../RestClient/FetchRestClient';
import { RestClient } from '../RestClient/RestClient';
import { MasterdataRepository } from './MasterdataRepository';

export class RestMasterdataRepository implements MasterdataRepository {
  constructor(private client: RestClient) {}
  dummy = () => {
    console.log('dummy');
  };

  static create = () => {
    return new RestMasterdataRepository(new FetchRestClient());
  };
}
