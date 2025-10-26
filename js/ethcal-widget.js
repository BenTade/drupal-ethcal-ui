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
        var displayValue = '';
        
        if ($input.val()) {
          var parsedDate = new Date($input.val());
          if (!isNaN(parsedDate.getTime())) {
            initialDate = parsedDate;
            
            // Store the ISO date for form submission
            $input.attr('data-iso-date', $input.val());
            
            // Set display format based on settings
            if (widgetSettings.primaryCalendar === 'gregorian') {
              // Show Gregorian date in ISO format (YYYY-MM-DD)
              displayValue = $input.val();
            } else {
              // Show Ethiopian date by default
              if (typeof window.EthiopianCalendarUI.EthiopianCalendar !== 'undefined') {
                var ethCalendar = new window.EthiopianCalendarUI.EthiopianCalendar();
                var ethDate = ethCalendar.toEthiopian(parsedDate);
                var day = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(ethDate.day) : ethDate.day;
                var month = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(ethDate.month) : ethDate.month;
                var year = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(ethDate.year) : ethDate.year;
                displayValue = day + '/' + month + '/' + year;
              }
            }
            
            $input.val(displayValue);
          }
        }

        // Create the Ethiopian calendar UI with proper configuration
        var calendarOptions = {
          inputElement: this,
          initialDate: initialDate,
          useAmharic: widgetSettings.useAmharic || false,
          useEthiopicNumbers: widgetSettings.useEthiopicNumbers || false,
          showGregorian: !widgetSettings.ethiopianOnly && (widgetSettings.showGregorian || widgetSettings.mergedView),
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
                // Show Ethiopian date with proper formatting
                var ethCalendar = new window.EthiopianCalendarUI.EthiopianCalendar();
                var ethDay = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(date.ethiopian.day) : date.ethiopian.day;
                var ethMonth = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(date.ethiopian.month) : date.ethiopian.month;
                var ethYear = widgetSettings.useEthiopicNumbers ? ethCalendar.toEthiopicNumeral(date.ethiopian.year) : date.ethiopian.year;
                displayValue = ethDay + '/' + ethMonth + '/' + ethYear;
              }
              
              // Set the display value
              $input.val(displayValue);
              
              // Store the ISO date for form submission
              $input.attr('data-iso-date', isoDate);
              
              // Trigger change event so Drupal knows the value changed
              $input.trigger('change');
            }
          }
        };
        
        var calendar = new window.EthiopianCalendarUI.EthiopianCalendarUI(calendarOptions);
        
        // Make the field clickable to show the calendar
        $input.on('click focus', function(e) {
          e.preventDefault();
          calendar.show();
          return false;
        });
        
        // Prevent keyboard input and show calendar instead
        $input.on('keydown', function(e) {
          // Allow tab for navigation
          if (e.key === 'Tab' || e.code === 'Tab') {
            return true;
          }
          // Prevent other keys and show our calendar
          e.preventDefault();
          calendar.show();
          return false;
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
