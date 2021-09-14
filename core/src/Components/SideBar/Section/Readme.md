`SideBarSection` Example:

```typescript jsx
import SideBarSection from './';

<SideBarSection
  index={0}
  text="Hello World"
/>
```


`SideBarSection` Example with Click Callback and Custom Icon:

```typescript jsx
import FontAwesomeIcon from '../../Icon/FontAwesome';
import SideBarSection from './';

const CheersIcon = <FontAwesomeIcon name="FaGlassCheers" />;

<SideBarSection
  accentColor="#d15d5d"
  icon={CheersIcon}
  index={0}
  onClick={() => alert('Salud!')}
  text="click me"
  textColor="white"
/>
```
