import { autorun } from 'mobx';
import { observer } from 'mobx-react-lite';
import { type PropsWithChildren, useEffect } from 'react';
import { When } from 'react-if';
import { useSearchParams } from 'react-router-dom';

import type { StoryProps } from '../components/Story/Story.types';
import StoryContext from '../contexts/StoryContext';
import useFormatters from '../hooks/useFormatters';
import useStoriesAPI from '../hooks/useStoriesAPI';
import { Moment } from '../types';

type StoryProviderProps = StoryProps & PropsWithChildren;

const StoryProvider = observer(({
  children,
  connectRouter,
  defaultMomentId,
  onChange,
  story,
  ...props
}: StoryProviderProps) => {
  const { isDebugging, stories } = useStoriesAPI();
  const formatters = useFormatters();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => autorun(() => {
    if (isDebugging) {
      // eslint-disable-next-line no-console
      console.debug('StoryProvider useEffect called');
    }
    const handleChange = (moment: Moment) => {
      if (connectRouter) {
        setSearchParams(
          { [formatters.momentQueryParamKey]: moment.id },
          { replace: true },
        );
      }
      onChange?.(moment);
    };
    const defaultActiveMomentId = (connectRouter ? (
      searchParams.get(formatters.momentQueryParamKey) ?? defaultMomentId
    ) : (
      defaultMomentId
    ));
    stories.loadStory({
      connectRouter,
      defaultMomentId: defaultActiveMomentId,
      onChange: handleChange,
      story,
      ...props,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [
    onChange,
    props.editable,
    story,
  ]);
  const store = stories.getStory(story.id);
  return (
    <When condition={!!store}>
      <StoryContext.Provider value={store!}>
        {children}
      </StoryContext.Provider>
    </When>
  );
});

export default StoryProvider;
