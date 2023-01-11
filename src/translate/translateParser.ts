import { BaseComponent } from '../component';
import { IParser } from '../parser';
import { ITranslateComponent } from './translateComponent';

export class TranslateParser implements IParser {
  /** @inheritDoc */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public parse(json: any): BaseComponent {
    let comp = new BaseComponent({});
    (comp as ITranslateComponent).translate = '';

    if (json instanceof Object) {
      comp = this.parseTranslation(json as ITranslateComponent);
    }
    return comp;
  }

  private parseTranslation(data: ITranslateComponent): BaseComponent {
    const comp = new BaseComponent(data);
    (comp as ITranslateComponent).translate = data.translate;
    (comp as ITranslateComponent).with = data.with;

    return comp;
  }
}
