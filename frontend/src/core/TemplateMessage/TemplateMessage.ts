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
  contactId: string;
  parameter1: string;
  parameter2: string;
  parameter3: string;
  scheduleDate: Nullable<Date>;
  sentDate: Nullable<Date>;
}
