import type {
  NamedEntity,
} from "@mediverse/types";

export interface Program
  extends NamedEntity {

  code: string;

  description?: string;

  icon?: string;

  color?: string;

  isActive: boolean;
}