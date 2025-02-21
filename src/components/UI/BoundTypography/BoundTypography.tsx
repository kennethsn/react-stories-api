import { observer } from 'mobx-react-lite';

import { cleanInputValue, toString } from '../../../utils/string';
import EditableTypography from '../EditableTypography/EditableTypography';
import type { BoundTypographyProps } from './BoundTypography.types';

const BoundTypography = observer(<T extends string>({
  disabled,
  field,
  store,
  ...props
}: BoundTypographyProps<T>) => {
  const getValue = () => toString(store.getField(field));

  const handleBlur = (value: string) => {
    const cleanedValue = cleanInputValue(value, getValue());
    if (cleanedValue) {
      store.updateField(field, cleanedValue);
    }
  };
  return (
    <EditableTypography
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disabled={disabled || !store.isEditable}
      onBlur={handleBlur}
      value={getValue()}
    />
  );
});

export default BoundTypography;
