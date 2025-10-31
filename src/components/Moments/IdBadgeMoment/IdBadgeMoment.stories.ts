import { momentStoryBookDecorator } from '../../../stories/decorators';
import IdBadgeMoment from './IdBadgeMoment';

const momentData = {
  index: 0,
  type: 'idBadge',
  title: 'ID Badge Moment Example',
  subtitle: 'Employment History',
  icon: { name: 'badge', type: 'mui' },
  color: { background: '#4a90e2', text: '#ffffff' },
  label: 'Badges',
  data: {
    badges: [
      {
        backgroundImage: { url: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Aerial_view_of_Apple_Park_dllu.jpg', alt: 'Apple HQ' },
        logo: { url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg', alt: 'Apple Logo' },
        content: {
          blocks: [
            { type: 'TEXT', text: 'Software Engineer', id: 'c1' },
            { type: 'TEXT', text: 'Start: Jan 2021 – End: Present', id: 'c2' },
          ],
          caption: {
            blocks: [
              { type: 'TEXT', text: 'Apple Inc.', id: 'company-name' },
              { type: 'TEXT', text: 'Innovative tech company', id: 'company-desc' },
              { type: 'BUTTON', button: { label: 'Learn More', url: 'https://apple.com' } },
            ],
          },
        },
      },
      {
        backgroundImage: { url: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/Aerial_Microsoft_West_Campus_August_2009.jpg', alt: 'Microsoft HQ' },
        logo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
          alt: 'Microsoft Logo',
        },
        content: {
          blocks: [
            { type: 'TEXT', text: 'Product Manager', id: 'c3' },
            { type: 'TEXT', text: 'Start: Mar 2018 – End: Dec 2020', id: 'c4' },
          ],
          caption: {
            blocks: [
              { type: 'TEXT', text: 'Microsoft', id: 'company-name' },
              { type: 'TEXT', text: 'Empowering every person and organization on the planet to achieve more', id: 'company-desc' },
              { type: 'BUTTON', button: { label: 'Learn More', url: 'https://microsoft.com' } },
            ],
          },
        },
      },
      {
        logo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
          alt: 'Google Logo',
        },
        content: {
          blocks: [
            { type: 'TEXT', text: 'UX Designer', id: 'c5' },
            { type: 'TEXT', text: 'Start: Feb 2016 – End: Feb 2018', id: 'c6' },
          ],
          caption: {
            blocks: [
              { type: 'TEXT', text: 'Google', id: 'company-name' },
              { type: 'TEXT', text: 'Organizing the world’s information and making it universally accessible.', id: 'company-desc' },
              { type: 'BUTTON', button: { label: 'Learn More', url: 'https://google.com' } },
            ],
          },
        },
      },
      {
        logo: {
          url: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png',
          alt: 'Meta Logo',
        },
        content: {
          blocks: [
            { type: 'TEXT', text: 'Data Scientist', id: 'c7' },
            { type: 'TEXT', text: 'Start: May 2014 – End: Jan 2016', id: 'c8' },
          ],
          caption: {
            blocks: [
              { type: 'TEXT', text: 'Meta (Facebook)', id: 'company-name' },
              { type: 'TEXT', text: 'Building technologies that help people connect, find communities, and grow businesses.', id: 'company-desc' },
              { type: 'BUTTON', button: { label: 'Learn More', url: 'https://meta.com' } },
            ],
          },
        },
      },
    ],
    layout: 'zigzag',
  },
};

export default {
  title: 'Moments/IdBadge Moment',
  component: IdBadgeMoment,
  decorators: [momentStoryBookDecorator],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const DefaultIdBadgeMoment = {
  name: 'Default ID Badge',
  args: {
    moment: momentData,
  },
};
