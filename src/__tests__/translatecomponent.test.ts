import { ITranslateComponent } from '../translate/translateComponent';
import { TranslateParser } from '../translate/translateParser';

test('Create new component', () => {
  const comp: ITranslateComponent = {
    translate: 'test.test',
  };
  expect(comp.translate).toBe('test.test');
  expect(comp.with).toBe(undefined);
});

test('Create new component with replacement value', () => {
  const comp: ITranslateComponent = {
    translate: 'test.test',
    with: ['Data'],
  };
  expect(comp.translate).toBe('test.test');
  expect(comp.with).toEqual(['Data']);
});

test('Create new component with base values', () => {
  const comp: ITranslateComponent = {
    translate: 'test.test',
    bold: true,
  };
  expect(comp.translate).toBe('test.test');
  expect(comp.bold).toBe(true);
});

test('Parse translate component', () => {
  const parser = new TranslateParser();

  const comp = parser.parse({
    translate: 'test.test',
    bold: true,
  });
  expect((comp as ITranslateComponent).translate).toBe('test.test');
  expect((comp as ITranslateComponent).with).toBe(undefined);
  expect(comp.bold).toBe(true);
});

test('Parse translate component with replacement value', () => {
  const parser = new TranslateParser();

  const comp = parser.parse({
    translate: 'test.test',
    with: ['Data'],
    bold: true,
  });
  expect((comp as ITranslateComponent).translate).toBe('test.test');
  expect((comp as ITranslateComponent).with).toEqual(['Data']);
  expect(comp.bold).toBe(true);
});

test('Parse empty text input', () => {
  const parser = new TranslateParser();
  const comp = parser.parse('');
  expect((comp as ITranslateComponent).translate).toBe('');
  expect((comp as ITranslateComponent).with).toBe(undefined);
});
