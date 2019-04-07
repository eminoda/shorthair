import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomainService } from '../domain.service';

@Component({
  selector: 'app-domain-create-modal',
  templateUrl: './domain-create-modal.component.html',
  styleUrls: ['./domain-create-modal.component.scss']
})
export class DomainCreateModalComponent implements OnInit {
  form: FormGroup;

  constructor(private nodeService: DomainService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      remark: [null]
    });
  }

  saveDomain() {
    if (!this.form.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.nodeService.createItem(this.form.value).subscribe(
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
