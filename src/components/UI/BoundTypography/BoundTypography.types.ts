import type { EditableTypographyProps } from '../EditableTypography/EditableTypography.types';

export type BoundTypographyProps<Keys extends string=string> =
  Omit<EditableTypographyProps, 'children'> & {
    readonly field: Keys;
    readonly store: {
      readonly getField: (field: Keys) => string;
      readonly isEditable: boolean;
      readonly resetKey: number;
      readonly updateField: (field: Keys, value: string) => void;
    };
  };
