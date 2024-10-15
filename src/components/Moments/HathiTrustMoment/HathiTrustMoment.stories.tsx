import { FC } from 'react';

import { HATHI_TRUST_LOGO_URL } from '../../../constants';
import StoriesAPIProvider from '../../../providers/StoriesAPIProvider';
import StoryProvider from '../../../providers/StoryProvider';
import baseStoryData from '../../../tests/fixtures/story-primitive.json';
import HathiTrustMoment from './HathiTrustMoment';
// KSN TODO: wrap storybook container into its own component
const storyData = {
  ...baseStoryData,
};

const momentData = {
  index: 0,
  type: 'hathiTrust',
  title: 'Harpers Bazar',
  subtitle: null,
  icon: { name: 'HathiTrust', type: 'image', url: HATHI_TRUST_LOGO_URL },
  color: {
    type: 'hex',
    background: '#c35400',
    text: null,
  },
  label: 'Harpers Bazaar v.42 1908',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL with Caption',
    },
    url: 'https://babel.hathitrust.org/cgi/pt?id=chi.20580201&seq=1174',
  },
};
// TODO: Abstract out argtyps below
export default {
  args: {
    moment: momentData,
  },
  argTypes: {
    'moment.data.caption.content': {
      control: 'text',
      name: 'Caption Content',
    },
    'moment.data.caption.fit': {
      control: 'inline-radio',
      name: 'Caption Fit',
      options: ['card', 'full-width'],
      table: {
        defaultValue: { summary: 'full-width' },
      },
    },
    'moment.data.caption.position': {
      control: 'inline-radio',
      name: 'Caption Position',
      options: ['bottom', 'left', 'right', 'top'],
      table: {
        defaultValue: { summary: 'bottom' },
      },
    },
    'moment.data.fit': {
      control: 'inline-radio',
      name: 'iframe Fit',
      options: ['card', 'cover', 'full'],
      table: {
        defaultValue: { summary: 'card' },
      },
    },
    'moment.data.size': {
      control: {
        min: 1,
        max: 12,
        step: 1,
        type: 'number',
      },
      name: 'iframe Size',
    },
    'moment.data.url': {
      name: 'Embed URL',
    },
  },
  component: HathiTrustMoment,
  decorators: [
    (StorybookStory: FC) => (
      <div style={{ border: '1px solid #e5e5e5', height: '80vh', width: '100%' }}>
        <StoriesAPIProvider>
          <StoryProvider story={storyData}>
            <StorybookStory />
          </StoryProvider>
        </StoriesAPIProvider>
      </div>
    ),
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/HathiTrust Moment',
};

export const DefaultHathiTrustMoment = {
  name: 'Default HathiTrust',
};

export const CardHathiTrust = {
  args: {
    'moment.data.caption.content': 'Harpers Bazar brought to you by HathiTrust',
    'moment.data.caption.position': 'left',
    'moment.data.fit': 'card',
    'moment.data.size': 8,
  },
  name: 'Card iFrame',
};
