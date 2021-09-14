`StoriesAPIStory` Example:

```typescript jsx
import StoriesAPIStory from './';

<StoriesAPIStory
  apiKey="<api-key-here>"
  collection={2}
  endpoint="https://example.com"
  id="Q11641"
  options={{ active: 3 }}
  onLoad={(data) => alert(`Found ${data.label}`)}
/>
```
