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
            
            // If primary calendar is Ethiopian, convert display to Ethiopian format
            if (widgetSettings.primaryCalendar !== 'gregorian') {
              // Store the ISO date
              var isoValue = $input.val();
              $input.attr('data-iso-date', isoValue);
              
              // Convert to Ethiopian format for display
              if (typeof window.EthiopianCalendarUI.EthiopianCalendar !== 'undefined') {
                var ethCalendar = new window.EthiopianCalendarUI.EthiopianCalendar();
                var ethDate = ethCalendar.toEthiopian(parsedDate);
                $input.val(ethDate.day + '/' + ethDate.month + '/' + ethDate.year);
              }
            }
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
            
            // Always store ISO format for form submission
            if (date.gregorian) {
              var year = date.gregorian.getFullYear();
              var month = String(date.gregorian.getMonth() + 1).padStart(2, '0');
              var day = String(date.gregorian.getDate()).padStart(2, '0');
              var isoDate = year + '-' + month + '-' + day;
              
              // Display format depends on primary calendar setting
              var displayValue;
              if (widgetSettings.primaryCalendar === 'gregorian') {
                // Show Gregorian date in ISO format (YYYY-MM-DD)
                displayValue = isoDate;
              } else {
                // Default to Ethiopian - Show Ethiopian date
                displayValue = date.ethiopian.day + '/' + date.ethiopian.month + '/' + date.ethiopian.year;
              }
              
              // Set the display value
              $input.val(displayValue);
              
              // Store the ISO date for form submission
              $input.attr('data-iso-date', isoDate);
              
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
        
        // Handle form submission - convert display value to ISO format
        var $form = $input.closest('form');
        if ($form.length) {
          $form.on('submit.ethcal-widget', function() {
            // If displaying Ethiopian format, convert back to ISO for submission
            if (widgetSettings.primaryCalendar !== 'gregorian') {
              var isoDate = $input.attr('data-iso-date');
              if (isoDate) {
                $input.val(isoDate);
              }
            }
          });
        }
      });
    }
  };

})(jQuery, Drupal, drupalSettings);
