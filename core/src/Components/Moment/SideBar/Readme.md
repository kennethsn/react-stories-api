`SideBarMoment` Example:

```typescript jsx
import { useState } from 'react';
import SideBarMoment from './';

function ExampleSideBarLayout() {
  const [state, setState] = useState(false);
  return (
    <SideBarMoment title="SideBar Moment" subtitle="Click somewhere in the body of this moment⬇️ " sidebar={state} sideBarContent={"It's Aliveeee"} onClose={() => setState(false)}>
      <div onClick={() => setState(!state)} style={{padding: 50}}>CLICK HERE</div>
    </ SideBarMoment>
  )
}

<ExampleSideBarLayout />
```
