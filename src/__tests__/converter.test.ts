import { Converter, ITextComponent, TextParser } from '../index';

test('Converter default options', () => {
  const converter = new Converter();
  expect(converter.options.newline).toBe(false);
  expect(converter.options.useClasses).toBe(false);
  expect(converter.options.classPrefix).toBe('mc-');
  expect(converter.options.parsers.size).toBe(1);
  expect(converter.options.parsers).toBeInstanceOf(Map);
  expect(converter.options.parsers.get('text')).toBeInstanceOf(TextParser);

  expect(converter.options.colors.black).toBe('#000000');
  expect(converter.options.colors.darkBlue).toBe('#0000AA');
  expect(converter.options.colors.darkGreen).toBe('#00AA00');
  expect(converter.options.colors.darkAqua).toBe('#00AAAA');
  expect(converter.options.colors.darkRed).toBe('#AA0000');
  expect(converter.options.colors.darkPurple).toBe('#AA00AA');
  expect(converter.options.colors.gold).toBe('#FFAA00');
  expect(converter.options.colors.gray).toBe('#AAAAAA');
  expect(converter.options.colors.darkGray).toBe('#555555');
  expect(converter.options.colors.blue).toBe('#5555FF');
  expect(converter.options.colors.green).toBe('#55FF55');
  expect(converter.options.colors.aqua).toBe('#55FFFF');
  expect(converter.options.colors.red).toBe('#FF5555');
  expect(converter.options.colors.lightPuple).toBe('#FF55FF');
  expect(converter.options.colors.yellow).toBe('#FFFF55');
  expect(converter.options.colors.white).toBe('#FFFFFF');
  expect(converter.options.colors.minecoinGold).toBe('#DDD605');

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
});

class CustomTextParser extends TextParser {}

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
