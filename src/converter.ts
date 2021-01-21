import { BaseComponent, IComponent } from './component';
import { IParser } from './parser';
import { IPrinter } from './printer';
import { TextParser } from './text/textParser';
import { TextPrinter } from './text/textPrinter';

type Styles = {
  black: string;
  darkBlue: string;
  darkGreen: string;
  darkAqua: string;
  darkRed: string;
  darkPurple: string;
  gold: string;
  gray: string;
  darkGray: string;
  blue: string;
  green: string;
  aqua: string;
  red: string;
  lightPuple: string;
  yellow: string;
  white: string;
  minecoinGold: string;
  bold: string;
  italic: string;
  underlined: string;
  strikethrough: string;
  obfuscated: string;
};

type Options = {
  newline: boolean;
  useClasses: boolean;
  classPrefix: string;
  parsers: Map<string, IParser>;
  printers: Map<string, IPrinter>;
  styles: Styles;
  classes: Styles;
  setClassSuffix: string;
  unsetClassSuffix: string;
};

const boolValues = [
  'bold',
  'italic',
  'underlined',
  'strikethrough',
  'obfuscated',
];

export class Converter {
  public options: Options;
  private readonly defaultTextParser: IParser = new TextParser();

  constructor(options: Partial<Options> = {}) {
    this.options = this.parseOptions(options);
  }

  private parseOptions(options: Partial<Options>): Options {
    const opt: Options = Object.assign(
      {
        newline: false,
        useClasses: false,
        classPrefix: 'mc-',
        parsers: new Map(),
        printers: new Map(),
        styles: {
          black: '#000000',
          darkBlue: '#0000AA',
          darkGreen: '#00AA00',
          darkAqua: '#00AAAA',
          darkRed: '#AA0000',
          darkPurple: '#AA00AA',
          gold: '#FFAA00',
          gray: '#AAAAAA',
          darkGray: '#555555',
          blue: '#5555FF',
          green: '#55FF55',
          aqua: '#55FFFF',
          red: '#FF5555',
          lightPuple: '#FF55FF',
          yellow: '#FFFF55',
          white: '#FFFFFF',
          minecoinGold: '#DDD605',
          bold: 'bold',
          italic: 'italic',
          underlined: 'underline',
          strikethrough: 'line-through',
          obfuscated: '',
        },
        classes: {
          black: 'black',
          darkBlue: 'dark-blue',
          darkGreen: 'dark-green',
          darkAqua: 'dark-aqua',
          darkRed: 'dark-red',
          darkPurple: 'dark-purple',
          gold: 'gold',
          gray: 'gray',
          darkGray: 'dark-gray',
          blue: 'blue',
          green: 'green',
          aqua: 'aqua',
          red: 'red',
          lightPuple: 'light-purple',
          yellow: 'yellow',
          white: 'white',
          minecoinGold: 'minecoin-gold',
          bold: 'bold',
          italic: 'italic',
          underlined: 'underlined',
          strikethrough: 'strikethrough',
          obfuscated: 'obfuscated',
        },
        setClassSuffix: '-set',
        unsetClassSuffix: '-unset',
      },
      options
    );

    if (!opt.parsers.has('text')) {
      opt.parsers.set('text', new TextParser());
    }

    if (!opt.printers.has('text')) {
      opt.printers.set('text', new TextPrinter());
    }

    return opt;
  }

  /**
   * Reviver to transform for the JSON.parse method
   * Replaces boolean string values with boolean primitives
   */
  private jsonReviver(key: string, val: any): any {
    if (boolValues.includes(key)) {
      return val === 'true';
    }
    return val;
  }

  /**
   * Replacer to transform for the JSON.stringify method
   * Replaces boolean to string literals
   * Removes default values from the json
   */
  private jsonReplacer(key: string, val: any): any {
    if (boolValues.includes(key)) {
      return val ? String(val) : undefined;
    }
    if (
      (key === 'color' && val === 'default') ||
      ((key === 'insertion' || key === 'extra') && val.length <= 0)
    ) {
      return undefined;
    }
    return val;
  }

  public parse(input: any): BaseComponent {
    if (typeof input === 'string' && input.length > 0) {
      try {
        return this.parse(JSON.parse(input as string, this.jsonReviver));
      } catch {
        try {
          return this.defaultTextParser.parse(input);
        } catch {
          // throw invalid data below
        }
      }
    } else if (input instanceof Array) {
      const base = this.parse(input.shift());
      for (const comp of input) {
        base.extra.push(this.parse(comp));
      }
      return base;
    } else if (typeof input === 'object' && input !== null) {
      let base = new BaseComponent(input);
      for (const [key, parser] of this.options.parsers.entries()) {
        if (key in input) {
          base = parser.parse(input);
          break;
        }
      }
      return base;
    } else if (
      typeof input === 'number' ||
      typeof input === 'boolean' ||
      (typeof input === 'string' && input.length <= 0) ||
      input === null ||
      input === undefined
    ) {
      return this.defaultTextParser.parse(input);
    }
    throw new Error(`Trying to parse invalid data: ${input}`);
  }

  public toString(comp: IComponent): string {
    let p;
    for (const printer of this.options.printers.values()) {
      if (printer.canPrint(comp)) {
        p = printer;
        break;
      }
    }
    let val = p !== undefined ? p.toString(comp, this) : '';
    if (this.options.newline) {
      val = val.replace('\n', ' ');
    }
    return val;
  }

  public toHTML(comp: IComponent): string {
    let p;
    for (const printer of this.options.printers.values()) {
      if (printer.canPrint(comp)) {
        p = printer;
        break;
      }
    }
    let val = p !== undefined ? p.toHTML(comp, this) : '';
    if (this.options.newline) {
      val = val.replace('\n', '<br>');
    }
    return val;
  }

  public toJSON(comp: IComponent): string {
    return JSON.stringify(comp, this.jsonReplacer);
  }
}
