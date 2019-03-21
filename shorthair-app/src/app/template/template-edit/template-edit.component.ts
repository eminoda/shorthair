import { Component, OnInit } from '@angular/core';
import { Template } from '../../interface/template';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NodeService } from '../../node/node.service';
import { TemplateService } from '../template.service';
@Component({
  selector: 'app-template-edit',
  templateUrl: './template-edit.component.html',
  styleUrls: ['./template-edit.component.scss']
})
export class TemplateEditComponent implements OnInit {
  id: string;
  template: Template;
  validateForm: FormGroup;
  nodes: Array<Node>;
  constructor(
    private nodeService: NodeService,
    private templateService: TemplateService,
    private message: NzMessageService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nodeId: [null, [Validators.required]],
      deleted: [null, [Validators.required]]
    });
    this.queryItem();
    this.queryNodeList();
  }
  queryNodeList() {
    this.nodeService
      .queryList({
        page: 1,
        pageSize: 100
      })
      .subscribe(
        resp => {
          this.nodes = resp.data.list;
        },
        err => {
          this.message.info(err.message);
        }
      );
  }
  queryItem() {
    this.templateService.queryItemById(this.id).subscribe(
      resp => {
        this.template = resp.data;
        for (let key in this.template) {
          let formItem = this.validateForm.get(key);
          if (formItem) {
            formItem.setValue(this.template[key]);
          }
        }
      },
      err => {
        this.message.error(err.message);
      }
    );
  }
  submitForm() {
    if (!this.validateForm.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.templateService.updateItem(this.id, this.validateForm.value).subscribe(
        resp => {
          this.message.info(resp.resultMsg);
          this.queryItem();
        },
        err => {
          this.message.info(err.message);
        }
      );
    }
  }
}
