import { Component, OnInit } from '@angular/core';
import { Page } from '../../interface/page';
import { NzMessageService } from 'ng-zorro-antd';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PageService } from '../page.service';
import { DomainService } from '../../domain/domain.service';
import { PageOption } from '../../interface/page-option';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.scss']
})
export class PageEditComponent implements OnInit {
  id: string;
  pageItem: Page;
  validateForm: FormGroup;
  pageOption: PageOption = {
    pageSize: 5,
    page: 1
  };
  domains = [];

  constructor(
    private pageService: PageService,
    private domainService: DomainService,
    private message: NzMessageService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.id = this.activeRoute.snapshot.params.id;
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      domain: [null, [Validators.required]],
      path: [null, [Validators.required]],
      templateId: [null, [Validators.required]],
      device: [null, [Validators.required]],
      deleted: [null, [Validators.required]]
    });
    this.init();
  }

  init() {
    this.domainService
      .queryList({
        page: 1,
        pageSize: 100
      })
      .pipe(
        mergeMap(resp => {
          this.domains = resp.data.list;
          return this.pageService.queryItemById(this.id);
        })
      )
      .subscribe(
        resp => {
          this.pageItem = resp.data;
          for (let key in this.pageItem) {
            let formItem = this.validateForm.get(key);
            if (formItem) {
              formItem.setValue(this.pageItem[key]);
            }
          }
        },
        err => {
          this.message.error(err.message);
        }
      );
  }

  queryItem() {
    this.pageService.queryItemById(this.id).subscribe(
      resp => {
        this.pageItem = resp.data;
        for (let key in this.pageItem) {
          let formItem = this.validateForm.get(key);
          if (formItem) {
            formItem.setValue(this.pageItem[key]);
          }
        }
      },
      err => {
        this.message.error(err.message);
      }
    );
  }
  submitForm() {
    console.log(this.validateForm);
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
