import { Submenu } from './submenu';

export interface Menu {
  id: number;
  icon?: string;
  name: string;
  url?: string;
  subMenus?: Array<Submenu>;
}
