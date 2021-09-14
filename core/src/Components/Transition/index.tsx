import Slide, { SlideProps } from '@material-ui/core/Slide';
import React, { forwardRef, Ref } from 'react';

/* eslint-disable react/jsx-props-no-spreading */
const TransitionRef = (props: SlideProps, ref: Ref<typeof Slide>) => (
  <Slide
    direction="up"
    ref={ref}
    {...props}
  />
);
const Transition = forwardRef(TransitionRef);

export default Transition;
