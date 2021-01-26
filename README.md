# @gorymoon/minecraft-text

![GitHub package.json version](https://img.shields.io/github/package-json/v/gorymoon/minecraft-text?label=github%20version) ![npm (scoped)](https://img.shields.io/npm/v/@gorymoon/minecraft-text)
[![codecov](https://codecov.io/gh/GoryMoon/minecraft-text/branch/main/graph/badge.svg)](https://codecov.io/gh/GoryMoon/minecraft-text) ![GitHub Workflow Status](https://img.shields.io/github/workflow/status/GoryMoon/minecraft-text/Continuous%20Delivery?logo=github-actions&logoColor=ffffff) ![npm bundle size (scoped)](https://img.shields.io/bundlephobia/minzip/@gorymoon/minecraft-text)

Parser and printer for Minecraft json text

Based on the text schema from [wiki.vg][1].

## Usage

Basic usage of parsing and printing

```js
import { Converter } from 'minecraft-text';

const converter = new Converter();
const component = converter.parse('{"text": "Test", "bold": "true"}');
const html = converter.toHTML(component);
```

### Options

Default options for the `Converter` constructor

- `newline: false` If newlines should be replaced with a space for plaintext or `<br>` for html
- `useClasses: false` If using classes or inline styles in the html output
- `classPrefix: 'mc-'` The prefix to use for class html output
- `setClassSuffix:  '-set'` The suffix to use for `true` style booleans for class html output
- `unsetClassSuffix: '-unset'` The suffix to use for `false` style booleans for class html output
- `parsers` A map of parsers for specific types of components, like `ITextComponent` and `ITranslateComponent`. The key is set to the key of a json you want to support parsing for. Default a parser for the `text` type is added if not existing.
- `printers` A map of printers to check for printing components. By default a printer for `ITextComponent` is added if no other is added to the `text` key. The key is only used to override the default one.
- `styles:` The inline styles to use when printing to HTML.
  - `black: '#000000'`
  - `darkBlue: '#0000AA'`
  - `darkGreen: '#00AA00'`
  - `darkAqua: '#00AAAA'`
  - `darkRed: '#AA0000'`
  - `darkPurple: '#AA00AA'`
  - `gold: '#FFAA00'`
  - `gray: '#AAAAAA'`
  - `darkGray: '#555555'`
  - `blue: '#5555FF'`
  - `green: '#55FF55'`
  - `aqua: '#55FFFF'`
  - `red: '#FF5555'`
  - `lightPuple: '#FF55FF'`
  - `yellow: '#FFFF55'`
  - `white: '#FFFFFF'`
  - `minecoinGold: '#DDD605'`
  - `bold: 'bold'`
  - `italic: 'italic'`
  - `underlined: 'underline'`
  - `strikethrough: 'line-through'`
  - `obfuscated: ''`
- `classes:` The classes to use when printing to HTML.
  - `black: 'black'`
  - `darkBlue: 'dark-blue'`
  - `darkGreen: 'dark-green'`
  - `darkAqua: 'dark-aqua'`
  - `darkRed: 'dark-red'`
  - `darkPurple: 'dark-purple'`
  - `gold: 'gold'`
  - `gray: 'gray'`
  - `darkGray: 'dark-gray'`
  - `blue: 'blue'`
  - `green: 'green'`
  - `aqua: 'aqua'`
  - `red: 'red'`
  - `lightPuple: 'light-purple'`
  - `yellow: 'yellow'`
  - `white: 'white'`
  - `minecoinGold: 'minecoin-gold'`
  - `bold: 'bold'`
  - `italic: 'italic'`
  - `underlined: 'underlined'`
  - `strikethrough: 'strikethrough'`
  - `obfuscated: 'obfuscated'`

## License

[MIT][2]

[1]: https://wiki.vg/Chat#Schema
[2]: https://choosealicense.com/licenses/mit/