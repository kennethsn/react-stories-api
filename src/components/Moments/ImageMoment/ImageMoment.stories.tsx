import { FC } from 'react';

import StoriesAPIProvider from '../../../providers/StoriesAPIProvider';
import StoryProvider from '../../../providers/StoryProvider';
import baseStoryData from '../../../tests/fixtures/story-primitive.json';
import ImageMoment from './ImageMoment';
// KSN TODO: wrap storybook container into its own component
const storyData = {
  ...baseStoryData,
};
const squareImageUrl = 'https://www.womenshistory.org/sites/default/files/styles/main_image/public/images/2018-07/Hopper-3%20square.jpg?itok=YOyaM_zT';
const tallImageUrl = 'http://commons.wikimedia.org/wiki/Special:FilePath/Commodore%20Grace%20M.%20Hopper%2C%20USN%20%28covered%29.jpg';
const wideImageUrl = 'http://iiif.ss.ksn.io/iiif/2/NMAH-AC0324-0000033.jpg/full/full/0/default.jpg';

const imageMomentData = {
  index: 0,
  type: 'image',
  title: 'Grace Murray Hopper',
  subtitle: null,
  icon: {
    name: 'FaRegImage',
    source: 'fa',
  },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Introduction',
  reference: null,
  data: {
    caption: {
      content: 'Grace Brewster Murray Hopper (née Murray; December 9, 1906 - January 1, 1992) was an American computer scientist and United States Navy rear admiral. One of the first programmers of the Harvard Mark I computer, she was a pioneer of computer programming who invented one of the first compiler related tools. She popularized the idea of machine-independent programming languages, which led to the development of COBOL, an early high-level programming language still in use today.',
    },
    image: {
      url: wideImageUrl,
    },
  },
};

export default {
  args: {
    moment: imageMomentData,
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
    'moment.data.image.fit': {
      control: 'inline-radio',
      name: 'Image Fit',
      options: ['card', 'cover', 'full'],
      table: {
        defaultValue: { summary: 'card' },
      },
    },
    'moment.data.image.size': {
      control: {
        min: 1,
        max: 12,
        step: 1,
        type: 'number',
      },
      name: 'Image Size',
    },
    'moment.data.image.url': {
      control: {
        labels: {
          [squareImageUrl]: 'Grace Hopper (square image)',
          [tallImageUrl]: 'Grace Hopper (tall image)',
          [wideImageUrl]: 'Grace Hopper (wide image)',
        },
        type: 'select',

      },
      name: 'Image URL',
      options: [tallImageUrl, squareImageUrl, wideImageUrl],

    },
  },
  component: ImageMoment,
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
  title: 'Moments/Image Moment',
};

export const DefaultImageMoment = {
};

export const CardImage = {
  args: {
    'moment.data.caption.content': '',
    'moment.data.image.fit': 'card',
    'moment.data.image.url': wideImageUrl,
  },
};

export const CardImageWithBottomFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'bottom',
    'moment.data.image.fit': 'card',
    'moment.data.image.url': wideImageUrl,
  },
};

export const CardImageWithLeftFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'left',
    'moment.data.image.fit': 'card',
    'moment.data.image.size': 5,
    'moment.data.image.url': squareImageUrl,
  },
};

export const CardImageWithRightFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'right',
    'moment.data.image.fit': 'card',
    'moment.data.image.size': 5,
    'moment.data.image.url': squareImageUrl,
  },
};

export const CardImageWithTopFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'top',
    'moment.data.image.fit': 'card',
    'moment.data.image.url': wideImageUrl,
  },
};

export const CoverImage = {
  args: {
    'moment.data.caption.content': '',
    'moment.data.image.fit': 'cover',
    'moment.data.image.url': wideImageUrl,
  },
};

export const CoverImageWithBottomFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'bottom',
    'moment.data.image.fit': 'cover',
    'moment.data.image.size': 8,
    'moment.data.image.url': wideImageUrl,
  },
};

export const CoverImageWithLeftFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'left',
    'moment.data.image.fit': 'cover',
    'moment.data.image.size': 8,
    'moment.data.image.url': wideImageUrl,
  },
};

export const CoverImageWithRightFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'right',
    'moment.data.image.fit': 'cover',
    'moment.data.image.size': 8,
    'moment.data.image.url': wideImageUrl,
  },
};

export const CoverImageWithTopFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'top',
    'moment.data.image.fit': 'cover',
    'moment.data.image.size': 6,
    'moment.data.image.url': wideImageUrl,
  },
};

export const FullImage = {
  args: {
    'moment.data.caption.content': '',
    'moment.data.image.fit': 'full',
    'moment.data.image.url': wideImageUrl,
  },
};

export const FullImageWithBottomFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'bottom',
    'moment.data.image.fit': 'full',
    'moment.data.image.url': wideImageUrl,
  },
};
export const FullImageWithLeftFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'left',
    'moment.data.image.fit': 'full',
    'moment.data.image.url': wideImageUrl,
  },
};

export const FullImageWithRightFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'right',
    'moment.data.image.fit': 'full',
    'moment.data.image.size': 6,
    'moment.data.image.url': wideImageUrl,
  },
};

export const FullImageWithTopFullWidthCaption = {
  args: {
    'moment.data.caption.fit': 'full-width',
    'moment.data.caption.position': 'top',
    'moment.data.image.fit': 'full',
    'moment.data.image.url': wideImageUrl,
  },
};
