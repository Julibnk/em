import { Contact } from '../Contact/Contact';
import { Nullable } from '../Shared/Nullable';

export enum TemplateMessageStatus {
  DRAFT = 'DRAFT',
  SENT = 'SENT',
  PENDING = 'PENDING',
  SCHEDULED = 'SCHEDULED',
  ERROR = 'ERROR',
}

export interface TemplateMessage {
  id: string;
  status: Nullable<TemplateMessageStatus>;
  templateId: string;
  accountPhoneId: string;
  contact: Contact;
  parameter1: string;
  parameter2: string;
  parameter3: string;
  isScheduled: boolean;
  scheduleDate: Nullable<Date>;
  sentDate: Nullable<Date>;
}
