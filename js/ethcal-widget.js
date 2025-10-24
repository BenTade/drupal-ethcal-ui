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
        
        var widgetSettings = $input.data('widgetSettings') || {};

        // Create the Ethiopian calendar UI
        var calendar = new window.EthiopianCalendarUI.EthiopianCalendarUI({
          inputElement: this,
          useAmharic: widgetSettings.useAmharic || false,
          showGregorian: widgetSettings.showGregorian !== false,
          onSelect: function(date) {
            // date.ethiopian contains {year, month, day}
            // date.gregorian contains JavaScript Date object
            
            // Update the input with the Gregorian date in ISO format
            if (date.gregorian) {
              var year = date.gregorian.getFullYear();
              var month = String(date.gregorian.getMonth() + 1).padStart(2, '0');
              var day = String(date.gregorian.getDate()).padStart(2, '0');
              $input.val(year + '-' + month + '-' + day);
              
              // Trigger change event so Drupal knows the value changed
              $input.trigger('change');
            }
          }
        });
        
        // Show calendar when clicking or focusing the input
        $input.on('click focus', function(e) {
          e.preventDefault();
          calendar.show();
        });
        
        // Prevent the default HTML5 date picker from showing
        $input.on('mousedown', function(e) {
          // This prevents the browser's native date picker
          if (e.target === this) {
            e.preventDefault();
            calendar.show();
          }
        });
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
