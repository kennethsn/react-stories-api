`AudioMoment` Example:

```typescript jsx
import AudioMoment from './';

const data = {
  description: 'Secretly deceive the listener by playing this song instead of the intended song... So original.',
  image: 'https://upload.wikimedia.org/wikipedia/en/3/34/RickAstleyNeverGonnaGiveYouUp7InchSingleCover.jpg',
  src: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Rick_Astley_-_Never_Gonna_Give_You_Up.ogg',
  title: 'Your Favorite Song',
};

<AudioMoment
  color={{ background:'#030200', text:'#fffae3' }}
  data={data}
  subtitle="Embedding an audio file directly into a moment"
  title="The Art of Rickrolling 🎙️"
/>
```
