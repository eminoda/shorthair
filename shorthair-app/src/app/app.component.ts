import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Menu } from './interface/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shorthair-app';
  activeUrl: string;
  activeId: number;
  menus: Array<Menu> = [
    {
      id: 10,
      name: '站点',
      icon: 'cloud',
      subMenus: [
        {
          id: 11,
          name: '域名设置',
          url: '/website/list'
        },
        {
          id: 12,
          name: '站点解析',
          url: '/website/mapper'
        }
      ]
    },
    {
      id: 20,
      name: '页面',
      icon: 'profile',
      subMenus: [
        {
          id: 21,
          name: '页面管理',
          url: '/page/list'
        },
        {
          id: 22,
          name: '模板管理',
          url: '/template/list'
        }
      ]
    }
  ];

  constructor(router: Router) {
    // https://angular.io/api/router/Event
    router.events.subscribe(
      (data: NavigationEnd) => {
        if (data.url && data instanceof NavigationEnd) {
          this.activeUrl = data.url;
          for (let menu of this.menus) {
            const menuId = menu.id;
            for (let submenu of menu.subMenus) {
              if (this.activeUrl === submenu.url) {
                const subId = submenu.id;
                if (Math.round(subId / 10) === menuId / 10) {
                  this.activeId = menuId;
                }
              }
            }
          }
        }
      },
      err => {}
    );
  }
}
