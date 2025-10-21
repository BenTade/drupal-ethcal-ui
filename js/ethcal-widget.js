/**
 * @file
 * Drupal behavior for Ethiopian Calendar widget.
 */

(function ($, Drupal, drupalSettings) {
  'use strict';

  /**
   * Attach Ethiopian datepicker to field widgets.
   */
  Drupal.behaviors.ethcalWidget = {
    attach: function (context, settings) {
      $('.ethcal-datepicker-input', context).once('ethcal-widget').each(function () {
        var $input = $(this);
        
        // Check if the ethiopianDatepicker plugin is available
        if (typeof $.fn.ethiopianDatepicker !== 'function') {
          console.error('ethiopianDatepicker plugin is not loaded.');
          return;
        }
        
        var $hiddenInput = $input.siblings('.ethcal-hidden-value');
        var widgetSettings = $input.data('widgetSettings') || {};

        $input.ethiopianDatepicker({
          useAmharic: widgetSettings.useAmharic || false,
          showGregorian: widgetSettings.showGregorian !== false,
          onSelect: function(ethDate, gregDate) {
            // Store the Gregorian date in ISO format for backend
            if ($hiddenInput.length) {
              var year = gregDate.getFullYear();
              var month = String(gregDate.getMonth() + 1).padStart(2, '0');
              var day = String(gregDate.getDate()).padStart(2, '0');
              $hiddenInput.val(year + '-' + month + '-' + day);
            }
          }
        });
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
