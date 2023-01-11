import { Converter } from '../converter';
import { ITextComponent } from '../text/textComponent';
import { TextParser } from '../text/textParser';
import { TextPrinter } from '../text/textPrinter';
import { TranslateParser } from '../translate/translateParser';

test('Converter default options', () => {
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
  expect(converter.options.styles.lightPuple).toBe('#FF55FF');
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
  expect(converter.options.classes.lightPuple).toBe('light-purple');
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

test('Converter custom text parser', () => {
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

test('Converter custom text printer', () => {
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

test('Parse single style input', () => {
  const converter = new Converter();
  const comp = converter.parse('{"bold": "true"}');
  expect(comp.bold).toBe(true);
});

test('Parse text and style input', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "bold": "true"}');
  expect(comp.bold).toBe(true);
  expect((comp as ITextComponent).text).toBe('Test');
});

test('Parse multiple text input', () => {
  const converter = new Converter();
  const comp = converter.parse('[{"text": "A"}, {"text": "Test"}]');
  expect((comp as ITextComponent).text).toBe('A');
  expect((comp.extra[0] as ITextComponent).text).toBe('Test');
});

test('Parse multiple text input, mixed ways', () => {
  const converter = new Converter();
  const comp = converter.parse('["",{"text":"Test"}]');
  expect((comp as ITextComponent).text).toBe('');
  expect((comp.extra[0] as ITextComponent).text).toBe('Test');
});

test('Parse multiple text input, simple style', () => {
  const converter = new Converter();
  const comp = converter.parse('["A","B"]');
  expect((comp as ITextComponent).text).toBe('A');
  expect((comp.extra[0] as ITextComponent).text).toBe('B');
});

test('Parse empty text input', () => {
  const converter = new Converter();
  let comp = converter.parse('""');
  expect((comp as ITextComponent).text).toBe('');

  comp = converter.parse('');
  expect((comp as ITextComponent).text).toBe('');
});

test('Parse boolean text input', () => {
  const converter = new Converter();
  let comp = converter.parse('"true"');
  expect((comp as ITextComponent).text).toBe('true');

  comp = converter.parse('true');
  expect((comp as ITextComponent).text).toBe('true');

  comp = converter.parse('"false"');
  expect((comp as ITextComponent).text).toBe('false');

  comp = converter.parse('false');
  expect((comp as ITextComponent).text).toBe('false');
});

test('Parse number text input', () => {
  const converter = new Converter();
  let comp = converter.parse('"5"');
  expect((comp as ITextComponent).text).toBe('5');

  comp = converter.parse('5');
  expect((comp as ITextComponent).text).toBe('5');

  comp = converter.parse('"5.5"');
  expect((comp as ITextComponent).text).toBe('5.5');

  comp = converter.parse('5.5');
  expect((comp as ITextComponent).text).toBe('5.5');

  comp = converter.parse('"1.9E10"');
  expect((comp as ITextComponent).text).toBe('19000000000');

  comp = converter.parse('1.9E10');
  expect((comp as ITextComponent).text).toBe('19000000000');
});

test('Parse null input', () => {
  const converter = new Converter();
  let comp = converter.parse(null);
  expect((comp as ITextComponent).text).toBe('');

  comp = converter.parse(undefined);
  expect((comp as ITextComponent).text).toBe('');

  comp = converter.parse('null');
  expect((comp as ITextComponent).text).toBe('');
});

test('Parse invalid input', () => {
  const converter = new Converter();

  expect(() => {
    converter.parse(() => {});
  }).toThrow('Trying to parse invalid data:');
});

test('Basic ToJSON output', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test"}');
  expect(converter.toJSON(comp)).toBe('{"text":"Test"}');
});

test('ToJSON output, with styles', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "bold": "true"}');
  expect(converter.toJSON(comp)).toBe('{"bold":"true","text":"Test"}');
});

test('Single ToString output', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test"}');
  expect(converter.toString(comp)).toBe('Test');
});

test('Multiple ToString output', () => {
  const converter = new Converter();
  const comp = converter.parse(
    '[{"text": "Hello"}, {"text": " World"}, {"text": "!"}]'
  );
  expect(converter.toString(comp)).toBe('Hello World!');
});

test('ToString output, with undefined extra', () => {
  const converter = new Converter();
  const comp = {} as ITextComponent;
  comp.text = 'Test';
  expect(converter.toString(comp)).toBe('Test');
});

test('Basic ToString output', () => {
  const converter = new Converter();
  const comp = converter.parse('["Hello ", "World", "!"]');
  expect(converter.toString(comp)).toBe('Hello World!');
});

test('Basic ToString output, newline false', () => {
  const converter = new Converter();
  const comp = converter.parse('["Hello", "\\n", "World", "!"]');
  expect(converter.toString(comp)).toBe('Hello\nWorld!');
});

test('Basic ToString output, newline', () => {
  const converter = new Converter({ newline: true });
  const comp = converter.parse('["Hello", "\\n", "World", "!"]');
  expect(converter.toString(comp)).toBe('Hello World!');
});

test('ToString output, with styles', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "bold": "true"}');
  expect(converter.toString(comp)).toBe('Test');
});

test('Single ToHTML output', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "color": "black"}');
  expect(converter.toHTML(comp)).toBe(
    '<span style="color: #000000;">Test</span>'
  );
});

test('Extra ToHTML output', () => {
  const converter = new Converter();
  const comp = converter.parse(
    '{"text": "Hello", "color": "black", "extra": [{"text": " World!"}]}'
  );
  expect(converter.toHTML(comp)).toBe(
    '<span style="color: #000000;">Hello<span> World!</span></span>'
  );
});

test('ToHTML output, with undefined extra', () => {
  const converter = new Converter();
  const comp = {} as ITextComponent;
  comp.text = 'Test';
  expect(converter.toHTML(comp)).toBe('<span>Test</span>');
});

test('Basic ToHTML output, custom color', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "color": "#424242"}');
  expect(converter.toHTML(comp)).toBe(
    '<span style="color: #424242;">Test</span>'
  );
});

test('ToHTML output set', () => {
  const converter = new Converter();
  const comp = converter.parse(
    '{"text": "Test", "color": "black", "bold": "true", "italic": "true", "underlined": "true", "strikethrough": "true"}'
  );
  expect(converter.toHTML(comp)).toBe(
    '<span style="font-weight: bold; font-style: italic; text-decoration: underline line-through; color: #000000;">Test</span>'
  );
});

test('ToHTML output unset', () => {
  const converter = new Converter();
  const comp = converter.parse(
    '{"text": "Test", "bold": "false", "italic": "false", "underlined": "false", "strikethrough": "false"}'
  );
  expect(converter.toHTML(comp)).toBe(
    '<span style="font-weight: normal; font-style: normal; text-decoration: none;">Test</span>'
  );
});

test('Basic ToHTML output, invalid color', () => {
  const converter = new Converter();
  const comp = converter.parse('{"text": "Test", "color": "tomato"}');
  expect(converter.toHTML(comp)).toBe(
    '<span style="color: #000000;">Test</span>'
  );
});

test('Basic ToHTML output, classes', () => {
  const converter = new Converter({ useClasses: true });
  const comp = converter.parse('{"text": "Test", "color": "black"}');
  expect(converter.toHTML(comp)).toBe('<span class="mc-black">Test</span>');
});

test('ToHTML output set, classes', () => {
  const converter = new Converter({ useClasses: true });
  const comp = converter.parse(
    '{"text": "Test", "color": "black", "bold": "true", "italic": "true", "underlined": "true", "strikethrough": "true"}'
  );
  expect(converter.toHTML(comp)).toBe(
    '<span class="mc-bold-set mc-italic-set mc-underlined-set mc-strikethrough-set mc-black">Test</span>'
  );
});

test('ToHTML output unset, classes', () => {
  const converter = new Converter({ useClasses: true });
  const comp = converter.parse(
    '{"text": "Test", "color": "black", "bold": "false", "italic": "false", "underlined": "false", "strikethrough": "false"}'
  );
  expect(converter.toHTML(comp)).toBe(
    '<span class="mc-bold-unset mc-italic-unset mc-underlined-unset mc-strikethrough-unset mc-black">Test</span>'
  );
});

test('Basic ToHTML output, custom color classes', () => {
  const converter = new Converter({ useClasses: true });
  const comp = converter.parse('{"text": "Test", "color": "#424242"}');
  expect(converter.toHTML(comp)).toBe('<span>Test</span>');
});

test('Basic ToHTML output, invalid color classes', () => {
  const converter = new Converter({ useClasses: true });
  const comp = converter.parse('{"text": "Test", "color": "tomato"}');
  expect(converter.toHTML(comp)).toBe('<span class="mc-black">Test</span>');
});

test('Basic ToHTML output, newline false', () => {
  const converter = new Converter();
  const comp = converter.parse('["Hello", "\\n", "World", "!"]');
  expect(converter.toHTML(comp)).toBe(
    '<span>Hello<span>\n</span><span>World</span><span>!</span></span>'
  );
});

test('Basic ToHTML output, newline', () => {
  const converter = new Converter({ newline: true });
  const comp = converter.parse('["Hello", "\\n", "World", "!"]');
  expect(converter.toHTML(comp)).toBe(
    '<span>Hello<span><br></span><span>World</span><span>!</span></span>'
  );
});

test('Try printing component without supported printer', () => {
  const parsers = new Map();
  parsers.set('translate', new TranslateParser());
  const converter = new Converter({ parsers });
  const comp = converter.parse('{"translate": "test.test", "bold": "true"}');
  expect(converter.toString(comp)).toBe('');
  expect(converter.toHTML(comp)).toBe('');
});
