import { expect, test } from '@jest/globals';

import { IComponent } from '../component';
import { ITextComponent, TextParser, TextPrinter } from '../text/index';

test('create new component', () => {
  const comp: ITextComponent = {
    text: 'Test',
  };
  expect(comp.text).toBe('Test');
});

test('create new component with base values', () => {
  const comp: ITextComponent = {
    text: 'Test',
    bold: true,
  };
  expect(comp.text).toBe('Test');
  expect(comp.bold).toBe(true);
});

test('parse text component', () => {
  const parser = new TextParser();

  const comp = parser.parse({
    text: 'Test',
    bold: true,
  });
  expect((comp as ITextComponent).text).toBe('Test');
  expect(comp.bold).toBe(true);
});

test('parse empty text input', () => {
  const parser = new TextParser();
  const comp = parser.parse('');
  expect((comp as ITextComponent).text).toBe('');
});

test('parse boolean bolean input', () => {
  const parser = new TextParser();
  let comp = parser.parse(true);
  expect((comp as ITextComponent).text).toBe('true');

  comp = parser.parse(false);
  expect((comp as ITextComponent).text).toBe('false');
});

test('parse number number input', () => {
  const parser = new TextParser();
  let comp = parser.parse(5);
  expect((comp as ITextComponent).text).toBe('5');

  comp = parser.parse(5.5);
  expect((comp as ITextComponent).text).toBe('5.5');

  comp = parser.parse(1.9e10);
  expect((comp as ITextComponent).text).toBe('19000000000');
});

test('parse null input', () => {
  const parser = new TextParser();
  let comp = parser.parse(null);
  expect((comp as ITextComponent).text).toBe('');

  comp = parser.parse(undefined);
  expect((comp as ITextComponent).text).toBe('');
});

test('can print', () => {
  const printer = new TextPrinter();
  const comp: ITextComponent = {
    text: 'Test',
  };
  expect(printer.canPrint(comp)).toBe(true);
});

test('can not print', () => {
  const printer = new TextPrinter();
  const comp: IComponent = {};
  expect(printer.canPrint(comp)).toBe(false);
});
