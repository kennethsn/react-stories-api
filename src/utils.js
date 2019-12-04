export function isEven(value) {
  return (value%2 == 0);
}

export function classList(...classes) {
  return classes
    .filter(item => !!item)
    .join(' ');
}

export function chunk(array, chunkSize, callback){
  for (let i=0,j=array.length; i<j; i+=chunkSize) {
      callback(array.slice(i,i+chunkSize));
  }
}

export function getOffsetOfElementInViewport(element){
  "use strict";
  var offset = {"left":0,"top":0};  //keep initial values number so you won't get NaN on first math. operation (on undefined).

  for( ; null !== element ; ){
    var style     = undefined
       ,position  = undefined
       ;

    offset.left = offset.left + element.offsetLeft;
    offset.top  = offset.top  + element.offsetTop;

    try{
    style = self.getComputedStyle(element);
    }catch(err){}
    if("undefined" === typeof style) return offset;      //sometimes we can go up to the document (not document.documentElement a.k.a HTML-tag but the actual document-object - then getComputedStyle will fail.

    if(null === element.parentNode)  return offset;      //element is-not contained.

    element  = element.parentNode;                      //element is contained. also - that's our "loop++".
    offset.left = offset.left - (element.scrollLeft || 0);  //sometimes scrollLeft is undefined (that will prevent NaN in the offset.left).
    offset.top  = offset.top  - (element.scrollTop  || 0);  //sometimes scrollLeft is undefined (that will prevent NaN in the offset.top).

    position = style.getPropertyValue("position");
    if(true === /relative|absolute|fixed/i.test(position)){
      offset.left = offset.left + (Number.parseInt(style.getPropertyValue("border-left-width"), 10) || 0);
      offset.top  = offset.top  + (Number.parseInt(style.getPropertyValue("border-top-width"),  10) || 0);
    }

    element = (true === /fixed/i.test(position)) ? null : element.parentNode; //skip going-up more, in-case the element has a fixed position, in-that-case we're done (the loop stop-condition will be activated).
  }

  return offset;
};

export function hexToRgbA(hex, a=1){
  if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
      let c = hex.substring(1).split('');
      if(c.length == 3){
          c= [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c= '0x'+c.join('');
      return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255, a].join(',')+')';
  }
  throw new Error('Not Hex');
}
