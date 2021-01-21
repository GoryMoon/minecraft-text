import { BaseComponent } from '..';

test('Empty base component', () => {
  const comp = new BaseComponent({});
  expect(comp.bold).toBe(undefined);
  expect(comp.italic).toBe(undefined);
  expect(comp.underlined).toBe(undefined);
  expect(comp.strikethrough).toBe(undefined);
  expect(comp.obfuscated).toBe(undefined);
  expect(comp.color).toBe(undefined);
  expect(comp.insertion).toBe('');
  expect(comp.extra).toStrictEqual([]);
});

test('Set base component', () => {
  const comp = new BaseComponent({
    bold: false,
    italic: false,
    underlined: false,
    strikethrough: false,
    obfuscated: false,
    color: 'black',
    insertion: 'something',
    extra: [
      {
        bold: false,
      },
    ],
  });
  expect(comp.bold).toBe(false);
  expect(comp.italic).toBe(false);
  expect(comp.underlined).toBe(false);
  expect(comp.strikethrough).toBe(false);
  expect(comp.obfuscated).toBe(false);
  expect(comp.color).toBe('black');
  expect(comp.insertion).toBe('something');
  expect(comp.extra).toStrictEqual([
    {
      bold: false,
    },
  ]);
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
