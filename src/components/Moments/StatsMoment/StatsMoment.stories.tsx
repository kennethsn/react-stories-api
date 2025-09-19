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
        color: { background: '#1c8676' },
        description: 'This is a description on how wide the sculpture is',
        image:
          'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Thinker%2C_Rodin.jpg/220px-The_Thinker%2C_Rodin.jpg',
        label: 'width',
        type: 'number',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: '97 cm',
      },
      {
        color: { background: '#867a1c' },
        description: 'This is a description on how tall the sculpture is',
        icon: { name: 'height', type: 'mui' },
        label: 'height',
        type: 'number',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: '183.6 cm',
      },
      {
        color: { background: '#821c86' },
        description: 'This is a description on how thick the sculpture is',
        label: 'thickness',
        type: 'number',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: '148 cm',
      },
      {
        color: { background: '#355199' },
        icon: { name: 'construction', type: 'mui' },
        label: 'Materials Used',
        type: 'list',
        url: 'https://www.wikidata.org/wiki/Q18003128',
        value: 'bronze, wrought iron, wood, other',
      },
      {
        color: { background: '#9c5961' },
        description: 'This is a description on when the sculpture was created',
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
