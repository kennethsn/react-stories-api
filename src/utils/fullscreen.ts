export const toggleFullscreen = (selector: string) => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    const element = document.querySelector(selector);
    if (element) {
      element.requestFullscreen();
    }
  }
};

export default toggleFullscreen;
