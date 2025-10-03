import { momentStoryBookDecorator } from '../../../stories/decorators';
import StatsMoment from './StatsMoment';

const momentData = {
  index: 0,
  type: 'stats',
  title: 'The Thinker',
  subtitle: 'Sculpture by Auguste Rodin',
  icon: { name: 'bar_chart', type: 'mui' },
  color: { type: 'hex', background: '#41aa8d', text: '#fff' },
  label: 'Stats',
  reference: {
    title: 'Wikidata',
    url: 'https://www.wikidata.org/wiki/Q18003128',
    description:
      'Free knowledge database project hosted by Wikimedia and edited by volunteers',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg',
  },
  data: {
    stats: [
      {
        color: { background: '#867a1c' },
        icon: { name: 'fit_width', type: 'mui' },
        // image:
        //   'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Thinker%2C_Rodin.jpg/220px-The_Thinker%2C_Rodin.jpg',
        label: 'width',
        type: 'number',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: { amount: 97, unit: 'cm' },
      },
      {
        color: { background: '#867a1c' },
        icon: { name: 'height', type: 'mui' },
        label: 'height',
        type: 'number',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: { amount: 183.6, unit: 'cm' },
      },
      {
        color: { background: '#867a1c' },
        icon: { name: 'inventory', type: 'mui' },
        label: 'Materials Used',
        type: 'list',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: [
          {
            label: 'Bronze',
            description: 'A strong and durable metal commonly used in sculptures',
            icon: {
              name: 'deployed_code',
              type: 'mui',
            },
          },
          {
            label: 'Wrought Iron',
            description: 'A type of iron with fibrous texture, ideal for structural elements',
            icon: {
              name: 'deployed_code',
              type: 'mui',
            },
          },
          {
            label: 'Wood',
            description: 'Natural material used for the sculpture base or supports',
            icon: {
              name: 'deployed_code',
              type: 'mui',
            },
          },
        ],
      },
      {
        color: { background: '#867a1c' },
        icon: { name: 'construction', type: 'mui' },
        label: 'created',
        type: 'string',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: '1904',
      },
    ],
  },
};

export default {
  title: 'Moments/Stats Moment',
  component: StatsMoment,
  decorators: [momentStoryBookDecorator],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const DefaultStatsMoment = {
  name: 'Default Stats',
  args: {
    moment: momentData,
  },
};
