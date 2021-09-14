`StoriesAPICollection` Example:

```typescript jsx
import StoriesAPICollection from './';

<StoriesAPICollection
  apiKey="<api-key-here>"
  endpoint="https://example.com"
  id={1}
  onChange={(ctx) => alert(`Event: ${JSON.stringify(ctx)}`)}
  onLoad={(data) => alert(`Found ${data.name}`)}
  page={2}
  q="eli"
  urlFormatter="http://example.com/$id"
/>
```
