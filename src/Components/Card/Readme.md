`CardBase` Example:

```js
<CardBase>Blank Card</CardBase>
```

`CardBase` Example w/ All Sub-Components:

```js
import CardDetail from './Detail';
import CardHeader from './Header';
import CardImage from './Image';
import CardPill from './Pill';
import CardSection from './Section';

<CardBase style={{maxWidth: "300px"}}>
  <CardHeader text="Dragon Tongue Beans"/>
  <CardSection>Has Really Cool Colors!</CardSection>
  <CardImage src="http://web.archive.org/web/20190427060352if_/https://www.rareseeds.com/assets/1/14/dimregular/bean-dragon-tongue-ma-dsc06898.jpg"
  alt="Dragon Tongue Beans" />
  <CardPill text="🐉😛" />
  <CardDetail>Dragon tongue bean, or dragon tongue shelling bean, is young green bean of cranberry bean, pinto bean in the species Phaseolus vulgaris.</CardDetail>
</CardBase>
```
