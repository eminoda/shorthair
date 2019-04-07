import { Component, OnInit, Input } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DomainService } from '../domain.service';
import { Domain } from '../../interface/domain';

@Component({
  selector: 'app-domain-edit-modal',
  templateUrl: './domain-edit-modal.component.html',
  styleUrls: ['./domain-edit-modal.component.scss']
})
export class DomainEditModalComponent implements OnInit {
  @Input() id: string;
  domain: Domain;
  form: FormGroup;

  constructor(private nodeService: DomainService, private message: NzMessageService, private fb: FormBuilder) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      remark: [null]
    });
    this.queryItem();
  }

  queryItem() {
    this.nodeService.queryItemById(this.id).subscribe(
      resp => {
        this.domain = resp.data;
        for (let key in this.domain) {
          let formItem = this.form.get(key);
          if (formItem) {
            formItem.setValue(this.domain[key]);
          }
        }
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  editDomain() {
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
