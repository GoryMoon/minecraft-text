import { BaseComponent } from '../component';
import { IParser } from '../parser';
import { ITextComponent } from './textComponent';

export class TextParser implements IParser {
  /** @inheritDoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public parse(json: any): BaseComponent {
    let comp = new BaseComponent({});
    (comp as ITextComponent).text = '';
    if (typeof json === 'string') {
      (comp as ITextComponent).text = json;
    } else if (json instanceof Object) {
      comp = this.parseText(json as ITextComponent);
    } else if (typeof json === 'number' || typeof json === 'boolean') {
      (comp as ITextComponent).text = json.toString();
    }
    return comp;
  }

  private parseText(data: ITextComponent): BaseComponent {
    const comp = new BaseComponent(data);
    (comp as ITextComponent).text = data.text;
    return comp;
  }
}
