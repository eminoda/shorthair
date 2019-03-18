import { Menu } from './menu';

export interface Menus {
  name: string;
  url?: string;
  subMenus: Array<Menu>;
}
