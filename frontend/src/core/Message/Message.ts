export type MessageStatus = 'DRAFT' | 'SENT' | 'SCHEDULED' | 'ERROR';

export type Message = {
  id: string;
  status: MessageStatus;
  sentDate?: Date;
  destinationPrefix: string;
  destinationPhone: string;
  variable1: string;
  variable2: string;
  variable3: string;
  templateId: string;
  phoneId: string;
  categoryId?: string;
  scheduled?: boolean;
  scheduleDate?: Date;
};
