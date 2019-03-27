import { Component, OnInit } from '@angular/core';
import { StyleModalComponent } from '../style-modal/style-modal.component';
import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-attribute-item',
  templateUrl: './attribute-item.component.html',
  styleUrls: ['./attribute-item.component.scss']
})
export class AttributeItemComponent implements OnInit {
  attributes = ['className', 'placeholder', 'src'];
  attribute: {
    name: string;
    value: any;
  } = {
    name: null,
    value: null
  };
  constructor() {}

  ngOnInit() {}
}
