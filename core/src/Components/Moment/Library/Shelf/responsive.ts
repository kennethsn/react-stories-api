const responsive = {
  monitor: {
    breakpoint: { max: 3000, min: 1800 },
    items: 5,
    slidesToSlide: 3,
  },
  desktop: {
    breakpoint: { max: 1800, min: 1400 },
    items: 4,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1400, min: 950 },
    items: 3,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 950, min: 700 },
    items: 2,
  },
  tiny: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
  },
};

export default responsive;
