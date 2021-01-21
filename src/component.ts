export interface IClickEvent {
  open_url: string;
  run_command: string;
  suggest_command: string;
  change_page: string | number;
}

export interface IHoverEvent {
  show_text: string | IComponent;
  show_item: string | IComponent;
  show_entity: string;
}

export interface IComponent {
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  color?: string;
  insertion?: string;
  extra?: IComponent[];
  clickEvent?: IClickEvent;
  hoverEvent?: IHoverEvent;
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
  clickEvent?: IClickEvent;
  hoverEvent?: IHoverEvent;

  constructor({
    bold,
    italic,
    underlined,
    strikethrough,
    obfuscated,
    color,
    insertion = '',
    extra = [],
    clickEvent,
    hoverEvent,
  }: IComponent) {
    (this.bold = bold), (this.italic = italic);
    this.underlined = underlined;
    this.strikethrough = strikethrough;
    this.obfuscated = obfuscated;
    this.color = color;
    this.insertion = insertion;
    this.extra = extra;
    this.clickEvent = clickEvent;
    this.hoverEvent = hoverEvent;
  }
}
