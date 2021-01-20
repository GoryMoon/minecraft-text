export interface IComponent {
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  color?: string;
  insertion?: string;
  extra?: IComponent[];
}

export class BaseComponent implements IComponent {
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  color?: string;
  insertion: string;
  extra: IComponent[];

  constructor({
    bold,
    italic,
    underlined,
    strikethrough,
    obfuscated,
    color,
    insertion = '',
    extra = [],
  }: IComponent) {
    (this.bold = bold), (this.italic = italic);
    this.underlined = underlined;
    this.strikethrough = strikethrough;
    this.obfuscated = obfuscated;
    this.color = color;
    this.insertion = insertion;
    this.extra = extra;
  }
}
