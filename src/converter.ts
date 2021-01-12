import { BaseComponent, IComponent } from './component';
import { IParser } from './parser';
import { TextParser } from './text/textParser';

type Colors = {
  default: string;
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
};

type Options = {
  newline: boolean;
  useClasses: boolean;
  classPrefix: string;
  parsers: Map<string, IParser>;
  colors: Colors;
  classes: Colors;
};

const boolVals = [
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
        colors: {
          default: '#000000',
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
        },
        classes: {
          default: 'default',
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
        },
      },
      options
    );

    if (!opt.parsers.has('text')) {
      opt.parsers.set('text', new TextParser());
    }

    return opt;
  }

  private jsonReviver(key: string, val: any): any {
    if (boolVals.includes(key)) {
      return val === 'true';
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
}
