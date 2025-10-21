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
        
        // Check if the EthiopianCalendarUI class is available
        if (typeof window.EthiopianCalendarUI === 'undefined' || 
            typeof window.EthiopianCalendarUI.EthiopianCalendarUI === 'undefined') {
          console.error('EthiopianCalendarUI library is not loaded.');
          return;
        }
        
        var $hiddenInput = $input.siblings('.ethcal-hidden-value');
        var widgetSettings = $input.data('widgetSettings') || {};

        // Create the Ethiopian calendar UI
        var calendar = new window.EthiopianCalendarUI.EthiopianCalendarUI({
          inputElement: this,
          useAmharic: widgetSettings.useAmharic || false,
          showGregorian: widgetSettings.showGregorian !== false,
          onSelect: function(date) {
            // date.ethiopian contains {year, month, day}
            // date.gregorian contains JavaScript Date object
            
            // Store the Gregorian date in ISO format for backend
            if ($hiddenInput.length && date.gregorian) {
              var year = date.gregorian.getFullYear();
              var month = String(date.gregorian.getMonth() + 1).padStart(2, '0');
              var day = String(date.gregorian.getDate()).padStart(2, '0');
              $hiddenInput.val(year + '-' + month + '-' + day);
            }
            
            // Update the display input with Ethiopian date
            if (date.ethiopian) {
              $input.val(date.ethiopian.day + '/' + date.ethiopian.month + '/' + date.ethiopian.year);
            }
          }
        });
        
        // Show calendar when clicking the input
        $input.on('click', function() {
          calendar.show();
        });
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
