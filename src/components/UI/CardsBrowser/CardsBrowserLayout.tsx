/* eslint-disable react/jsx-props-no-spreading */
import Grid from '@mui/material/Grid2';
import { Case, Switch } from 'react-if';

import type { CardsBrowserProps } from './CardsBrowser.types';
import ToolCardsBrowserLayout from './ToolCardsBrowserLayout';

export default function CardsBrowserLayout({
  children,
  layout,
  ...props
}: CardsBrowserProps) {
  return (
    <Grid container>
      <Switch>
        <Case condition={layout === 'minimal'}>
          {children}
        </Case>

        <Case condition={layout === 'standard'}>
          {children}
        </Case>

        <Case condition={layout === 'tool'}>
          <ToolCardsBrowserLayout {...props}>
            {children}
          </ToolCardsBrowserLayout>
        </Case>
      </Switch>
    </Grid>
  );
}
