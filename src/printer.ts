import { IComponent } from './component';
import { Converter } from './converter';

export interface IPrinter {
  toString(comp: IComponent, converter: Converter): string;
  toHTML(comp: IComponent, converter: Converter): string;
  canPrint(comp: IComponent): boolean;
}

export function buildSpan(
  comp: IComponent,
  converter: Converter,
  content: string
): string {
  let span;
  if (converter.options.useClasses) {
    span = buildComponentClasses(comp, converter);
  } else {
    span = buildComponentStyles(comp, converter);
  }
  return `<span${span}>${content}</span>`;
}

function buildComponentStyles(comp: IComponent, converter: Converter): string {
  const styles: string[] = [];
  if (comp.bold !== undefined) {
    styles.push(
      `font-weight: ${comp.bold ? converter.options.styles.bold : 'normal'};`
    );
  }
  if (comp.italic !== undefined) {
    styles.push(
      `font-style: ${comp.italic ? converter.options.styles.italic : 'normal'};`
    );
  }
  if (comp.underlined !== undefined || comp.strikethrough !== undefined) {
    let style = ``;
    if (comp.underlined === true) {
      style += ` ${converter.options.styles.underlined}`;
    }
    if (comp.strikethrough === true) {
      style += ` ${converter.options.styles.strikethrough}`;
    }
    if (comp.underlined === false && comp.strikethrough === false) {
      style += ` none`;
    }
    styles.push(`text-decoration:${style};`);
  }
  if (comp.color !== undefined) {
    let color = converter.options.styles.black;
    if (comp.color.startsWith('#')) {
      color = comp.color;
    } else {
      const style = Object.entries(converter.options.styles).find(
        (entry) => entry[0] === comp.color
      );
      if (style !== undefined) {
        color = style[1];
      }
    }
    styles.push(`color: ${color};`);
  }
  const filtered = styles.filter((v) => v !== undefined);
  return filtered.length > 0 ? ` style="${filtered.join(' ')}"` : '';
}

function getClass(
  style: boolean | undefined,
  val: string,
  converter: Converter
): string | undefined {
  const options = converter.options;
  return style !== undefined
    ? options.classPrefix +
        val +
        (style ? options.setClassSuffix : options.unsetClassSuffix)
    : undefined;
}

function buildComponentClasses(comp: IComponent, converter: Converter): string {
  const classes = [];
  const classOptions = converter.options.classes;

  classes.push(getClass(comp.bold, classOptions.bold, converter));
  classes.push(getClass(comp.italic, classOptions.italic, converter));
  classes.push(getClass(comp.underlined, classOptions.underlined, converter));
  classes.push(
    getClass(comp.strikethrough, classOptions.strikethrough, converter)
  );
  classes.push(getClass(comp.obfuscated, classOptions.obfuscated, converter));

  if (comp.color !== undefined && !comp.color.startsWith('#')) {
    const style = Object.entries(classOptions).find(
      (entry) => entry[0] === comp.color
    );
    let color = classOptions.black;
    if (style !== undefined) {
      color = style[1];
    }
    classes.push(converter.options.classPrefix + color);
  }
  const filtered = classes.filter((v) => v !== undefined);
  return filtered.length > 0 ? ` class="${filtered.join(' ')}"` : '';
}
