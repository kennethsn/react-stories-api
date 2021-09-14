`GalleryImage` Example:

```typescript jsx
import GalleryImage from './';

<GalleryImage
  label="Black Hole"
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Black_hole_-_Messier_87.jpg/2560px-Black_hole_-_Messier_87.jpg"
/>
```


`GalleryImage` Example with the "No Image" Layout:
```typescript jsx
import GalleryImage from './';

<GalleryImage
  label="Black Hole"
  noImage={true}
  src="http://stories-api-stage.herokuapp.com/static/graphic/textures/0.jpg"
/>
```
