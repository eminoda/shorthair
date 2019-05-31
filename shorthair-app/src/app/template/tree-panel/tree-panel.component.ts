import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { StyleTable } from 'src/app/interface/style-table';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.scss']
})
export class TreePanelComponent implements OnInit, OnChanges {
  @Input() treeNode: any;
  @Output() updateNodeEvent = new EventEmitter<StyleTable>();
  @ViewChild('nzTreeComponent') nzTreeComponent: NzTreeComponent;
  nodes: NzTreeNodeOptions[] = [
    {
      title: 'root',
      key: '001',
      children: []
    }
  ];
  constructor() {}

  ngOnInit() {
    // console.log(this.node);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.treeNode) {
      let parentNode = this.nzTreeComponent.getTreeNodeByKey('001');
      this.appendNode(this.treeNode, parentNode);
    }
  }

  private appendNode(nodes, parentNode: NzTreeNode) {
    if (nodes && nodes.length > 0) {
      let childrenNode = [];

      let key = String(Math.round(Math.random() * 1000));
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        node.id = key;
        let title = key + ':' + node.tag + ':' + node.className;
        let currentNode = node;
        childrenNode.push({
          title,
          key,
          currentNode
        });
      }
      parentNode.addChildren(childrenNode);
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        this.appendNode(node.children, this.nzTreeComponent.getTreeNodeByKey(childrenNode[i].key));
      }
    }
  }

  nzClick(event: NzFormatEmitEvent): void {
    this.updateNodeEvent.emit(event.node.origin.currentNode);
  }
}
