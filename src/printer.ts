import { IComponent } from './component';
import { Converter } from './converter';
import { camelToSnakeCase } from './utils';

export interface IPrinter {
  /**
   * Returns a plaintext representation of the component
   * @param comp The component to create a plaintext string from.
   * @param converter The converter to use for options when creating the plaintext string.
   */
  toString(comp: IComponent, converter: Converter): string;

  /**
   * Returns a HTML representation of the component.
   * @param comp The component to create the HTML from.
   * @param converter The converter to use for options when creating the HTML.
   */
  toHTML(comp: IComponent, converter: Converter): string;

  /**
   * Checks if this printer can print the given component.
   * @param comp The component to check.
   */
  canPrint(comp: IComponent): boolean;
}

/**
 * Builds a HTML span containing from the provided component
 * @param comp The component to create the span from.
 * @param converter The converter to use for options when creating the span.
 * @param content The content to put into the span
 */
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
    let style = '';
    if (comp.underlined === true) {
      style += ` ${converter.options.styles.underlined}`;
    }
    if (comp.strikethrough === true) {
      style += ` ${converter.options.styles.strikethrough}`;
    }
    if (comp.underlined === false && comp.strikethrough === false) {
      style += ` none`;
    }
    if (style !== '') styles.push(`text-decoration:${style};`);
  }
  if (comp.color !== undefined) {
    let color = converter.options.styles.black;
    if (comp.color.startsWith('#')) {
      color = comp.color;
    } else {
      const style = Object.entries(converter.options.styles).find(
        (entry) => camelToSnakeCase(entry[0]) === comp.color
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
      (entry) => camelToSnakeCase(entry[0]) === comp.color
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
