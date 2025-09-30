import { momentStoryBookDecorator } from '../../../stories/decorators';

const momentData = {
  index: 0,
  type: 'library',
  title: 'Library Moment Example',
  subtitle: null,
  icon: { name: 'book_2', type: 'mui' },
  color: {
    type: 'hex',
    background: '#7dbbb1',
    text: '#757575',
  },
  label: 'Library Example',
  reference: null,
  data: {
    shelves: {
      featured: {
        title: 'Featured Books',
        graphic: {
          url: 'https://stage.stories.k2.services/static/graphic/shelves/metal.png',
        },
        items: [
          {
            author: 'David W. Blight',
            description: 'A comprehensive look at how slavery and resistance to it have shaped Yale University',
            id: 'book-1',
            subtitle: 'A History',
            title: 'Yale and Slavery',
            url: 'https://yalebooks.yale.edu/book/9780300273847/yale-and-slavery/',
          },
          {
            author: 'David Alan Richards',
            description: 'The mysterious, highly influential hidden world of Yale’s secret societies is revealed in a definitive and scholarly history.',
            id: 'book-2',
            subtitle: "The Hidden History of Yale's Secret Societies",
            title: 'Skulls and Keys',
          },
        ],
      },
      recent: {
        title: 'Recently Added',
        graphic: {
          url: 'https://stage.stories.k2.services/static/graphic/shelves/metal.png',
        },
        items: [
          {
            author: 'Brooks Mather Kelley',
            description: 'This lively history of Yale traces the development of the college from its founding in 1701 by a small group of Puritan clergymen.',
            id: 'book-3',
            title: 'Yale, A History',
          },
          {
            author: 'George W. Pierson',
            description: 'A concise institutional history published in 1976 for Yale’s bicentennial.',
            id: 'book-4',
            title: 'Yale: A Short History',
          },
          {
            author: 'David Alan Richards',
            description: 'Chronicles the history of Yale University Library from 1656 to 2022.',
            id: 'book-5',
            title: 'I Give These Books',
          },
          {
            author: 'Patrick L. Pinnell',
            description: 'An engaging architectural guide to Yale’s historic buildings with photos and maps.',
            id: 'book-6',
            title: 'Yale University: An Architectural Tour',
          },
          {
            author: 'Anthony T. Kronman',
            contribution: 'Yale Law School Professor',
            description: 'A philosophical theology exploring law, life, and belief.',
            id: 'book-7',
            title: 'Confessions of a Born‑Again Pagan',
          },
        ],
      },
    },
  },
};

export default {
  args: {
    moment: momentData,
  },
  argTypes: {
    'moment.data.content': {
      control: 'text',
      name: 'Library Content',
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
  title: 'Moments/Library Moment',
};

export const DefaultLibraryMoment = {
  name: 'Default Library',
};
