import { IComponent } from '../component';
import { ITextComponent, TextParser } from '../index';
import { TextPrinter } from '../text/textPrinter';

test('Create new component', () => {
  const comp: ITextComponent = {
    text: 'Test',
  };
  expect(comp.text).toBe('Test');
});

test('Create new component with base values', () => {
  const comp: ITextComponent = {
    text: 'Test',
    bold: true,
  };
  expect(comp.text).toBe('Test');
  expect(comp.bold).toBe(true);
});

test('Parse text component', () => {
  const parser = new TextParser();

  const comp = parser.parse({
    text: 'Test',
    bold: true,
  });
  expect((comp as ITextComponent).text).toBe('Test');
  expect(comp.bold).toBe(true);
});

test('Parse empty text input', () => {
  const parser = new TextParser();
  const comp = parser.parse('');
  expect((comp as ITextComponent).text).toBe('');
});

test('Parse boolean text input', () => {
  const parser = new TextParser();
  let comp = parser.parse(true);
  expect((comp as ITextComponent).text).toBe('true');

  comp = parser.parse(false);
  expect((comp as ITextComponent).text).toBe('false');
});

test('Parse number text input', () => {
  const parser = new TextParser();
  let comp = parser.parse(5);
  expect((comp as ITextComponent).text).toBe('5');

  comp = parser.parse(5.5);
  expect((comp as ITextComponent).text).toBe('5.5');

  comp = parser.parse(1.9e10);
  expect((comp as ITextComponent).text).toBe('19000000000');
});

test('Parse null input', () => {
  const parser = new TextParser();
  let comp = parser.parse(null);
  expect((comp as ITextComponent).text).toBe('');

  comp = parser.parse(undefined);
  expect((comp as ITextComponent).text).toBe('');
});

test('Can print', () => {
  const printer = new TextPrinter();
  const comp: ITextComponent = {
    text: 'Test',
  };
  expect(printer.canPrint(comp)).toBe(true);
});

test('Can not print', () => {
  const printer = new TextPrinter();
  const comp: IComponent = {};
  expect(printer.canPrint(comp)).toBe(false);
});
