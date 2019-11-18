import { Menu } from './sidepanel-menu.model';
export class OrgConfig {
    constructor(public panelId: string,  public menuList: Menu[]) { };
}