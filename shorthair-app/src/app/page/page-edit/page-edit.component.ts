import { Component, OnInit } from '@angular/core';
import { Page } from '../../interface/page';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PageService } from '../page.service';
@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  id: string;
  page: Page;
  validateForm: FormGroup;

  constructor(
    private pageService: PageService,
    private message: NzMessageService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      path: [null, [Validators.required]],
      device: [null, [Validators.required]],
      deleted: [null, [Validators.required]]
    });
    this.queryItem();
  }

  queryItem() {
    this.pageService.queryItemById(this.id).subscribe(
      resp => {
        this.page = resp.data;
        for (let key in this.page) {
          let formItem = this.validateForm.get(key);
          if (formItem) {
            formItem.setValue(this.page[key]);
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
      this.pageService.updateItem(this.id, this.validateForm.value).subscribe(
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
