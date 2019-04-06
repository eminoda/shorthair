import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TemplateService } from '../template.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Template } from 'src/app/interface/template';
import { PageService } from 'src/app/page/page.service';

@Component({
  selector: 'app-template-draw',
  templateUrl: './template-draw.component.html',
  styleUrls: ['./template-draw.component.scss']
})
export class TemplateDrawComponent implements OnInit {
  pageId: string;
  templateId: string;
  node: any;
  template: Template;
  tabs = [
    {
      id: 1,
      title: '定位'
    },
    {
      id: 2,
      title: '外观'
    },
    {
      id: 3,
      title: '事件'
    }
  ];
  constructor(private activeRoute: ActivatedRoute, private message: NzMessageService, private templateService: TemplateService, private pageService: PageService) {}

  ngOnInit() {
    this.pageId = this.activeRoute.snapshot.queryParams.pageId;
    this.templateId = this.activeRoute.snapshot.queryParams.templateId;
    // 显示草稿
    if (this.templateId) {
      this.queryTemplate();
    }
  }

  queryTemplate() {
    this.templateService.queryItemById(this.templateId).subscribe(
      data => {},
      err => {
        this.message.error(err.message);
      }
    );
  }

  saveTemplate() {
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
}
