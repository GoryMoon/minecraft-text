import { BaseComponent } from '../index';

test('Empty base component', () => {
  const comp = new BaseComponent({});
  expect(comp.bold).toBe(false);
  expect(comp.italic).toBe(false);
  expect(comp.underlined).toBe(false);
  expect(comp.strikethrough).toBe(false);
  expect(comp.obfuscated).toBe(false);
  expect(comp.color).toBe('white');
  expect(comp.insertion).toBe('');
  expect(comp.extra).toStrictEqual([]);
});

test('Set base component', () => {
  const comp = new BaseComponent({
    bold: true,
    italic: true,
    underlined: true,
    strikethrough: true,
    obfuscated: true,
    color: 'black',
    insertion: 'something',
    extra: [
      {
        bold: true,
      },
    ],
  });
  expect(comp.bold).toBe(true);
  expect(comp.italic).toBe(true);
  expect(comp.underlined).toBe(true);
  expect(comp.strikethrough).toBe(true);
  expect(comp.obfuscated).toBe(true);
  expect(comp.color).toBe('black');
  expect(comp.insertion).toBe('something');
  expect(comp.extra).toStrictEqual([
    {
      bold: true,
    },
  ]);
});
