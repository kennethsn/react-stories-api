import type { SerializeableValue } from '../../../types';
import type { EditableTypographyProps } from '../EditableTypography/EditableTypography.types';

export type BoundTypographyProps<Keys extends string=string> =
  Omit<EditableTypographyProps, 'value'> & {
    readonly field: Keys;
    readonly store: {
      readonly getField: (field: Keys) => SerializeableValue | undefined;
      readonly isEditable: boolean;
      readonly updateField: (field: Keys, value: string) => void;
    };
  };
