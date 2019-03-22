import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {
  NzFormatEmitEvent,
  NzTreeNodeOptions,
  NzTreeComponent,
  NzModalService,
  NzMessageService,
  NzTreeNode
} from 'ng-zorro-antd';
import { NodeModalNodeCreateComponent } from '../node-modal-node-create/node-modal-node-create.component';
import { NodeService } from '../node.service';
import { ActivatedRoute } from '@angular/router';

import { Node } from '../../interface/node';
import { TreeNode } from '@angular/router/src/utils/tree';
@Component({
  selector: 'app-node-tree',
  templateUrl: './node-tree.component.html',
  styleUrls: ['./node-tree.component.scss']
})
export class NodeTreeComponent implements OnInit, AfterViewInit {
  @ViewChild('treeCom') treeCom: NzTreeComponent;

  nodes: NzTreeNodeOptions[] = [];
  rootNode: Node;
  currentKey: string;
  constructor(
    private message: NzMessageService,
    private modalService: NzModalService,
    private nodeService: NodeService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.initRootNode();
  }

  initRootNode(): void {
    let id = this.activeRoute.snapshot.params.id;
    this.nodeService.queryItemById(id).subscribe(
      resp => {
        this.rootNode = resp.data;
        this.nodes = [
          {
            title: this.rootNode.name || this.rootNode.id,
            key: '010',
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
    this.currentKey = event.node.key;
  }

  addChildNode(): void {
    if (!this.currentKey) {
      this.message.error('请选择子节点');
    } else {
      let parentNode = this.treeCom.getTreeNodeByKey(this.currentKey);
      let index =
        parentNode.children && parentNode.children.length ? parentNode.children.length + 1 : 1;
      parentNode.addChildren([
        {
          title: `${parentNode.level + 1}-${String(index * 10)}`,
          key: `${parentNode.level + 1}${String(index * 10)}`,
          expanded: true
        }
      ]);
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
