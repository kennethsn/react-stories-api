import { FORMATTER_TEMPLATE_REGEX } from '../constants';
import type { SerializeableValue } from '../types';

type FormattedArrayItem = {
  key?: string;
  replaced?: string;
  value: string;
};

export const cleanInputValue = (value: string, originalValue?: string) => {
  const cleanedValue = value.trim();
  // Clear the value
  if (!cleanedValue && originalValue) {
    return '';
  }
  // No change
  if (!cleanedValue || (originalValue && cleanedValue === originalValue)) {
    return undefined;
  }
  return cleanedValue;
};

// Stories API Template Language is to use curly braces to interpolate values into strings.
// For example, 'Welcome to the {story_label} Story'
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

export const getFormattedStringValue = (
  formattedString: string,
  template: string,
  key: string,
) => {
  const valueMap = getFormattedStringValues(formattedString, template);
  return valueMap[key];
};

export const getFormattedStringValues = (
  formattedString: string,
  template: string,
): { [key: string]: string } => {
  // Create a regular expression from the template with {key} placeholders
  const regex = new RegExp(
    template.replace(/{([^}]+)}/g, '(?<$1>[^,]+)'),
  );
  // Match the formattedString against the regular expression
  const match = formattedString.match(regex);
  if (!match) {
    return {};
  }
  const result: { [key: string]: string } = {};
  Object.keys(match.groups!).forEach((key) => {
    result[key] = match.groups![key].trim();
  });

  return result;
};

export const randomString = (length = 8, prefix = '') => {
  const chars = 'BCDFGHJKLMNPQRSTVWXYZbcdfghjklmnpqrstvwxyz0123456789';
  let result = prefix;
  for (let i = 0; i < length; i += 1) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const strip = (str: string, chars = ' ') => (
  str.replace(new RegExp(`^[${chars}]+|[${chars}]+$`, 'g'), '')
);

export const toKebabCase = (str: string) => str
  .replace(/([a-z])([A-Z])/g, '$1-$2')
  .replace(/\s+/g, '-')
  .toLowerCase();

export const toString = (value: SerializeableValue | undefined) => {
  if (value === null || value === undefined || value === false) {
    return '';
  }
  return value.toString();
};
