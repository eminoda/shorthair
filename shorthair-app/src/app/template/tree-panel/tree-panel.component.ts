import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { StyleTable } from 'src/app/interface/style-table';
import { NzTreeNodeOptions, NzFormatEmitEvent, NzTreeNode, NzTreeComponent } from 'ng-zorro-antd';
@Component({
  selector: 'app-tree-panel',
  templateUrl: './tree-panel.component.html',
  styleUrls: ['./tree-panel.component.scss']
})
export class TreePanelComponent implements OnInit, OnChanges {
  @Input() node: any;
  @Output() updateNodeEvent = new EventEmitter<StyleTable>();

  // nodes: NzTreeNodeOptions[] = [
  //   {
  //     title: 'parent 1',
  //     key: '100',
  //     children: [
  //       {
  //         title: 'parent 1-0',
  //         key: '1001',
  //         disabled: true,
  //         children: [{ title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true }, { title: 'leaf 1-0-1', key: '10011', isLeaf: true }]
  //       },
  //       {
  //         title: 'parent 1-1',
  //         key: '1002',
  //         children: [{ title: 'leaf 1-1-0', key: '10020', isLeaf: true }, { title: 'leaf 1-1-1', key: '10021', isLeaf: true }]
  //       }
  //     ]
  //   }
  // ];
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
    if (this.node) {
      let parentNode = this.nzTreeComponent.getTreeNodeByKey('001');
      this.appendNode(this.node, parentNode);
    }
  }

  private appendNode(nodes, parentNode: NzTreeNode) {
    if (nodes && nodes.length > 0) {
      let childrenNode = [];
      for (let node of nodes) {
        let key = String(Math.round(Math.random() * 1000));
        let title = key + ':' + node.tag + ':' + node.className;
        childrenNode.push({
          title,
          key
        });
      }
      parentNode.addChildren(childrenNode);
      for (let i = 0; i < nodes.length; i++) {
        let node = nodes[i];
        this.appendNode(node.children, this.nzTreeComponent.getTreeNodeByKey(childrenNode[i].key));
      }
    }
  }

  nzClick(event: NzFormatEmitEvent): void {}
  update($event, key) {
    this.node && this.updateNodeEvent.emit(this.node.styleTable);
  }
}
