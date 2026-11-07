/* global $, playback, state */
'use strict';

$(function () {
  playback.pause();

  let slideActive;
  window.addEventListener('message', function (event) {
    if (event.source !== window.parent || event.data?.type !== 'atom:raftscope-slide') return;
    const { active } = event.data;
    if (typeof active !== 'boolean' || active === slideActive) return;

    slideActive = active;
    if (active) playback.resume();
    else playback.pause();
  });
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'atom:raftscope-ready' }, '*');
  }

  $('#timeSlider .slider-handle').first().attr('aria-label', 'Tempo');
  $('#speedSlider .slider-handle').first().attr('aria-label', 'Velocidade');

  $('[data-raft-key]').on('click', function () {
    const hasLeader = state.current.servers.some(server => server.state === 'leader');
    if (!hasLeader) {
      $('#raft-status').text('Aguarde a eleição de um líder.');
      return;
    }

    $('#raft-status').text('');
    $(window).trigger($.Event('keyup', { keyCode: Number(this.dataset.raftKey) }));
  }).on('keyup', function (event) {
    if (event.keyCode === 32) event.stopPropagation();
  });

  $('#time-button').on('click', function () {
    $('#raft-status').text('');
  });
});
