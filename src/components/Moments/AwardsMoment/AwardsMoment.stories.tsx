import { momentStoryBookDecorator } from '../../../stories/decorators';
import AwardsMoment from './AwardsMoment';

const momentData = {
  index: 0,
  type: 'awards',
  title: 'Awards Moment Example',
  subtitle: 'Celebrating Achievements',
  icon: { name: 'trophy', type: 'mui' },
  color: { type: 'hex', background: '#7dbbb1', text: '#ffffff' },
  label: 'Awards',
  reference: null,
  data: {
    awards: [
      {
        color: { dark: '#004d40', light: '#26a69a' },
        icon: { name: 'FaLightbulb', source: 'FontAwesome' },
        description: 'Awarded for outstanding innovation in product design.',
        conferred_by: {
          label: 'Innovation Council',
          title: 'Innovation Council',
          description: 'Leading organization promoting innovation worldwide.',
        },
        recipient: 'Luca Giovanni',
        subtitle: 'Innovation in Tech',
        title: 'Best Innovator 2023',
        year: '2023',
      },
      {
        color: { dark: '#1b2631', light: '#415a77' },
        icon: { name: 'FaHandsHelping', source: 'FontAwesome' },
        description: 'Recognized for meaningful contributions to community projects.',
        conferred_by: {
          label: 'Community Foundation',
          title: 'Community Foundation',
          description: 'Supporting local community initiatives.',
        },
        recipient: 'Luca Giovanni',
        subtitle: 'Social Good',
        title: 'Community Impact Award',
        year: '2022',
      },
      {
        color: { dark: '#2c3e50', light: '#5dade2' },
        icon: { name: 'FaMicroscope', source: 'FontAwesome' },
        description: 'Honored for groundbreaking contributions to scientific research.',
        conferred_by: {
          label: 'Global Science Association',
          title: 'Global Science Association',
          description: 'International body advancing scientific discovery.',
        },
        recipient: 'Luca Giovanni',
        subtitle: 'Biological Sciences',
        title: 'Excellence in Research',
        year: '2021',
      },
      {
        color: { dark: '#6e2c00', light: '#f39c12' },
        icon: { name: 'FaRunning', source: 'FontAwesome' },
        description: 'Recognized for exceptional performance and dedication in athletics.',
        conferred_by: {
          label: 'National Sports League',
          title: 'National Sports League',
          description: 'Governing body for competitive athletics.',
        },
        recipient: 'Luca Giovanni',
        subtitle: 'Swimming',
        title: 'Athlete of the Year',
        year: '2020',
      },
      {
        color: { dark: '#4a235a', light: '#af7ac5' },
        icon: { name: 'FaPaintBrush', source: 'FontAwesome' },
        description: 'Awarded for outstanding artistic contributions and creative vision.',
        conferred_by: {
          label: 'International Arts Council',
          title: 'International Arts Council',
          description: 'Global organization celebrating artistic excellence.',
        },
        recipient: 'Luca Giovanni',
        title: 'Excellence in the Arts',
        subtitle: 'Visual Arts',
        year: '2019',
        website: 'https://example.com/arts-award',
      },
      {
        color: { dark: '#154360', light: '#2980b9' },
        icon: { name: 'FaUserTie', source: 'FontAwesome' },
        description: 'Recognized for exceptional leadership and organizational impact.',
        conferred_by: {
          label: 'Leadership Institute',
          title: 'Leadership Institute',
          description: 'Dedicated to developing global leaders.',
        },
        recipient: 'Luca Giovanni',
        subtitle: 'Executive Leadership',
        title: 'Leadership Award',
        year: '2018',
      },
    ],
  },
};

export default {
  title: 'Moments/Awards Moment',
  component: AwardsMoment,
  decorators: [momentStoryBookDecorator],
  parameters: {
    deepControls: { enabled: true },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const DefaultAwardsMoment = {
  name: 'Default Awards',
  args: {
    moment: momentData,
  },
};
