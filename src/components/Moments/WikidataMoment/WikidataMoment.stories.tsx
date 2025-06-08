import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'wikidata',
  title: 'Lewis Carroll',
  subtitle: null,
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: null,
  },
  label: 'Wikidata Example',
  reference: null,
  data: {
    caption: {
      content: 'Embeddable URL generated with an entity ID/QID',
    },
    entity_id: 'Q38082',
  },
};

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
    'moment.data.entity_id': {
      control: 'text',
      name: 'Wikidata entity ID',
    },
  },
  decorators: [
    momentStoryBookDecorator,
  ],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/Wikidata Moment',
};

export const DefaultWikiMoment = {
  name: 'Default Wikidata',
};

export const CardWiki = {
  args: {
    'moment.data.caption.content': 'This example demonstrates using a QID from Wikidata.',
    'moment.data.caption.position': 'left',
    'moment.data.entity_id': 'Q38082',
  },
  name: 'Card Wikidata',
};
