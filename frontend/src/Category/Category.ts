export interface Category {
  id: string;
  name: string;
  description: string;
  templateIds: string[];
}
export interface CategoryRepository {
  searchAll(): Promise<Category[]>;
}
