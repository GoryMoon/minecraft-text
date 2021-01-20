import { IComponent } from '../component';
import { Converter } from '../converter';
import { buildSpan, IPrinter } from '../printer';
import { ITextComponent } from './textComponent';

export class TextPrinter implements IPrinter {
  public toString(comp: IComponent, converter: Converter): string {
    let extra = '';
    if (comp.extra !== undefined) {
      extra = comp.extra.map((c) => converter.toString(c)).join('');
    }
    return (comp as ITextComponent).text + extra;
  }

  public toHTML(comp: IComponent, converter: Converter): string {
    let extra = '';
    if (comp.extra !== undefined) {
      extra = comp.extra.map((c) => converter.toHTML(c)).join('');
    }
    return buildSpan(comp, converter, (comp as ITextComponent).text + extra);
  }

  public canPrint(comp: IComponent): boolean {
    return (comp as ITextComponent).text !== undefined;
  }
}
