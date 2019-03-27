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
@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;

  treeNodes: NzTreeNodeOptions[] = [];

  checkedKey: string;
  selectedKey: string;
  currentKey: string;

  constructor(
    private message: NzMessageService,
    private nodeService: NodeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initRootNode();
  }

  ngAfterViewInit(): void {
    // 使用 ViewChild 时，Tree 方法需要在 ngAfterViewInit 中调用
  }

  initRootNode(): void {
    let id = this.activeRoute.snapshot.queryParams.nodeId;
    if (id) {
      this.nodeService.queryItemById(id).subscribe(
        resp => {
          let node = resp.data;
          if (node) {
            this.treeNodes = [this.getTreeNode(node, { expanded: true })];
          } else {
            this.message.error('当前节点非法，请回列表重新选择');
          }
        },
        err => {
          this.message.error(err.message);
        }
      );
    } else {
      this.createRootNode();
    }
  }

  private getTreeNode(
    node: Node,
    options?: { expanded: boolean; title?: string }
  ): NzTreeNodeOptions {
    return {
      title: options.title || node.name || node.id,
      key: node.id,
      expanded: options.expanded
    };
  }

  private createRootNode(): void {
    this.nodeService.createItem({}).subscribe(
      resp => {
        let node = resp.data;
        this.treeNodes = [this.getTreeNode(node, { expanded: true })];
      },
      err => {
        this.message.error(err);
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
  private _checkStatus(isChecked: boolean, key: string) {
    if (isChecked) {
      this.currentKey = key;
    } else {
      this.currentKey = null;
    }
  }

  createNode(parentNode: NzTreeNode): void {
    if (!parentNode) {
      this.message.error('请选择父节点');
    } else {
      this.nodeService.createItem({}).subscribe(
        resp => {},
        err => {
          this.message.error(err);
        }
      );
    }
  }

  addChildNode(): void {
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
          let childNode = this.getTreeNode(resp.data, {
            title: `${parentNode.level + 1}-${String(index * 10)}`,
            expanded: true
          });
          parentNode.addChildren([childNode]);
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
