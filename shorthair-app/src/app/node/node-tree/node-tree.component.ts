import { Component, OnInit, ViewChild } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions, NzTreeComponent, NzTreeNode } from 'ng-zorro-antd';

@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;
  defaultCheckedKeys = ['10020'];
  defaultSelectedKeys = ['10010'];
  defaultExpandedKeys = ['100', '1001'];

  nodes: NzTreeNodeOptions[] = [
    {
      title: 'parent 1',
      key: '100',
      children: [
        {
          title: 'parent 1-0',
          key: '1001',
          disabled: true,
          children: [
            { title: 'leaf 1-0-0', key: '10010', disableCheckbox: true, isLeaf: true },
            { title: 'leaf 1-0-1', key: '10011', isLeaf: true }
          ]
        },
        {
          title: 'parent 1-1',
          key: '1002',
          children: [
            { title: 'leaf 1-1-0', key: '10020', isLeaf: true },
            { title: 'leaf 1-1-1', key: '10021', isLeaf: true }
          ]
        }
      ]
    }
  ];

  nzClick(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  nzCheck(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  // nzSelectedKeys change
  nzSelect(keys: string[]): void {
    console.log(keys, this.treeCom.getSelectedNodeList());
  }

  constructor() {}

  ngOnInit(): void {
    setTimeout(() => {
      console.log(this.treeCom.getTreeNodeByKey('10011'), 'get nzTreeNode with key');
      console.log(
        this.treeCom.getTreeNodes(),
        this.treeCom.getCheckedNodeList(),
        this.treeCom.getSelectedNodeList(),
        this.treeCom.getExpandedNodeList()
      );
    }, 1500);
  }

  addNode(): void {
    console.log(
      this.treeCom.getTreeNodeByKey('100').addChildren([
        {
          title: 'parent 3',
          key: '200',
          children: [
            { title: 'leaf 2-2-0', key: '20010', isLeaf: true },
            { title: 'leaf 2-2-1', key: '20011', isLeaf: true }
          ]
        }
      ])
    );
    console.log(this.nodes);
  }
}
