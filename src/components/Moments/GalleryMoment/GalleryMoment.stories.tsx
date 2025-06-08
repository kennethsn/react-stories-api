import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'gallery',
  title: 'Gallery Moment Example',
  subtitle: '30 W 44th St Cafe Table',
  icon: { name: 'gallery_thumbnail', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Gallery Eample',
  reference: null,
  data: {
    images: [
      { url: 'https://stories-api-test.s3.amazonaws.com/temp/They+Lived+at+the+Yale+Club/1887/M.+A.+Caldwell+1887/M.+A.+Caldwell+1887+--+Quarter+Century+Record+3+1912.jpg' },
      { url: 'https://stories-api-test.s3.us-east-1.amazonaws.com/temp/They+Lived+at+the+Yale+Club/1894/James+Anderson+Hawes+1894/J.+A.+Hawes+1894+--+YDN+11.2.1898.png', caption: 'From the Yale Daily News, 11.2.1898. Hawes, even four years out of college, was incredibly involved with his class. This is from a class dinner held at 17 Madison Square North' },
      { url: 'https://stories-api-test.s3.us-east-1.amazonaws.com/temp/They+Lived+at+the+Yale+Club/1894/James+Anderson+Hawes+1894/Obit+1+1936.png', caption: 'At the time of his death, Hawes was living at 50 Vanderbilt Ave. in addition to a house in Purchase, NY. He had been involved in all three clubs, living at 30 W. 44th when it was the DKE Club and at 50 Vanderbilt Avenue from 1926 to his death in 1936.' },
    ],
  },
};
export default {
  args: {
    moment: momentData,
  },
  decorators: [
    momentStoryBookDecorator,
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/Gallery Moment',
};

export const DefaultTextMoment = {
  name: 'Default Gallery',
};
