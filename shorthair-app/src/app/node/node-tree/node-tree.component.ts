import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  NzFormatEmitEvent,
  NzTreeNodeOptions,
  NzTreeComponent,
  NzModalService,
  NzMessageService,
  NzTreeNode
} from 'ng-zorro-antd';
import { NodeService } from '../node.service';
import { ActivatedRoute } from '@angular/router';

import { Node } from '../../interface/node';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;

  form: FormGroup;
  treeNodes: NzTreeNodeOptions[] = [];
  rootNode: Node;

  checkedKey: string;
  selectedKey: string;
  currentKey: string;

  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private nodeService: NodeService,
    private activeRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [null, [Validators.required]]
    });
  }
  ngAfterViewInit(): void {
    this.initRootNode();
  }

  initRootNode(): void {
    let id = this.activeRoute.snapshot.params.id;
    this.nodeService.queryItemById(id).subscribe(
      resp => {
        this.rootNode = resp.data;
        this.treeNodes = [
          {
            title: this.rootNode.name || this.rootNode.id,
            key: this.rootNode.id,
            expanded: true
          }
        ];
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  chooseNode(event: NzFormatEmitEvent): void {
    if (event.eventName === 'check') {
      this._checkStatus(event.node.isChecked, event.node.key);
    } else if (event.eventName === 'click') {
      event.node.isChecked = !event.node.isChecked;
      this._checkStatus(event.node.isChecked, event.node.key);
    }
    // if (this.currentKey) {
    //   this.clearTreeNodeChecked(this.treeCom.getTreeNodeByKey(this.currentKey).getChildren());
    // }
  }
  _checkStatus(isChecked: boolean, key: string) {
    if (isChecked) {
      this.currentKey = key;
    } else {
      this.currentKey = null;
    }
  }
  addNode(): void {
    if (!this.currentKey) {
      this.message.error('请选择节点');
    } else {
      let parentNode = this.treeCom.getTreeNodeByKey(this.currentKey);
      let index =
        parentNode.children && parentNode.children.length
          ? parentNode.children.length + 1
          : 1;
      this.nodeService.createItem({ parentId: this.currentKey }).subscribe(
        resp => {
          parentNode.addChildren([
            {
              title: `${parentNode.level + 1}-${String(index * 10)}`,
              key: resp.data.id,
              expanded: true
            }
          ]);
        },
        err => {
          this.message.error(err);
        }
      );
    }
  }

  deleteNode(): void {
    if (!this.currentKey) {
      this.message.error('请选择节点');
    } else {
      let currentNode = this.treeCom.getTreeNodeByKey(this.currentKey);
      if (currentNode.level === 0) {
        this.message.error('禁止删除根节点');
      } else {
        currentNode.remove();
        this.currentKey = null;
        this.clearTreeNodeChecked(this.treeCom.getTreeNodes());
      }
    }
  }

  clearTreeNodeChecked(treeNodes): void {
    for (let node of treeNodes) {
      node.isChecked = false;
      if (node.children && node.children.length > 0) {
        this.clearTreeNodeChecked(node.children);
      }
    }
  }
  showCreateNodeModal(): void {
    // const modal = this.modalService.create({
    //   nzTitle: '添加子节点',
    //   nzContent: NodeModalNodeCreateComponent,
    //   nzComponentParams: {
    //     parentNode: parentNode
    //   },
    //   nzFooter: null
    // });
    // modal.afterClose.subscribe((childNode: any) => {
    //   if (childNode) {
    //     parentNode.addChildren([childNode]);
    //   }
    // });
  }
}
