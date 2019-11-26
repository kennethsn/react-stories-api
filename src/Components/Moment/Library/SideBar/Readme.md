`LibrarySideBar` Example:

```js
import { useState } from 'react';
import { testData } from '../constants';

function ExampleLibrarySideBarLayout() {
  const [state, setState] = useState(false);
  return (
    <LibrarySideBar currentBook={testData.books.items[0]} open={state}
    onClose={() => setState(false)}
    >
    <div onClick={() => setState(!state)}>CLICK ME</div>
    </ LibrarySideBar>
  )
}

<ExampleLibrarySideBarLayout />
```
