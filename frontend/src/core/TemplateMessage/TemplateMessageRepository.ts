import { Nullable } from '../Shared/Nullable';
import { TemplateMessage } from './TemplateMessage';

export interface TemplateMessageRepository {
  save(templateMessage: TemplateMessage): Promise<void>;

  searchById(id: string): Promise<Nullable<TemplateMessage>>;
}
