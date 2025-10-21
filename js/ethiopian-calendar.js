/**
 * @file
 * Ethiopian Calendar conversion library.
 * 
 * Converts between Gregorian and Ethiopian calendar systems.
 * The Ethiopian calendar has 13 months (12 months of 30 days + 1 month of 5/6 days).
 */

(function () {
  'use strict';

  /**
   * Ethiopian Calendar utilities.
   */
  window.EthiopianCalendar = {
    
    /**
     * Ethiopian month names in Amharic.
     */
    amharicMonths: [
      'መስከረም', 'ጥቅምት', 'ኅዳር', 'ታኅሳስ', 'ጥር', 'የካቲት',
      'መጋቢት', 'ሚያዝያ', 'ግንቦት', 'ሰኔ', 'ሐምሌ', 'ነሐሴ', 'ጳጉሜን'
    ],

    /**
     * Ethiopian month names in English.
     */
    englishMonths: [
      'Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit',
      'Megabit', 'Miazia', 'Ginbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'
    ],

    /**
     * Amharic numerals 0-9.
     */
    amharicNumerals: ['፲', '፩', '፪', '፫', '፬', '፭', '፮', '፯', '፰', '፱'],

    /**
     * Check if Ethiopian year is a leap year.
     */
    isLeapYear: function(year) {
      return (year + 1) % 4 === 0;
    },

    /**
     * Convert Gregorian date to Ethiopian date.
     * 
     * @param {Date} gregorianDate - JavaScript Date object
     * @return {Object} Ethiopian date {year, month, day}
     */
    toEthiopian: function(gregorianDate) {
      var gYear = gregorianDate.getFullYear();
      var gMonth = gregorianDate.getMonth() + 1;
      var gDay = gregorianDate.getDate();
      
      // Ethiopian calendar starts on Sept 11 (or Sept 12 in leap years)
      var jdn = this.gregorianToJDN(gYear, gMonth, gDay);
      return this.jdnToEthiopian(jdn);
    },

    /**
     * Convert Ethiopian date to Gregorian date.
     * 
     * @param {number} year - Ethiopian year
     * @param {number} month - Ethiopian month (1-13)
     * @param {number} day - Ethiopian day
     * @return {Date} JavaScript Date object
     */
    toGregorian: function(year, month, day) {
      var jdn = this.ethiopianToJDN(year, month, day);
      return this.jdnToGregorian(jdn);
    },

    /**
     * Convert Gregorian date to Julian Day Number.
     */
    gregorianToJDN: function(year, month, day) {
      var a = Math.floor((14 - month) / 12);
      var y = year + 4800 - a;
      var m = month + 12 * a - 3;
      
      return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
             Math.floor(y / 4) - Math.floor(y / 100) + 
             Math.floor(y / 400) - 32045;
    },

    /**
     * Convert Julian Day Number to Gregorian date.
     */
    jdnToGregorian: function(jdn) {
      var a = jdn + 32044;
      var b = Math.floor((4 * a + 3) / 146097);
      var c = a - Math.floor((146097 * b) / 4);
      var d = Math.floor((4 * c + 3) / 1461);
      var e = c - Math.floor((1461 * d) / 4);
      var m = Math.floor((5 * e + 2) / 153);
      
      var day = e - Math.floor((153 * m + 2) / 5) + 1;
      var month = m + 3 - 12 * Math.floor(m / 10);
      var year = 100 * b + d - 4800 + Math.floor(m / 10);
      
      return new Date(year, month - 1, day);
    },

    /**
     * Convert Ethiopian date to Julian Day Number.
     */
    ethiopianToJDN: function(year, month, day) {
      var jdn = Math.floor((year - 1) / 4) + 
                (year - 1) * 365 + 
                (month - 1) * 30 + 
                day + 
                1723856;
      return jdn;
    },

    /**
     * Convert Julian Day Number to Ethiopian date.
     */
    jdnToEthiopian: function(jdn) {
      var r = (jdn - 1723856) % 1461;
      var n = (r % 365) + 365 * Math.floor(r / 1460);
      
      var year = 4 * Math.floor((jdn - 1723856) / 1461) + 
                 Math.floor(r / 365) - 
                 Math.floor(r / 1460);
      var month = Math.floor(n / 30) + 1;
      var day = (n % 30) + 1;
      
      return {
        year: year,
        month: month,
        day: day
      };
    },

    /**
     * Format Ethiopian date.
     * 
     * @param {Object} ethDate - Ethiopian date {year, month, day}
     * @param {boolean} useAmharic - Use Amharic numerals and month names
     * @return {string} Formatted date string
     */
    format: function(ethDate, useAmharic) {
      if (useAmharic) {
        return this.toAmharicNumber(ethDate.day) + ' ' +
               this.amharicMonths[ethDate.month - 1] + ' ' +
               this.toAmharicNumber(ethDate.year);
      } else {
        return ethDate.day + ' ' +
               this.englishMonths[ethDate.month - 1] + ' ' +
               ethDate.year;
      }
    },

    /**
     * Convert number to Amharic numerals.
     */
    toAmharicNumber: function(num) {
      return String(num).split('').map(function(digit) {
        return this.amharicNumerals[parseInt(digit)];
      }.bind(this)).join('');
    },

    /**
     * Get days in Ethiopian month.
     */
    getDaysInMonth: function(year, month) {
      if (month < 13) {
        return 30;
      } else {
        return this.isLeapYear(year) ? 6 : 5;
      }
    }
  };

})();
