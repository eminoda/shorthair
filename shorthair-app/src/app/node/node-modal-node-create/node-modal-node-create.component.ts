import { Component, OnInit, Input } from '@angular/core';
import { NzModalRef, NzMessageService, NzTreeNode } from 'ng-zorro-antd';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-node-modal-node-create',
  templateUrl: './node-modal-node-create.component.html',
  styleUrls: ['./node-modal-node-create.component.scss']
})
export class NodeModalNodeCreateComponent implements OnInit {
  @Input() parentNode: NzTreeNode;
  form: FormGroup;
  constructor(
    private modal: NzModalRef,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      title: [null, [Validators.required]],
      key: [null],
      isLeaf: [false],
      expanded: [true]
    });
  }

  submitForm() {
    if (!this.form.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.modal.close(this.form.value);
    }
  }
}
