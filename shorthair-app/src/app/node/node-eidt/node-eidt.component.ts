import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { NodeService } from '../node.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Node } from '../../interface/node';
@Component({
  selector: 'app-node-eidt',
  templateUrl: './node-eidt.component.html',
  styleUrls: ['./node-eidt.component.scss']
})
export class NodeEidtComponent implements OnInit {
  @Input() id: string;
  form: FormGroup;
  node: Node;
  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private nodeService: NodeService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      nodeType: [null, [Validators.required]],
      tag: [null],
      text: [null],
      attributes: [null]
    });
    this.queryItem();
  }

  queryItem() {
    this.nodeService.queryItemById(this.id).subscribe(
      resp => {
        this.node = resp.data;
        for (let key in this.node) {
          let formItem = this.form.get(key);
          if (formItem) {
            formItem.setValue(this.node[key]);
          }
        }
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  submitForm() {
    if (!this.form.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.nodeService.updateItem(this.id, this.form.value).subscribe(
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
