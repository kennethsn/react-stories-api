import LanguageIcon from '@mui/icons-material/Language';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';

import useLocale from '../../../hooks/useLocale';
import LocaleSelector from '../LocaleSelector/LocaleSelector';
import MenuActionButton from '../MenuActionButton/MenuActionButton';
import styles from './LocaleActionButton.styles';
import type { LocaleActionButtonProps } from './LocaleActionButton.types';

const LocaleActionButton = observer((props: LocaleActionButtonProps) => {
  const { t } = useLocale();

  return (
    <MenuActionButton
      icon={LanguageIcon}
      size="small"
      stopPropagation
      title={t('select_language') ?? 'Select Language'}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <Box sx={styles.menu}>
        <Typography
          gutterBottom
          sx={styles.actionLabel}
          variant="overline"
        >
          {t('select_language')}
        </Typography>

        <LocaleSelector />
      </Box>
    </MenuActionButton>
  );
});

export default LocaleActionButton;
