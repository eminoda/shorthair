import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { TemplateService } from '../template.service';
import { StyleTable as IStyleTable } from 'src/app/interface/style-table';

@Component({
  selector: 'app-surface-panel',
  templateUrl: './surface-panel.component.html',
  styleUrls: ['./surface-panel.component.scss']
})
export class SurfacePanelComponent implements OnInit, OnChanges {
  @Input() node: any = {};
  @Output() updateNodeEvent = new EventEmitter<IStyleTable>();
  // form: FormGroup;

  constructor(private message: NzMessageService, private templateService: TemplateService) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    // this.node && this.updateNodeEvent.emit(this.node.styleTable);
  }

  update($event, key) {
    this.node.styleTable[key] = $event.target.value;
    this.node && this.updateNodeEvent.emit(this.node.styleTable);
  }
}
