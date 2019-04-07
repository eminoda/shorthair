import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../template.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Template } from 'src/app/interface/template';
import { PageService } from 'src/app/page/page.service';
import { Observable } from 'rxjs';
import { StyleTable as IStyleTable } from 'src/app/interface/style-table';

@Component({
  selector: 'app-template-draw',
  templateUrl: './template-draw.component.html',
  styleUrls: ['./template-draw.component.scss']
})
export class TemplateDrawComponent implements OnInit {
  pageId: string;
  templateId: string;
  node: any;
  template: Template = {};
  currentNode: any;
  tabs = [
    {
      id: 1,
      title: 'tree'
    },
    {
      id: 2,
      title: '定位'
    },
    {
      id: 3,
      title: '外观'
    },
    {
      id: 4,
      title: '事件'
    }
  ];
  constructor(private activeRoute: ActivatedRoute, private message: NzMessageService, private templateService: TemplateService, private pageService: PageService) {}

  ngOnInit() {
    this.pageId = this.activeRoute.snapshot.queryParams.pageId;
    this.templateId = this.activeRoute.snapshot.queryParams.templateId;
    // 判断是否已有模板，显示草稿
    if (this.templateId) {
      this.queryTemplate();
    }
  }

  queryTemplate() {
    this.templateService.queryItemById(this.templateId).subscribe(
      resp => {
        this.template = resp.data;
        this.template.node = JSON.parse(this.template.node);
        this.currentNode = this.template.node[0].children[0];
        // console.log(this.currentNode);
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  saveTemplate() {
    // console.log(this.currentNode);
    return;
    this.template = {
      name: 'test',
      node: 123,
      type: 1
    };
    // 新模板创建
    if (!this.templateId) {
      this.templateService.createItem(this.template).subscribe(
        resp => {
          this.templateId = resp.data.id;
          if (this.pageId) {
            this.updatePage();
          }
        },
        err => {
          this.message.error(err.message);
        }
      );
    } else {
      // 更新已有模板
      this.templateService.updateItem(this.templateId, this.template).subscribe(
        resp => {
          this.message.info(resp.resultMsg);
        },
        err => {
          this.message.error(err.message);
        }
      );
    }
  }

  updatePage() {
    this.pageService.updateItem(this.pageId, { templateId: this.templateId }).subscribe(
      resp => {
        this.message.info(resp.resultMsg);
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  updateNode($event: Observable<IStyleTable>) {
    console.log($event);
  }
}
