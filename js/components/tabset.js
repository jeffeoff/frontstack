import $ from 'jquery';

export default function () {
  $(function () {
    initialize_tabs();
  });

  function initialize_tabs() {
    const $allTabs = $('.tabset');
    const $allTabButtons = $('.tabset__tablist .tabset__tab', $allTabs);

    // we have to have at least two tab buttons to need tab switching
    // functionality.
    if ($allTabButtons.length > 1) {
      $allTabs.each(function () {
        const $thisTab = $(this);

        tabs_clickListener($thisTab);
        tabs_keyboardListener($thisTab);
      });
    }
  }

  // ---
  // CLICK / keyboard space/enter button activation EVENTS
  // ---
  function tabs_clickListener($tab) {
    const $tabButtons = $('.tabset__tablist .tabset__tab', $tab);

    $tabButtons.off('click').on('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      const $thisButton = $(this);

      openTabpanel($thisButton);
    });
  }

  // ---
  // KEYBOARD EVENTS FOR VERTICAL TABS
  // ---
  function tabs_keyboardListener($tab) {
    const $tabButtons = $('.tabset__tablist .tabset__tab', $tab);

    $tab.on('keydown', (e) => {
      const $eventTarget = $(e.target);
      const $focusedTabButton = $tabButtons.filter($eventTarget);

      // if already focused on a tab button...
      if ($focusedTabButton.length) {
        // ARROW LEFT or UP
        // ---
        // Move to the previous tab button and activate it.
        // If already on the first tab, move to the last tab and activate it.
        if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          openTabpanel(getPreviousTabButton($focusedTabButton));
        }

        // ARROW RIGHT or DOWN
        // ---
        // Move to the next tab button and activate it.
        // If already on the last tab, move to the first tab and activate it.
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          openTabpanel(getNextTabButton($focusedTabButton));
        }

        // HOME
        // ---
        // Move to the first tab and activate it.
        if (e.key === 'Home') {
          openTabpanel(getFirstTabButton($focusedTabButton));
        }

        // END
        // ---
        // Move to the last tab and activate it.
        if (e.key === 'End') {
          openTabpanel(getLastTabButton($focusedTabButton));
        }
      }
    });
  }

  // ---
  // Utility functions the Listeners above invoke.
  // ---
  function getPreviousTabButton($tabButton) {
    let $previousTabButton = $tabButton.prev('.tabset__tab');

    if (!$previousTabButton.length) {
      $previousTabButton = getLastTabButton($tabButton);
    }

    return $previousTabButton;
  }

  function getNextTabButton($tabButton) {
    let $nextTabButton = $tabButton.next('.tabset__tab');

    if (!$nextTabButton.length) {
      $nextTabButton = getFirstTabButton($tabButton);
    }

    return $nextTabButton;
  }

  function getLastTabButton($tabButton) {
    const $siblingTabButtons = $tabButton
      .closest('.tabset__tablist')
      .find('.tabset__tab')
      .not($tabButton);

    return $siblingTabButtons.last();
  }

  function getFirstTabButton($tabButton) {
    const $siblingTabButtons = $tabButton
      .closest('.tabset__tablist')
      .find('.tabset__tab')
      .not($tabButton);

    return $siblingTabButtons.first();
  }

  function openTabpanel($tabButton) {
    // Step 1.
    // First, disable all other panels in this set.
    const $siblingTabButtons = $tabButton
      .closest('.tabset__tablist')
      .find('.tabset__tab')
      .not($tabButton);

    $siblingTabButtons.each(function () {
      const $thisTabButton = $(this);
      const controlsID = $thisTabButton.attr('aria-controls');
      const $thisTabpanel = $('#' + controlsID);

      // Disable this button.
      $thisTabButton.attr('aria-selected', 'false').attr('tabindex', '-1');

      // Hide this button's associated panel
      $thisTabpanel.prop('hidden', true);
      $thisTabpanel.removeClass('tabset__panel--open');
    });

    // Step 2.
    // Finally, activate this panel.
    const controlsID = $tabButton.attr('aria-controls');
    const $tabpanel = $('#' + controlsID);

    // Show this button's associated panel
    $tabButton
      .attr('aria-selected', 'true')
      .attr('tabindex', '0')
      .trigger('focus');

    $tabpanel.prop('hidden', false);

    // Show this tab panel, given the hidden property
    // enough time to be processed by the DOM, allowing
    // css animation to class changes to be detected.
    setTimeout(() => {
      $tabpanel.addClass('tabset__panel--open');
    }, 5);
  }
}
