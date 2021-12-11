export const testProps = {
  index: 0,
  type: 'index',
  title: 'The Thinker',
  subtitle: 'Sculpture by Auguste Rodin',
  color: {
    type: 'hex',
    background: '#41aa8d',
    text: '#fff',
  },
  label: 'Stats',
  reference: {
    title: 'Wikidata',
    url: 'https://www.wikidata.org/wiki/Q18003128',
    description: 'Free knowledge database project hosted by Wikimedia and edited by volunteers',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Wikidata-logo-en.svg',
  },
  data: [
    {
      description: 'This is a description on how wide the sculpture is',
      icon: { name: 'FaRulerHorizontal', source: 'fa' },
      image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/The_Thinker%2C_Rodin.jpg/220px-The_Thinker%2C_Rodin.jpg',
      label: 'width',
      type: 'number',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: { amount: 97, unit: 'cm' },
    },
    {
      color: { background: '#867a1c' },
      description: 'This is a description on how tall the sculpture is',
      icon: { name: 'FaRulerVertical', source: 'fa' },
      label: 'height',
      type: 'number',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: { amount: 183.6, unit: 'cm' },
    },
    {
      color: { background: '#821c86' },
      description: 'This is a description on how thick the sculpture is',
      label: 'thickness',
      type: 'number',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: { amount: 148, unit: 'cm' },
    },
    {
      color: { background: '#359957' },
      description: 'This is a description on how tall the sculpture is',
      icon: { name: 'HiOutlineCubeTransparent', source: 'react' },
      label: 'horizontal depth',
      type: 'number',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: { amount: 64684, unit: 'cm' },
    },
    {
      color: { background: '#355199' },
      icon: { name: 'GiStonePile', source: 'react' },
      label: 'Materials Used',
      type: 'list',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: [
        { description: 'metal alloy', label: 'bronze' },
        {
          description: 'iron alloy with a very low carbon content and with fibrous slag inclusions',
          icon: { name: 'FaCubes', source: 'react' },
          label: 'wrought iron',
        },
        { label: 'some other material' },
        {
          label: 'wood',
          icon: {
            name: 'wood',
            source: 'img',
            url: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Arquitectura_en_madera.jpg',
          },
        },
      ],
    },
    {
      color: { background: '#9c5961' },
      description: 'This is a description on how tall the sculpture is',
      label: 'created',
      type: 'string',
      url: 'https://www.wikidata.org/wiki/Q18003128',
      value: 'over 10 years ago',
    },
  ],
};

export default testProps;
