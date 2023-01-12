import { describe, expect, test } from '@jest/globals';

import { Converter } from '../index';
import { ITextComponent, TextParser, TextPrinter } from '../text/index';
import { TranslateParser } from '../translate/index';

describe('option parsing', () => {
  test('converter default options', () => {
    const converter = new Converter();
    expect(converter.options.newline).toBe(false);
    expect(converter.options.useClasses).toBe(false);
    expect(converter.options.classPrefix).toBe('mc-');
    expect(converter.options.parsers.size).toBe(1);
    expect(converter.options.parsers).toBeInstanceOf(Map);
    expect(converter.options.parsers.get('text')).toBeInstanceOf(TextParser);
    expect(converter.options.setClassSuffix).toBe('-set');
    expect(converter.options.unsetClassSuffix).toBe('-unset');

    expect(converter.options.styles.black).toBe('#000000');
    expect(converter.options.styles.darkBlue).toBe('#0000AA');
    expect(converter.options.styles.darkGreen).toBe('#00AA00');
    expect(converter.options.styles.darkAqua).toBe('#00AAAA');
    expect(converter.options.styles.darkRed).toBe('#AA0000');
    expect(converter.options.styles.darkPurple).toBe('#AA00AA');
    expect(converter.options.styles.gold).toBe('#FFAA00');
    expect(converter.options.styles.gray).toBe('#AAAAAA');
    expect(converter.options.styles.darkGray).toBe('#555555');
    expect(converter.options.styles.blue).toBe('#5555FF');
    expect(converter.options.styles.green).toBe('#55FF55');
    expect(converter.options.styles.aqua).toBe('#55FFFF');
    expect(converter.options.styles.red).toBe('#FF5555');
    expect(converter.options.styles.lightPurple).toBe('#FF55FF');
    expect(converter.options.styles.yellow).toBe('#FFFF55');
    expect(converter.options.styles.white).toBe('#FFFFFF');
    expect(converter.options.styles.minecoinGold).toBe('#DDD605');
    expect(converter.options.styles.bold).toBe('bold');
    expect(converter.options.styles.italic).toBe('italic');
    expect(converter.options.styles.underlined).toBe('underline');
    expect(converter.options.styles.strikethrough).toBe('line-through');
    expect(converter.options.styles.obfuscated).toBe('');

    expect(converter.options.classes.black).toBe('black');
    expect(converter.options.classes.darkBlue).toBe('dark-blue');
    expect(converter.options.classes.darkGreen).toBe('dark-green');
    expect(converter.options.classes.darkAqua).toBe('dark-aqua');
    expect(converter.options.classes.darkRed).toBe('dark-red');
    expect(converter.options.classes.darkPurple).toBe('dark-purple');
    expect(converter.options.classes.gold).toBe('gold');
    expect(converter.options.classes.gray).toBe('gray');
    expect(converter.options.classes.darkGray).toBe('dark-gray');
    expect(converter.options.classes.blue).toBe('blue');
    expect(converter.options.classes.green).toBe('green');
    expect(converter.options.classes.aqua).toBe('aqua');
    expect(converter.options.classes.red).toBe('red');
    expect(converter.options.classes.lightPurple).toBe('light-purple');
    expect(converter.options.classes.yellow).toBe('yellow');
    expect(converter.options.classes.white).toBe('white');
    expect(converter.options.classes.minecoinGold).toBe('minecoin-gold');
    expect(converter.options.classes.bold).toBe('bold');
    expect(converter.options.classes.italic).toBe('italic');
    expect(converter.options.classes.underlined).toBe('underlined');
    expect(converter.options.classes.strikethrough).toBe('strikethrough');
    expect(converter.options.classes.obfuscated).toBe('obfuscated');
  });

  class CustomTextParser extends TextParser {}
  class CustomTextPrinter extends TextPrinter {}

  test('converter custom text parser', () => {
    const parsers = new Map();
    parsers.set('text', new CustomTextParser());
    const converter = new Converter({ parsers });

    expect(converter.options.parsers.size).toBe(1);
    expect(converter.options.parsers).toBeInstanceOf(Map);
    expect(converter.options.parsers.get('text')).toBeInstanceOf(TextParser);
    expect(converter.options.parsers.get('text')).toBeInstanceOf(
      CustomTextParser
    );
  });

  test('converter custom text printer', () => {
    const printers = new Map();
    printers.set('text', new CustomTextPrinter());
    const converter = new Converter({ printers });

    expect(converter.options.printers.size).toBe(1);
    expect(converter.options.printers).toBeInstanceOf(Map);
    expect(converter.options.printers.get('text')).toBeInstanceOf(TextPrinter);
    expect(converter.options.printers.get('text')).toBeInstanceOf(
      CustomTextPrinter
    );
  });
});

describe('parse text input structures', () => {
  test.each([
    { data: '[{"text": "A"}, {"text": "Test"}]', root: 'A', extra: 'Test' },
    { data: '["",{"text":"Test"}]', root: '', extra: 'Test' },
    { data: '["A","B"]', root: 'A', extra: 'B' },
  ])('text input formats', ({ data, root, extra }) => {
    const converter = new Converter();
    const comp = converter.parse(data);
    expect((comp as ITextComponent).text).toBe(root);
    expect((comp.extra[0] as ITextComponent).text).toBe(extra);
  });
});

describe('parse primitives', () => {
  test('parse empty text input', () => {
    const converter = new Converter();
    let comp = converter.parse('""');
    expect((comp as ITextComponent).text).toBe('');

    comp = converter.parse('');
    expect((comp as ITextComponent).text).toBe('');
  });

  test.each([
    ['"true"', 'true'],
    ['true', 'true'],
    ['"false"', 'false'],
    ['false', 'false'],
  ])('parse boolean text input: %s -> %s', (data, out) => {
    const converter = new Converter();
    let comp = converter.parse(data);
    expect((comp as ITextComponent).text).toBe(out);
  });

  test.each([
    ['"5"', '5'],
    ['5', '5'],
    ['"5.5"', '5.5'],
    ['5.5', '5.5'],
    ['"1.9E10"', '19000000000'],
    ['1.9E10', '19000000000'],
  ])('parse number text input: %s -> %s', (data, out) => {
    const converter = new Converter();
    let comp = converter.parse(data);
    expect((comp as ITextComponent).text).toBe(out);
  });

  test.each([[null], [undefined], ['null']])('parse null input', (data) => {
    const converter = new Converter();
    let comp = converter.parse(data);
    expect((comp as ITextComponent).text).toBe('');
  });

  test('Parse invalid input', () => {
    const converter = new Converter();

    expect(() => {
      converter.parse(() => {});
    }).toThrow('Trying to parse invalid data:');
  });
});

describe('basic input and style parsing', () => {
  test('parse single style input (string)', () => {
    const converter = new Converter();
    const comp = converter.parse('{"bold": "true"}');
    expect(comp.bold).toBe(true);
  });

  test('parse single style input (bool)', () => {
    const converter = new Converter();
    const comp = converter.parse('{"bold": true}');
    expect(comp.bold).toBe(true);
  });

  test('parse text and style input', () => {
    const converter = new Converter();
    const comp = converter.parse('{"text": "Test", "bold": "true"}');
    expect(comp.bold).toBe(true);
    expect((comp as ITextComponent).text).toBe('Test');
  });
});

describe('parsing to json output', () => {
  test.each([
    {
      name: 'basic',
      data: '{"text": "Test"}',
      out: '{"text":"Test"}',
    },
    {
      name: 'set (string)',
      data: '{"text": "Test", "bold": "true"}',
      out: '{"bold":true,"text":"Test"}',
    },
    {
      name: 'set (bool)',
      data: '{"text": "Test", "bold": true}',
      out: '{"bold":true,"text":"Test"}',
    },
    {
      name: 'unset (string)',
      data: '{"text": "Test", "bold": "false"}',
      out: '{"text":"Test"}',
    },
    {
      name: 'unset (bool)',
      data: '{"text": "Test", "bold": false}',
      out: '{"text":"Test"}',
    },
  ])('$name ToJSON output', ({ data, out }) => {
    const converter = new Converter();
    const comp = converter.parse(data);
    expect(converter.toJSON(comp)).toBe(out);
  });
});

describe('toString outputs', () => {
  test.each([
    { name: 'single', data: '{"text": "Test"}', out: 'Test' },
    {
      name: 'multiple',
      data: '[{"text": "Hello"}, {"text": " World"}, {"text": "!"}]',
      out: 'Hello World!',
    },
    {
      name: 'simple array',
      data: '["Hello ", "World", "!"]',
      out: 'Hello World!',
    },
    {
      name: 'keep newline',
      data: '["Hello", "\\n", "World", "!"]',
      out: 'Hello\nWorld!',
    },
    {
      name: 'remove newline',
      data: '["Hello", "\\n", "World", "!"]',
      out: 'Hello World!',
      newline: true,
    },
    {
      name: 'style (string)',
      data: '{"text": "Test", "bold": "true"}',
      out: 'Test',
    },
    {
      name: 'style (bool)',
      data: '{"text": "Test", "bold": true}',
      out: 'Test',
    },
  ])('$name ToString output', ({ data, out, newline }) => {
    const converter = new Converter({ newline: newline });
    const comp = converter.parse(data);
    expect(converter.toString(comp)).toBe(out);
  });

  test('toString output, with undefined extra', () => {
    const converter = new Converter();
    const comp = {} as ITextComponent;
    comp.text = 'Test';
    expect(converter.toString(comp)).toBe('Test');
  });
});

describe('toHTML outputs', () => {
  test.each([
    {
      name: 'single',
      data: '{"text": "Test", "color": "black"}',
      out: '<span style="color: #000000;">Test</span>',
    },
    {
      name: 'extra',
      data: '{"text": "Hello", "color": "black", "extra": [{"text": " World!"}]}',
      out: '<span style="color: #000000;">Hello<span> World!</span></span>',
    },
    {
      name: 'custom color',
      data: '{"text": "Test", "color": "#424242"}',
      out: '<span style="color: #424242;">Test</span>',
    },
    {
      name: 'set all (string)',
      data: '{"text": "Test", "color": "black", "bold": "true", "italic": "true", "underlined": "true", "strikethrough": "true"}',
      out: '<span style="font-weight: bold; font-style: italic; text-decoration: underline line-through; color: #000000;">Test</span>',
    },
    {
      name: 'set all (bool)',
      data: '{"text": "Test", "color": "black", "bold": true, "italic": true, "underlined": true, "strikethrough": true}',
      out: '<span style="font-weight: bold; font-style: italic; text-decoration: underline line-through; color: #000000;">Test</span>',
    },
    {
      name: 'unset all (string)',
      data: '{"text": "Test", "bold": "false", "italic": "false", "underlined": "false", "strikethrough": "false"}',
      out: '<span style="font-weight: normal; font-style: normal; text-decoration: none;">Test</span>',
    },
    {
      name: 'unset all (bool)',
      data: '{"text": "Test", "bold": false, "italic": false, "underlined": false, "strikethrough": false}',
      out: '<span style="font-weight: normal; font-style: normal; text-decoration: none;">Test</span>',
    },
    {
      name: 'invalid color',
      data: '{"text": "Test", "color": "tomato"}',
      out: '<span style="color: #000000;">Test</span>',
    },
  ])('$name ToHTML output', ({ data, out }) => {
    const converter = new Converter();
    const comp = converter.parse(data);
    expect(converter.toHTML(comp)).toBe(out);
  });

  describe('singular style', () => {
    test.each([
      {
        name: 'set bold',
        data: '{"text": "Test", "bold": true}',
        out: '<span style="font-weight: bold;">Test</span>',
      },
      {
        name: 'unset bold',
        data: '{"text": "Test", "bold": false}',
        out: '<span style="font-weight: normal;">Test</span>',
      },
      {
        name: 'set italic',
        data: '{"text": "Test", "italic": true}',
        out: '<span style="font-style: italic;">Test</span>',
      },
      {
        name: 'unset italic',
        data: '{"text": "Test", "italic": false}',
        out: '<span style="font-style: normal;">Test</span>',
      },
      {
        name: 'set underlined',
        data: '{"text": "Test", "underlined": true}',
        out: '<span style="text-decoration: underline;">Test</span>',
      },
      {
        name: 'unset underlined',
        data: '{"text": "Test", "underlined": false}',
        out: '<span>Test</span>',
      },
      {
        name: 'set strikethrough',
        data: '{"text": "Test", "strikethrough": true}',
        out: '<span style="text-decoration: line-through;">Test</span>',
      },
      {
        name: 'unset strikethrough',
        data: '{"text": "Test", "strikethrough": false}',
        out: '<span>Test</span>',
      },
      {
        name: 'unset strikethrough and underline',
        data: '{"text": "Test", "strikethrough": false, "underlined": false}',
        out: '<span style="text-decoration: none;">Test</span>',
      },
    ])('$name ToHTML style', ({ data, out }) => {
      const converter = new Converter();
      const comp = converter.parse(data);
      expect(converter.toHTML(comp)).toBe(out);
    });
  });

  test('ToHTML output, with undefined extra', () => {
    const converter = new Converter();
    const comp = {} as ITextComponent;
    comp.text = 'Test';
    expect(converter.toHTML(comp)).toBe('<span>Test</span>');
  });

  test.each([
    {
      name: 'basic',
      data: '{"text": "Test", "color": "black"}',
      out: '<span class="mc-black">Test</span>',
    },
    {
      name: 'custom color',
      data: '{"text": "Test", "color": "#424242"}',
      out: '<span>Test</span>',
    },
    {
      name: 'set all (string)',
      data: '{"text": "Test", "color": "black", "bold": "true", "italic": "true", "underlined": "true", "strikethrough": "true"}',
      out: '<span class="mc-bold-set mc-italic-set mc-underlined-set mc-strikethrough-set mc-black">Test</span>',
    },
    {
      name: 'set all (bool)',
      data: '{"text": "Test", "color": "black", "bold": true, "italic": true, "underlined": true, "strikethrough": true}',
      out: '<span class="mc-bold-set mc-italic-set mc-underlined-set mc-strikethrough-set mc-black">Test</span>',
    },
    {
      name: 'unset all (string)',
      data: '{"text": "Test", "bold": "false", "italic": "false", "underlined": "false", "strikethrough": "false"}',
      out: '<span class="mc-bold-unset mc-italic-unset mc-underlined-unset mc-strikethrough-unset">Test</span>',
    },
    {
      name: 'unset all (bool)',
      data: '{"text": "Test", "bold": false, "italic": false, "underlined": false, "strikethrough": false}',
      out: '<span class="mc-bold-unset mc-italic-unset mc-underlined-unset mc-strikethrough-unset">Test</span>',
    },
    {
      name: 'invalid color',
      data: '{"text": "Test", "color": "tomato"}',
      out: '<span class="mc-black">Test</span>',
    },
  ])('$name ToHTML classes output', ({ data, out }) => {
    const converter = new Converter({ useClasses: true });
    const comp = converter.parse(data);
    expect(converter.toHTML(comp)).toBe(out);
  });

  test.each([
    {
      name: 'keep newline',
      data: '["Hello", "\\n", "World", "!"]',
      out: '<span>Hello<span>\n</span><span>World</span><span>!</span></span>',
    },
    {
      name: 'keep newline',
      data: '["Hello", "\\n", "World", "!"]',
      out: '<span>Hello<span><br></span><span>World</span><span>!</span></span>',
      newline: true,
    },
  ])('$name ToHTML output', ({ data, out, newline }) => {
    const converter = new Converter({ newline: newline });
    const comp = converter.parse(data);
    expect(converter.toHTML(comp)).toBe(out);
  });

  const defaultConverter = new Converter();
  const classConverter = new Converter({ useClasses: true });
  const s = defaultConverter.options.styles;
  const c = defaultConverter.options.classes;

  test.each([
    ['black', s.black],
    ['dark_blue', s.darkBlue],
    ['dark_green', s.darkGreen],
    ['dark_aqua', s.darkAqua],
    ['dark_red', s.darkRed],
    ['dark_purple', s.darkPurple],
    ['gold', s.gold],
    ['gray', s.gray],
    ['dark_gray', s.darkGray],
    ['blue', s.blue],
    ['green', s.green],
    ['aqua', s.aqua],
    ['red', s.red],
    ['light_purple', s.lightPurple],
    ['yellow', s.yellow],
    ['white', s.white],
  ])('test color: %s -> %s', (data, out) => {
    const comp = defaultConverter.parse(`{"color":"${data}","text":"Test"}`);
    expect(defaultConverter.toHTML(comp)).toBe(
      `<span style="color: ${out};">Test</span>`
    );
  });

  test.each([
    ['black', c.black],
    ['dark_blue', c.darkBlue],
    ['dark_green', c.darkGreen],
    ['dark_aqua', c.darkAqua],
    ['dark_red', c.darkRed],
    ['dark_purple', c.darkPurple],
    ['gold', c.gold],
    ['gray', c.gray],
    ['dark_gray', c.darkGray],
    ['blue', c.blue],
    ['green', c.green],
    ['aqua', c.aqua],
    ['red', c.red],
    ['light_purple', c.lightPurple],
    ['yellow', c.yellow],
    ['white', c.white],
  ])('test classes: %s -> %s', (data, out) => {
    const comp = classConverter.parse(`{"color":"${data}","text":"Test"}`);
    expect(classConverter.toHTML(comp)).toBe(
      `<span class="mc-${out}">Test</span>`
    );
  });
});

test('Try printing component without supported printer', () => {
  const parsers = new Map();
  parsers.set('translate', new TranslateParser());
  const converter = new Converter({ parsers });
  const comp = converter.parse('{"translate": "test.test", "bold": "true"}');
  expect(converter.toString(comp)).toBe('');
  expect(converter.toHTML(comp)).toBe('');
});
