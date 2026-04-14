# ellipsis-truncate

Truncate text with ellipsis — by characters, bytes, or words.

Comes with built-in ellipsis presets and a factory for reusable truncators.

## Installation

```bash
npm install ellipsis-truncate
```

## Usage

```js
import { truncateByChar, truncateByByte, truncateByWord, createTruncator, ELLIPSIS } from 'ellipsis-truncate';
```

---

### `truncateByChar(text, maxLength, ellipsis?)`

Truncates by character count.

```js
truncateByChar('Hello, world!', 5);                        // 'Hello...'
truncateByChar('Hello, world!', 5, ELLIPSIS.UNICODE);      // 'Hello…'
truncateByChar('Hello, world!', 5, ELLIPSIS.ARROW);        // 'Hello>>'
truncateByChar('안녕하세요', 3);                             // '안녕하...'
```

### `truncateByByte(text, maxBytes, ellipsis?)`

Truncates by byte size. Multibyte characters (Korean, emoji, etc.) are never cut mid-character.

```js
truncateByByte('안녕하세요', 9);                            // '안녕하...'  (Korean = 3 bytes/char)
truncateByByte('안녕하세요', 9, ELLIPSIS.UNICODE);          // '안녕하…'
```

### `truncateByWord(text, maxLength, ellipsis?)`

Truncates at word boundaries — never cuts a word in half.

```js
truncateByWord('Hello world foo bar', 12);                 // 'Hello world...'
truncateByWord('Hello world foo bar', 12, ELLIPSIS.ARROW); // 'Hello world>>'
truncateByWord('Hello world foo bar', 7, ELLIPSIS.BRACKET);// 'Hello[...]'
```

---

### `ELLIPSIS` presets

Ready-to-use ellipsis constants — no need to hardcode strings.

```js
import { ELLIPSIS } from 'ellipsis-truncate';

ELLIPSIS.DOT     // '...'     (default)
ELLIPSIS.UNICODE // '…'       (single unicode character)
ELLIPSIS.ARROW   // '>>'
ELLIPSIS.BRACKET // '[...]'
ELLIPSIS.DASH    // '--'
ELLIPSIS.SPACE   // ' '
ELLIPSIS.EMPTY   // ''        (silent truncation)
```

---

### `createTruncator(options?)`

Bind mode and ellipsis once, reuse everywhere.

```js
const truncate = createTruncator({ mode: 'word', ellipsis: ELLIPSIS.ARROW });

truncate('Hello world foo bar', 12); // 'Hello world>>'
truncate('Another long sentence', 10); // 'Another>>'
```

```js
// Silent truncation (no ellipsis appended)
const clip = createTruncator({ mode: 'char', ellipsis: ELLIPSIS.EMPTY });
clip('Hello, world!', 5); // 'Hello'
```

#### Options

| Option     | Type                          | Default          | Description              |
|------------|-------------------------------|------------------|--------------------------|
| `mode`     | `'char' \| 'byte' \| 'word'`  | `'char'`         | Truncation strategy      |
| `ellipsis` | `string`                      | `ELLIPSIS.DOT`   | String appended after cut|

---

## API

| Parameter   | Type     | Default         | Description                     |
|-------------|----------|-----------------|---------------------------------|
| `text`      | `string` | —               | Input text                      |
| `maxLength` | `number` | —               | Max character or byte count     |
| `ellipsis`  | `string` | `ELLIPSIS.DOT`  | String appended after truncation|

## License

MIT
