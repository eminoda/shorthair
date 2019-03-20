import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PageService } from '../page.service';

@Component({
  selector: 'app-page-create',
  templateUrl: './page-create.component.html',
  styleUrls: ['./page-create.component.scss']
})
export class PageCreateComponent implements OnInit {
  validateForm: FormGroup;
  constructor(
    private pageService: PageService,
    private message: NzMessageService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      path: [null, [Validators.required]],
      device: [null, [Validators.required]]
    });
  }
  submitForm() {
    if (!this.validateForm.valid) {
      this.message.error('输入有误，请检查');
    } else {
      this.pageService.createItem(this.validateForm.value).subscribe(
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
