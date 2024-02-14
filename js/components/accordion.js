import $ from 'jquery';

export default function () {
  $(function () {
    initialize_accordions();
  });

  function initialize_accordions() {
    const $accordionItems = $('.accordion-item');
    const $accordionItemToggles = $('.accordion-item__toggle', $accordionItems);

    if ($accordionItemToggles.length) {
      // Bind mouse click / keyboard space/enter button activation.
      // ---
      $accordionItemToggles.off('click').on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        const $thisToggle = $(this);

        if ($thisToggle.attr('aria-expanded') === 'true') {
          closeAccordionItem($thisToggle);
        } else {
          openAccordionItem($thisToggle);
        }
      });
    }
  }

  // Work functions invoked by event binds.
  // ---

  function closeAccordionItem($accordionItemToggle) {
    const $parentItem = $accordionItemToggle.closest('.accordion-item');
    const $itemPanel = $parentItem.find('.accordion-item__panel').first();

    $parentItem.removeClass('accordion-item--open');
    $accordionItemToggle.attr('aria-expanded', 'false');

    /*
      Use jquery slide collapse to hide, this is still the most
      reliable slide/expand option we have readily available.
      Also, it handles inline display: none/block at the end of its
      animation. - JE
    */
    $itemPanel.slideUp(250); // inline display: none; after 250ms.
    $itemPanel.prop('hidden', true);
  }

  function openAccordionItem($accordionItemToggle) {
    const $parentItem = $accordionItemToggle.closest('.accordion-item');
    const $itemPanel = $parentItem.find('.accordion-item__panel').first();

    $parentItem.addClass('accordion-item--open');
    $accordionItemToggle.attr('aria-expanded', 'true');

    $itemPanel.prop('hidden', false);
    $itemPanel.slideDown(250); // inline display: block; after 250ms.
  }
}
