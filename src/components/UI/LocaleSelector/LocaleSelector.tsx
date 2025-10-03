import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { type SelectProps } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import useLocale from '../../../hooks/useLocale';
import styles from './LocaleSelector.styles';

const LocaleSelector = observer(() => {
  const { locale, t } = useLocale();

  const handleChange: SelectProps['onChange'] = (event) => {
    locale.setLocale(event.target.value as string);
  };

  return (
    <Box sx={styles.root}>
      <Select
        color="primary"
        onChange={handleChange}
        value={locale.currentLocale}
        variant="standard"
      >
        {locale.supportedLanguages.map(({
          locale: langLocale,
          label,
          nativeLabel,
        }) => (
          <MenuItem key={langLocale} value={langLocale}>
            {nativeLabel ?? langLocale}

            {label ? ` - ${label}` : ''}
          </MenuItem>
        ))}
      </Select>

      <Typography
        sx={styles.welcomeText}
        variant="body2"
      >
        {t('welcome')}
      </Typography>
    </Box>
  );
});

export default LocaleSelector;
