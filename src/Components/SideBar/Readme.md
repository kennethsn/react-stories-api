`SideBar` Example:

```js
import YouTubeMoment from '../Moment/YouTube';
import VideoMoment from '../Moment/Video';
import WikidataMoment from '../Moment/Wikidata';

<SideBar>
  <YouTubeMoment video_id="example" label="YouTube Video" index={1} />
  <WikidataMoment entity_id="Q11641" label="Wikidata" index={2} />
  <VideoMoment url="http://example.com/dummy.mp4" label="Video" index={3} />
</SideBar>
```
