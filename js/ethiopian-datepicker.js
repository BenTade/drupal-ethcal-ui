/**
 * @file
 * Ethiopian Calendar Datepicker jQuery Plugin.
 */

(function ($, Drupal, EthiopianCalendar) {
  'use strict';

  /**
   * Ethiopian Datepicker jQuery plugin.
   */
  $.fn.ethiopianDatepicker = function(options) {
    var settings = $.extend({
      useAmharic: false,
      showGregorian: true,
      onSelect: function() {}
    }, options);

    return this.each(function() {
      var $input = $(this);
      var $wrapper = $('<div class="ethiopian-datepicker-wrapper"></div>');
      var $calendar = $('<div class="ethiopian-datepicker"></div>');
      var currentDate = new Date();
      var ethDate = EthiopianCalendar.toEthiopian(currentDate);
      var selectedDate = null;

      // Append wrapper and calendar
      $input.wrap($wrapper);
      $input.after($calendar);
      $calendar.hide();

      // Show/hide calendar on input click
      $input.on('click', function(e) {
        e.stopPropagation();
        $('.ethiopian-datepicker').not($calendar).hide();
        $calendar.toggle();
        if ($calendar.is(':visible')) {
          renderCalendar(ethDate.year, ethDate.month);
        }
      });

      // Hide calendar on outside click
      $(document).on('click', function() {
        $calendar.hide();
      });

      $calendar.on('click', function(e) {
        e.stopPropagation();
      });

      /**
       * Render the calendar.
       */
      function renderCalendar(year, month) {
        var daysInMonth = EthiopianCalendar.getDaysInMonth(year, month);
        var monthName = settings.useAmharic ? 
                       EthiopianCalendar.amharicMonths[month - 1] :
                       EthiopianCalendar.englishMonths[month - 1];
        var yearDisplay = settings.useAmharic ?
                         EthiopianCalendar.toAmharicNumber(year) :
                         year;

        var html = '<div class="ethcal-header">';
        html += '<button type="button" class="ethcal-prev-year" data-action="prev-year">&laquo;</button>';
        html += '<button type="button" class="ethcal-prev-month" data-action="prev-month">&lsaquo;</button>';
        html += '<span class="ethcal-current">' + monthName + ' ' + yearDisplay + '</span>';
        html += '<button type="button" class="ethcal-next-month" data-action="next-month">&rsaquo;</button>';
        html += '<button type="button" class="ethcal-next-year" data-action="next-year">&raquo;</button>';
        html += '</div>';

        html += '<div class="ethcal-body">';
        html += '<table class="ethcal-table">';
        html += '<tbody>';

        // Render days
        var row = '<tr>';
        for (var day = 1; day <= daysInMonth; day++) {
          if ((day - 1) % 7 === 0 && day !== 1) {
            row += '</tr><tr>';
          }
          var dayDisplay = settings.useAmharic ?
                          EthiopianCalendar.toAmharicNumber(day) :
                          day;
          row += '<td class="ethcal-day" data-day="' + day + '">' + dayDisplay + '</td>';
        }
        row += '</tr>';
        html += row;

        html += '</tbody></table>';
        html += '</div>';

        $calendar.html(html);
        attachCalendarEvents(year, month);
      }

      /**
       * Attach event handlers to calendar elements.
       */
      function attachCalendarEvents(year, month) {
        // Navigation buttons
        $calendar.find('[data-action="prev-year"]').on('click', function() {
          renderCalendar(year - 1, month);
        });

        $calendar.find('[data-action="next-year"]').on('click', function() {
          renderCalendar(year + 1, month);
        });

        $calendar.find('[data-action="prev-month"]').on('click', function() {
          var newMonth = month - 1;
          var newYear = year;
          if (newMonth < 1) {
            newMonth = 13;
            newYear--;
          }
          renderCalendar(newYear, newMonth);
        });

        $calendar.find('[data-action="next-month"]').on('click', function() {
          var newMonth = month + 1;
          var newYear = year;
          if (newMonth > 13) {
            newMonth = 1;
            newYear++;
          }
          renderCalendar(newYear, newMonth);
        });

        // Day selection
        $calendar.find('.ethcal-day').on('click', function() {
          var day = parseInt($(this).data('day'));
          selectedDate = {
            year: year,
            month: month,
            day: day
          };

          // Convert to Gregorian
          var gregDate = EthiopianCalendar.toGregorian(year, month, day);
          
          // Format and set input value
          var displayValue;
          if (settings.showGregorian) {
            var ethFormatted = EthiopianCalendar.format(selectedDate, settings.useAmharic);
            var gregFormatted = formatGregorianDate(gregDate);
            displayValue = ethFormatted + ' (' + gregFormatted + ')';
          } else {
            displayValue = EthiopianCalendar.format(selectedDate, settings.useAmharic);
          }
          
          $input.val(displayValue);
          $input.data('ethiopian-date', selectedDate);
          $input.data('gregorian-date', gregDate);
          
          $calendar.hide();
          settings.onSelect.call($input[0], selectedDate, gregDate);
        });
      }

      /**
       * Format Gregorian date.
       */
      function formatGregorianDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + 
               months[date.getMonth()] + ' ' + 
               date.getFullYear();
      }
    });
  };

})(jQuery, Drupal, window.EthiopianCalendar);
