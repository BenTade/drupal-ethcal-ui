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

        // Parse initial date if present
        var initialDate = new Date();
        if ($input.val()) {
          var parsedDate = new Date($input.val());
          if (!isNaN(parsedDate.getTime())) {
            initialDate = parsedDate;
          }
        }

        // Create the Ethiopian calendar UI
        var calendar = new window.EthiopianCalendarUI.EthiopianCalendarUI({
          inputElement: this,
          initialDate: initialDate,
          useAmharic: widgetSettings.useAmharic || false,
          useEthiopicNumbers: widgetSettings.useEthiopicNumbers || false,
          showGregorian: widgetSettings.showGregorian !== false,
          mergedView: widgetSettings.mergedView || false,
          primaryCalendar: widgetSettings.primaryCalendar || 'ethiopian',
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
        
        // Prevent the default HTML5 date picker and show Ethiopian calendar
        $input.on('click focus mousedown', function(e) {
          e.preventDefault();
          e.stopPropagation();
          calendar.show();
        });
        
        // Also prevent keyboard navigation from opening native picker
        $input.on('keydown', function(e) {
          // Allow tab for navigation
          if (e.key === 'Tab' || e.code === 'Tab') {
            return;
          }
          // Prevent other keys and show our calendar
          e.preventDefault();
          calendar.show();
        });
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
