import { Template } from '../Template/Template';
export interface Category {
  id: string;
  name: string;
  description: string;
  templates: Template[];
}
