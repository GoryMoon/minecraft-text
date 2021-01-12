import { BaseComponent } from '../component';
import { IParser } from '../parser';
import { ITextComponent } from './textComponent';

export class TextParser implements IParser {
  public parse(json: any): BaseComponent {
    let comp = new BaseComponent({});
    (comp as ITextComponent).text = '';

    if (typeof json === 'string') {
      (comp as ITextComponent).text = json;
    } else if (json instanceof Object) {
      comp = new BaseComponent(json);
      (comp as ITextComponent).text = json.text;
    } else if (typeof json === 'number' || typeof json === 'boolean') {
      (comp as ITextComponent).text = json.toString();
    }
    return comp;
  }
}
