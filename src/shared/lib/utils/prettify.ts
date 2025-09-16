import beautify from 'js-beautify';

export function prettify(value: string, language: string) {
  let formatted = value;

  switch (language) {
    case 'json':
      formatted = beautify(value, {
        indent_size: 2,
        indent_char: ' ',
        indent_with_tabs: false,
      });
      break;
    case 'xml':
      formatted = beautify.html(value, {
        indent_size: 2,
        indent_char: ' ',
        indent_with_tabs: false,
      });
      break;
    default:
      formatted = value;
  }

  return formatted;
}
