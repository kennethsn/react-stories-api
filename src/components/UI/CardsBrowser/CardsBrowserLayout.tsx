/* eslint-disable react/jsx-props-no-spreading */
import Grid from '@mui/material/Grid2';
import { Case, Switch } from 'react-if';

import type { CardsBrowserProps } from './CardsBrowser.types';
import ToolCardsBrowserLayout from './ToolCardsBrowserLayout';

export default function CardsBrowserLayout({
  layout,
  ...props
}: CardsBrowserProps) {
  return (
    <Grid container>
      <Switch>
        <Case condition={layout === 'tool'}>
          <ToolCardsBrowserLayout {...props} />
        </Case>
      </Switch>
    </Grid>
  );
}
