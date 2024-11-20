import { FORMATTER_TEMPLATE_REGEX } from '../constants';

type FormattedArrayItem = {
  key?: string;
  replaced?: string;
  value: string;
};

// Stories API Template Language is to use curly braces to interpolate values into strings.
// For example, 'Welcome to the {storyLabel} Story'
export const formatString = (
  templateStr: string,
  values: Record<string, string | number | boolean>,
) => (
  templateStr.replace(FORMATTER_TEMPLATE_REGEX, (match, key) => values[key]?.toString() || match)
);

export const getFormattedArray = (template: string, values: Record<string, string>) => {
  const result: FormattedArrayItem[] = [];
  let lastIndex = 0;
  template.replace(FORMATTER_TEMPLATE_REGEX, (match, key, offset) => {
    if (lastIndex < offset) {
      result.push({ value: template.slice(lastIndex, offset) });
    }
    if (values[key] !== undefined) {
      result.push({ value: values[key], key, replaced: match });
    } else {
      result.push({ value: match });
    }
    lastIndex = offset + match.length;
    return match;
  });
  if (lastIndex < template.length) {
    result.push({ value: template.slice(lastIndex) });
  }
  return result;
};

export const strip = (str: string, chars = ' ') => (
  str.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '')
);
