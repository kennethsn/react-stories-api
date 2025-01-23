import { observer } from 'mobx-react-lite';

import EditableTypography from '../EditableTypography/EditableTypography';
import type { BoundTypographyProps } from './BoundTypography.types';

const BoundTypography = observer(<T extends string>({
  disabled,
  field,
  store,
  ...props
}: BoundTypographyProps<T>) => {
  const handleBlur = (value: string) => {
    const cleanedValue = value.trim();
    if (!cleanedValue || cleanedValue === store.getField(field)) {
      return;
    }
    store.updateField(field, cleanedValue);
  };
  return (
    <EditableTypography
      key={store.resetKey}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      disabled={disabled || !store.isEditable}
      onBlur={handleBlur}
    >
      {store.getField(field)}
    </EditableTypography>
  );
});

export default BoundTypography;
