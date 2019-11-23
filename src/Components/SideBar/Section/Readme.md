`SideBarSection` Example:

```js
<SideBarSection text="Hello World" index={0}/>
```


`SideBarSection` Example with Click Callback and Custom Icon:

```js
import FontAwesomeIcon from '../../Icon/FontAwesome';
const CheersIcon = <FontAwesomeIcon name="FaGlassCheers" />;

<SideBarSection text="click me" icon={CheersIcon} accentColor="#d15d5d" textColor="white" onClick={() => alert('Salud!')} index={0} />
```
