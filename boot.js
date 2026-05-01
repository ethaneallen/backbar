/* Final boot — run after all view modules have attached renderers */
(() => {
  const BB = window.__BB;
  // render initial browse view (data-extend has already decorated DRINKS)
  BB.viewRenderers.browse();
})();
