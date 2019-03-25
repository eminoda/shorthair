import {
  Component,
  OnInit,
  Input,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  ComponentRef
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { NodeService } from '../node.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Node } from '../../interface/node';
import { AttributeItemComponent } from '../attribute-item/attribute-item.component';
import { AttributeDirective } from '../../shared/directive/attribute.directive';
@Component({
  selector: 'app-node-eidt',
  templateUrl: './node-eidt.component.html',
  styleUrls: ['./node-eidt.component.scss']
})
export class NodeEidtComponent implements OnInit {
  @Input() id: string;
  @ViewChild(AttributeDirective) attributeHost: AttributeDirective;
  form: FormGroup;
  node: Node;
  attributes = [];
  tempAttributes = [];
  attributeTemplates: Array<ViewContainerRef> = [];

  constructor(
    private fb: FormBuilder,
    private message: NzMessageService,
    private nodeService: NodeService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      nodeType: [null, [Validators.required]],
      tag: [null],
      text: [null],
      attributes: [null]
    });
    this.queryItem(this.id);
  }

  queryItem(id: string) {
    this.nodeService.queryItemById(id).subscribe(
      resp => {
        this.node = resp.data;
        for (let key in this.node) {
          let formItem = this.form.get(key);
          if (formItem) {
            if (key == 'attributes') {
              this.parseAttributeToForm(this.node[key]);
            } else {
              formItem.setValue(this.node[key]);
            }
          }
        }
      },
      err => {
        this.message.error(err.message);
      }
    );
  }

  private parseAttributeToForm(attributes: []): void {
    for (let attribute of attributes) {
      let attributeJSON = JSON.parse(attribute);
      if (attributeJSON) {
        this.attributes.push(attributeJSON);
        this.form.addControl(attributeJSON.name, new FormControl(attributeJSON.value));
      }
    }
  }

  submitForm() {
    if (!this.form.valid) {
      this.message.error('输入有误，请检查');
    } else {
      // TODO: 新老属性去重、或者提示
      let attribute = [].concat(this.attributes).concat(this.tempAttributes);
      this.form.get('attributes').setValue(attribute);
      this.nodeService.updateItem(this.id, this.form.value).subscribe(
        resp => {
          this.message.info(resp.resultMsg);
          this.removeTemplates();
          this.queryItem(this.node.id);
        },
        err => {
          this.message.info(err.message);
        }
      );
    }
  }

  private removeTemplates(): void {
    for (let componentRef of this.attributeTemplates) {
      componentRef.clear();
    }
  }
  addAttributeField(e?: Event): void {
    if (e) {
      e.preventDefault();
    }
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AttributeItemComponent
    );
    let viewContainerRef = this.attributeHost.viewContainerRef;
    let componentRef = viewContainerRef.createComponent(componentFactory);
    this.attributeTemplates.push(viewContainerRef);
    let attribute = (<AttributeItemComponent>componentRef.instance).attribute;
    this.tempAttributes.push(attribute);
    // viewContainerRef.clear();
    // this.form.addControl(attribute.name, new FormControl(attribute.value));
  }
}
