export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NamedEntity extends BaseEntity {
  name: string;
  slug: string;
}