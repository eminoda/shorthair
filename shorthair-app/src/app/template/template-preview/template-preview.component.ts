import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-template-preview',
  templateUrl: './template-preview.component.html',
  styleUrls: ['./template-preview.component.scss']
})
export class TemplatePreviewComponent implements OnInit, OnChanges {
  @Input() treeNode: any = { styleTable: {} };
  constructor() {}

  ngOnInit() {
    this.treeNode = JSON.stringify(this.treeNode);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.treeNode = JSON.stringify(this.treeNode);
  }
}
