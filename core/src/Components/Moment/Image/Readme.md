`ImageMoment` Example:

```typescript jsx
import ImageMoment from './';

<ImageMoment
  color={{ background:'#d7f0fa', text:'#525252' }}
  subtitle="Embedding a static image within a moment"
  title="Image Moment"
  url="https://images.unsplash.com/photo-1575398010710-d020d61a2bbc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1929&q=80"
/>
```

`ImageMoment` Example with 'Row' Direction Caption:

```typescript jsx
import ImageMoment from './';

<ImageMoment
  caption="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  color={{ background:'#d7f0fa', text:'#525252' }}
  direction="row"
  subtitle="Good to use a narrow image for this layout"
  title="Row Layout"
  url="https://images.unsplash.com/photo-1575412941904-5e3112207df9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80"
/>
```

`ImageMoment` Example with 'Column' Direction Caption:

```typescript jsx
import ImageMoment from './';

<ImageMoment
  caption="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  color={{ background:'#d7f0fa', text:'#525252' }}
  direction="column"
  subtitle="Good to use a wide image for this layout"
  title="Column Layout"
  url="https://images.unsplash.com/photo-1575423007035-68621d1c83d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
/>
```
