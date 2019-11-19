`SlideScrollMoment` Example:

```js
import CardBase from '../../Card';
import CardDetail from '../../Card/Detail';
import CardHeader from '../../Card/Header';
import CardImage from '../../Card/Image';
import CardPill from '../../Card/Pill';
import CardSection from '../../Card/Section';

<SlideScrollMoment title={(<span>Most Popular Group of <i style={{color:'#ffff'}}>Friends</i></span>)} subtitle="Try hovering and dragging to interact with the cards." url="/" color={{background:'#24231c', text:'#ffe3fd'}}>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Ross Geller"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/1/13/DavidSchwimmer10TIFF.jpg" draggable="false" />
    <CardSection>David Schwimmer</CardSection>
    <CardPill text="🦖🦴🔍" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Phoebe Buffay"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/3/3f/Lisa_Kudrow_crop.jpg" draggable="false" />
    <CardSection>Lisa Kudrow</CardSection>
    <CardPill text="🎸💆🖼️" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Joey Tribbiani"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Matt_LeBlanc%2C_Arqiva_British_Academy_Television_Awards%2C_2013_%28tone_crop%29.jpg" draggable="false" />
    <CardSection>Matt LeBlanc</CardSection>
    <CardPill text="🎥👨‍⚕️🍕" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Rachel Green"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/1/16/JenniferAnistonHWoFFeb2012.jpg" draggable="false" />
    <CardSection>Jennifer Aniston</CardSection>
    <CardPill text="💅☕👜" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Chandler Bing"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/9/90/Matthew_Perry_2013.jpg" draggable="false" />
    <CardSection>Matthew Perry</CardSection>
    <CardPill text="🖥️👨‍💻📊" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

  <CardBase style={{maxWidth: "300px"}}>
    <CardHeader text="Monica Geller"/>
    <CardImage src="https://upload.wikimedia.org/wikipedia/commons/8/83/Courteney_Cox_%2710_PaleyFest.jpg" draggable="false" />
    <CardSection>Courteney Cox</CardSection>
    <CardPill text="🥘👩‍🍳🍫" />
    <CardDetail>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nos</CardDetail>
  </CardBase>

</SlideScrollMoment>
```
