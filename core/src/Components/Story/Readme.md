`Story` Example:

```typescript jsx
import YouTubeMoment from '../Moment/YouTube';
import WikidataMoment from '../Moment/Wikidata';
import WikipediaMoment from '../Moment/Wikipedia';
import Story from './';

<Story
  description="One of the Most Popular Component-Driven Frontend Frameworks"
  image="https://upload.wikimedia.org/wikipedia/commons/e/ef/Daphne_Lantier_console_screenshot.png"
  label="React Story"
  logo={(
    <img
      alt="React Logo"
      src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
    />
  )}
>
  <WikipediaMoment
    color={{ background:'#f5d9c6', text:'#78563e' }}
    index={0}
    label="Wikipedia Article"
    subtitle="Learn About the History of React.js"
    title="Wikipedia Article"
    url="https://en.m.wikipedia.org/wiki/React_(web_framework)"
  />
  <YouTubeMoment
    color={{ background:'#60dbfc', text:'#1f1c1c' }}
    index={1}
    label="YouTube Video"
    subtitle="Watch this Intro Course"
    title="Crash Course"
    video_id="MhkGQAoc7bc"
  />
  <WikidataMoment
    color={{ background:'#cc7fa9', text:'#36031f' }}
    entity_id="Q19399674"
    index={2}
    label="Wikidata"
  />
</Story>
```
