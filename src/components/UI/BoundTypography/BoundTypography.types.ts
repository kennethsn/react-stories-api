import type { SerializableRecord, SerializeableValue } from '../../../types';
import type { EditableTypographyProps } from '../EditableTypography/EditableTypography.types';

export type BoundTypographyProps<Keys extends string=string> =
  Omit<EditableTypographyProps, 'value'> & {
    readonly computed?: boolean;
    readonly field: Keys;
    readonly store: {
      readonly getField: (field: Keys) => SerializeableValue | undefined;
      readonly isEditable: boolean;
      readonly typographyFormatter?: SerializableRecord;
      readonly updateField: (field: Keys, value: never, isComputed?: boolean) => void;
    };
  };
