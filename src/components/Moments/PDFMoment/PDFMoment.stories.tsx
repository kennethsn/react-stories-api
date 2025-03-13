import { storyStoryBookDecorator } from '../../../stories/decorators';
import PDFMoment from './PDFMoment';

const momentData = {
  index: 0,
  type: 'pdf',
  title: 'Marrion Wilcox - The Architectural Record',
  subtitle: null,
  icon: { name: 'picture_as_pdf', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: '#757575',
  },
  label: 'PDF Example',
  reference: null,
  data: {
    caption: {
      content: 'The Architectural Record featured writing by Marrion Wilcox',
      position: 'top',
    },
    fit: 'cover',
    size: 8,
    url: 'https://stories-api-test.s3.us-east-1.amazonaws.com/temp/They+Lived+at+the+Yale+Club/Marrion+Wilcox+1878/Marrion+Wilcox+--+The+Architectural+Record.pdf',
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
    'moment.data.url': {
      control: 'text',
      name: 'PDF URL',
    },
  },
  component: PDFMoment,
  decorators: [
    storyStoryBookDecorator(),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  title: 'Moments/PDF Moment',
};

export const DefaultPDFMoment = {
  name: 'Default PDF',
};

export const CardPDF = {
  args: {
    'moment.data.caption.content': 'View this PDF to read an article by Marrion Wilcox about the Yale Club.',
    'moment.data.caption.position': 'top',
    'moment.data.url': 'https://stories-api-test.s3.us-east-1.amazonaws.com/temp/They+Lived+at+the+Yale+Club/Marrion+Wilcox+1878/Marrion+Wilcox+--+The+Architectural+Record.pdf',
  },
  name: 'Card PDF',
};
