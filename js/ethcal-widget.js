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
        var $displayInput = $(this);
        var $valueInput = $displayInput.siblings('.ethcal-datepicker-value');
        
        // Check if the EthiopianCalendarUI class is available
        if (typeof window.EthiopianCalendarUI === 'undefined' || 
            typeof window.EthiopianCalendarUI.EthiopianCalendarUI === 'undefined') {
          console.error('EthiopianCalendarUI library is not loaded.');
          return;
        }
        
        var widgetSettings = $displayInput.data('widgetSettings') || {};

        // Parse initial date if present
        var initialDate = new Date();
        var initialValue = $valueInput.val();
        
        // Check if the value field contains a date in ISO format (YYYY-MM-DD)
        if (initialValue && /^\d{4}-\d{2}-\d{2}/.test(initialValue)) {
          var parsedDate = new Date(initialValue);
          if (!isNaN(parsedDate.getTime())) {
            initialDate = parsedDate;
          }
        }
        
        // Get month names for display
        var ethMonthNames = ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 
                             'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'];
        var gregMonthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                              'July', 'August', 'September', 'October', 'November', 'December'];

        // Format display text for both calendars
        var formatDisplayText = function(date) {
          if (!date || !date.gregorian || !date.ethiopian) {
            return '';
          }
          
          var gregDate = date.gregorian;
          var ethDate = date.ethiopian;
          
          var gregText = gregMonthNames[gregDate.getMonth()] + ' ' + 
                         gregDate.getDate() + ', ' + 
                         gregDate.getFullYear();
          
          var ethText = ethMonthNames[ethDate.month - 1] + ' ' + 
                       ethDate.day + ', ' + 
                       ethDate.year;
          
          // Display both calendars if the setting is enabled
          if (widgetSettings.displayBothCalendars) {
            return ethText + ' (' + gregText + ')';
          } else {
            return gregText;
          }
        };

        // Create the Ethiopian calendar UI
        var calendar = new window.EthiopianCalendarUI.EthiopianCalendarUI({
          inputElement: $displayInput[0],
          initialDate: initialDate,
          useAmharic: widgetSettings.useAmharic || false,
          showGregorian: widgetSettings.showGregorian !== false,
          onSelect: function(date) {
            // date.ethiopian contains {year, month, day}
            // date.gregorian contains JavaScript Date object
            
            // Store the Gregorian date in ISO format in the hidden value field
            if (date.gregorian) {
              var year = date.gregorian.getFullYear();
              var month = String(date.gregorian.getMonth() + 1).padStart(2, '0');
              var day = String(date.gregorian.getDate()).padStart(2, '0');
              var isoDate = year + '-' + month + '-' + day;
              
              // Update hidden field with ISO date for form submission
              $valueInput.val(isoDate);
              
              // Display formatted text in the display input
              $displayInput.val(formatDisplayText(date));
              
              // Trigger change event so Drupal knows the value changed
              $valueInput.trigger('change');
            }
          }
        });
        
        // Display initial value in formatted text if date is present
        if (initialValue && /^\d{4}-\d{2}-\d{2}/.test(initialValue)) {
          var ethCalendar = new window.EthiopianCalendarUI.EthiopianCalendar();
          var parsedDate = new Date(initialValue);
          if (!isNaN(parsedDate.getTime())) {
            var ethDate = ethCalendar.toEthiopian(parsedDate);
            var displayDate = {
              gregorian: parsedDate,
              ethiopian: ethDate
            };
            $displayInput.val(formatDisplayText(displayDate));
          }
        }
        
        // Prevent the default behavior and show Ethiopian calendar on click/focus
        $displayInput.on('click focus', function(e) {
          e.preventDefault();
          e.stopPropagation();
          calendar.show();
        });
        
        // Also prevent keyboard navigation except tab
        $displayInput.on('keydown', function(e) {
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
