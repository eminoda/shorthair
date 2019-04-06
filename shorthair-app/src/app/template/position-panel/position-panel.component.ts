import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-position-panel',
  templateUrl: './position-panel.component.html',
  styleUrls: ['./position-panel.component.scss']
})
export class PositionPanelComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private message: NzMessageService) {}

  ngOnInit() {
    this.form = this.fb.group({
      width: [null, [Validators.required]],
      height: [null, [Validators.required]]
    });
  }

  submitForm() {}
}
