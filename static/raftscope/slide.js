'use strict';

(() => {
  const frame = document.currentScript.previousElementSibling;
  const slide = frame.closest('svg[data-marpit-svg]');
  if (!slide) return;

  function sendSlideState() {
    const active = slide.classList.contains('bespoke-marp-active')
      && document.body.dataset.bespokeView !== 'overview';
    frame.contentWindow.postMessage({ type: 'atom:raftscope-slide', active }, '*');
  }

  // Local file URLs can give the simulator and presentation opaque origins.
  window.addEventListener('message', event => {
    if (event.source === frame.contentWindow && event.data?.type === 'atom:raftscope-ready') {
      sendSlideState();
    }
  });
  frame.addEventListener('load', sendSlideState);

  const observer = new MutationObserver(sendSlideState);
  observer.observe(slide, { attributeFilter: ['class'] });
  observer.observe(document.body, { attributeFilter: ['data-bespoke-view'] });
  sendSlideState();
})();
