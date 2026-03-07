import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';

import { cleanInputValue, toString } from '../../../utils/string';
import EditableTypography from '../EditableTypography/EditableTypography';
import type { BoundTypographyProps } from './BoundTypography.types';

const BoundTypography = observer(<T extends string>({
  computed,
  disabled,
  field,
  formatter,
  required,
  store,
  ...props
}: BoundTypographyProps<T>) => {
  const hasFormatter = Boolean(formatter || store.typographyFormatter);
  const mergedFormatter = hasFormatter ? {
    ...(toJS(store.typographyFormatter) || {}),
    ...(formatter || {}),
  } : undefined;
  const getValue = () => toString(computed ? store[field as never] : store.getField(field));

  const handleBlur = (value: string) => {
    const cleanedValue = cleanInputValue(value, getValue());
    if (cleanedValue === undefined || (required && !cleanedValue)) {
      return;
    }
    store.updateField(field, cleanedValue as never, computed);
  };
  return (
    <EditableTypography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disabled={disabled || !store.isEditable}
      formatter={mergedFormatter}
      onBlur={handleBlur}
      required={required}
      value={getValue()}
    />
  );
});

export default BoundTypography;
