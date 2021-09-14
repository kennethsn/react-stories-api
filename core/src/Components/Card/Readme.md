`CardBase` Example:

```typescript jsx
import CardBase from './';

<CardBase>
  Blank Card
</CardBase>
```

`CardBase` Example w/ All Sub-Components:

```typescript jsx
import CardDetail from './Detail';
import CardHeader from './Header';
import CardImage from './Image';
import CardPill from './Pill';
import CardSection from './Section';
import CardBase from './';

<CardBase style={{ maxWidth: '300px' }}>
  <CardHeader text="Dragon Tongue Beans" />
  <CardSection>
    Has Really Cool Colors!
  </CardSection>
  <CardImage
    alt="Dragon Tongue Beans"
    src="http://web.archive.org/web/20190427060352if_/https://www.rareseeds.com/assets/1/14/dimregular/bean-dragon-tongue-ma-dsc06898.jpg"
  />
  <CardPill text="🐉😛" />
  <CardDetail>
    Dragon tongue bean, or dragon tongue shelling bean, is young green bean of cranberry bean, pinto bean in the species Phaseolus vulgaris.
  </CardDetail>
</CardBase>
```
