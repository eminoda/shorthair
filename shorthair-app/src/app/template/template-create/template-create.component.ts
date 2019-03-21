import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { HttpService } from '../../shared/http.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NodeService } from '../../node/node.service';
import { TemplateService } from '../template.service';

@Component({
  selector: 'app-template-create',
  templateUrl: './template-create.component.html',
  styleUrls: ['./template-create.component.scss']
})
export class TemplateCreateComponent implements OnInit {
  validateForm: FormGroup;
  nodes: Array<Node>;
  constructor(
    private templateService: TemplateService,
    private nodeService: NodeService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      nodeId: [null]
    });
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
  submitForm() {
    if (!this.validateForm.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.templateService.createItem(this.validateForm.value).subscribe(
        resp => {
          this.message.info(resp.resultMsg);
        },
        err => {
          this.message.info(err.message);
        }
      );
    }
  }
}
