import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import {
  type ChangeEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Else, If, Then } from 'react-if';

import { getThemeColorFromTypographyColor } from '../../../utils/color';
import styles from './EditableTypography.styles';
import type { EditableTypographyProps } from './EditableTypography.types';

export default function EditableTypography({
  color,
  fullWidth = true,
  multiline = true,
  onBlur,
  onChange,
  textFieldProps,
  value: defaultValue,
  variant,
  ...props
}: EditableTypographyProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const textFieldColor = color ? getThemeColorFromTypographyColor(color) : 'inherit';

  const handleBlur = useCallback(() => {
    setIsEditing(false);
    if (onBlur) {
      onBlur(value);
    }
  }, [onBlur, value]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    if (onChange) {
      onChange(event.target.value);
    }
  }, [onChange]);

  const handleClick = useCallback(() => {
    if (!props.disabled) {
      setIsEditing(true);
    }
  }, [props.disabled]);

  return (
    <If condition={isEditing}>
      <Then>
        <TextField
          fullWidth={fullWidth}
          multiline={multiline}
          variant="standard"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...textFieldProps}
          autoFocus
          onBlur={handleBlur}
          onChange={handleChange}
          sx={styles.textField(
            props.sx,
            textFieldProps?.sx,
            textFieldColor,
            variant,
          ) as TextFieldProps['sx']}
          value={value}
        />
      </Then>

      <Else>
        <Typography
          color={color}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          onClick={handleClick}
          variant={variant}
        >
          {defaultValue}
        </Typography>
      </Else>
    </If>
  );
}
