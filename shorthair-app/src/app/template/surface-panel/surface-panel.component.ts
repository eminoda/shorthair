import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-surface-panel',
  templateUrl: './surface-panel.component.html',
  styleUrls: ['./surface-panel.component.scss']
})
export class SurfacePanelComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      'font-size': [null],
      'font-weight': [null],
      color: [null],
      'background-color': [null],
      'border-color': [null],
      'border-width': [null],
      'border-style': [null]
    });
  }

  submitForm() {}
}
