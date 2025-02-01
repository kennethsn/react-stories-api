import { observer } from 'mobx-react-lite';

import { cleanInputValue } from '../../../utils/string';
import EditableTypography from '../EditableTypography/EditableTypography';
import type { BoundTypographyProps } from './BoundTypography.types';

const BoundTypography = observer(<T extends string>({
  disabled,
  field,
  store,
  ...props
}: BoundTypographyProps<T>) => {
  const handleBlur = (value: string) => {
    const cleanedValue = cleanInputValue(value, store.getField(field));
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
      value={store.getField(field)}
    />
  );
});

export default BoundTypography;
