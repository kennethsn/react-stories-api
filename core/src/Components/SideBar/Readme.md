`SideBar` Example:

```typescript jsx
import YouTubeMoment from '../Moment/YouTube';
import VideoMoment from '../Moment/Video';
import WikidataMoment from '../Moment/Wikidata';
import SideBar from './';

<SideBar>
  <YouTubeMoment
    index={1}
    label="YouTube Video"
    video_id="example"
  />
  <WikidataMoment
    entity_id="Q11641"
    index={2}
    label="Wikidata"
  />
  <VideoMoment
    index={3}
    label="Video"
    url="http://example.com/dummy.mp4"
  />
</SideBar>
```
