export const isEven = (value: number) => ((value % 2) === 0);

export const classList = (...classes: string[]) => classes.filter((item) => !!item).join(' ');

export const chunk = (array: never[], chunkSize: number, callback: (iter: any[]) => void) => {
  for (let i = 0, j = array.length; i < j; i += chunkSize) {
    callback(array.slice(i, i + chunkSize));
  }
};

const isHTMLElement = (elemOrNode: HTMLElement | Node): elemOrNode is HTMLElement => (
  (<HTMLElement>elemOrNode).offsetLeft !== undefined
);

export const getOffsetOfElementInViewport = (htmlElement: Element) => {
  // keep initial values number so you won't get NaN on first math. operation (on undefined).
  const offset = { left: 0, top: 0 };
  let element = htmlElement as HTMLElement | Node;
  for (; element !== null;) {
    let style;
    if (isHTMLElement(element)) {
      offset.left += element.offsetLeft;
      offset.top += element.offsetTop;
    }
    try {
      style = window.getComputedStyle(element as Element);
    } catch (err) {
      return offset;
    }
    // sometimes we can go up to the document (not document.documentElement a.k.a
    // HTML-tag but the actual document-object - then getComputedStyle will fail.
    if (typeof style === 'undefined') return offset;
    const { parentNode } = element as HTMLElement;
    if (!parentNode) return offset; // element is-not contained.
    // element is contained. also - that's our "loop++".
    element = parentNode as HTMLElement;
    // sometimes scrollLeft is undefined (that will prevent NaN in the offset.left).
    offset.left -= ((<HTMLElement>element).scrollLeft || 0);
    // sometimes scrollLeft is undefined (that will prevent NaN in the offset.top).
    offset.top -= ((<HTMLElement>element).scrollTop || 0);

    const position = style.getPropertyValue('position');
    if (/relative|absolute|fixed/i.test(position)) {
      offset.left += (Number.parseInt(style.getPropertyValue('border-left-width'), 10) || 0);
      offset.top += (Number.parseInt(style.getPropertyValue('border-top-width'), 10) || 0);
    }
    // skip going-up more, in-case the element has a fixed position,
    // in-that-case we're done (the loop stop-condition will be activated).
    if (/fixed/i.test(position)) {
      return offset;
    }
    element = element.parentNode as Node;
  }
  return offset;
};

export const hexToRgbA = (hex: string, a = 1) => {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const base = Number(`0x${c.join('')}`);
    // eslint-disable-next-line no-bitwise
    return `rgba(${[(base >> 16) & 255, (base >> 8) & 255, base & 255, a].join(',')})`;
  }
  throw new Error('Not Hex');
};
