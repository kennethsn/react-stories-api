`ParallaxImage` Example:

```typescript jsx
import ParallaxImage from './';

<ParallaxImage src="https://upload.wikimedia.org/wikipedia/commons/3/3e/EYE_Film_Institute_Amsterdam_from_tour_boat_2016-09-12-6548.jpg" />
```


`ParallaxImage` Example with Content and Color:

```typescript jsx
import ParallaxImage from './';

<ParallaxImage
  color='#0c3e37'
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Louvre_Cour_Carree.jpg/2880px-Louvre_Cour_Carree.jpg"
>
  <div style={{ background: 'white', padding: 20 }}>
    This is a title
  </div>
</ParallaxImage>
```
