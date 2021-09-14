`MiradorMoment` Example:

```typescript jsx
import MiradorMoment from './';

<MiradorMoment
  color={{ background:'#a98282', text:'#fbfbfb' }}
  title="Base Mirador Moment"
/>
```

`MiradorMoment` Example with Rendered Manifests:
```typescript jsx
import testData from './testData';
import MiradorMoment from './';

<MiradorMoment
  color={{ background:'#1967d2', text:'#fbfbfb' }}
  config={testData}
  title="Pre-configured Mirador Moment"
/>
```
