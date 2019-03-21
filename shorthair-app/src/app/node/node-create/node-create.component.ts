import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-node-create',
  templateUrl: './node-create.component.html',
  styleUrls: ['./node-create.component.scss']
})
export class NodeCreateComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private nodeService: NodeService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]]
    });
  }
  submitForm() {
    if (!this.validateForm.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.nodeService.createItem(this.validateForm.value).subscribe(
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
