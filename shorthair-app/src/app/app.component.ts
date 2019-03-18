import { Component } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Menu } from './interface/menu';
import { Menus } from './interface/menus';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shorthair-app';
  activeUrl: any;
  menus: Array<Menus> = [
    {
      name: '站点',
      subMenus: [
        {
          name: '域名设置',
          url: '/website/list'
        },
        {
          name: '站点解析',
          url: '/website/mapper'
        }
      ]
    },
    {
      name: '页面',
      subMenus: [
        {
          name: '页面管理',
          url: '/page/list'
        }
      ]
    },
    {
      name: '模板',
      subMenus: [
        {
          name: '模板管理',
          url: '/template/list'
        }
      ]
    }
  ];

  constructor(router: Router) {
    router.events.subscribe(
      (data: RouterEvent) => {
        if (data.url) {
          this.activeUrl = data.url;
        }
      },
      err => {}
    );
  }
}
