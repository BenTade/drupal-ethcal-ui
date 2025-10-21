# ethcal-ui Datepicker Integration

## Overview

This document explains how the **ethcal-ui datepicker** is integrated into this Drupal module.

## What is ethcal-ui?

The `ethcal-ui` is a custom-built **Ethiopian calendar datepicker library** that is fully integrated within this Drupal module. It is **not** an external npm package or separate repository - it is part of this module's codebase.

## Components

The ethcal-ui datepicker consists of three main JavaScript files:

### 1. ethiopian-calendar.js
Core Ethiopian calendar conversion library that provides:
- Conversion between Gregorian and Ethiopian calendars using Julian Day Number (JDN)
- Ethiopian calendar utilities (leap year calculation, days in month, etc.)
- Date formatting in English and Amharic
- Month names in both languages
- Amharic numeral conversion

**Key Functions:**
- `EthiopianCalendar.toEthiopian(gregorianDate)` - Convert Date object to Ethiopian calendar
- `EthiopianCalendar.toGregorian(year, month, day)` - Convert Ethiopian date to Gregorian
- `EthiopianCalendar.format(ethDate, useAmharic)` - Format Ethiopian date as string
- `EthiopianCalendar.isLeapYear(year)` - Check if Ethiopian year is leap year
- `EthiopianCalendar.getDaysInMonth(year, month)` - Get number of days in month

### 2. ethiopian-datepicker.js
jQuery plugin that provides the interactive datepicker UI:
- Popup calendar interface with month/year navigation
- Day selection with visual feedback
- Support for both Amharic and English display
- Optional Gregorian date display alongside Ethiopian date
- Integration with standard text inputs

**Usage:**
```javascript
$('.selector').ethiopianDatepicker({
  useAmharic: false,
  showGregorian: true,
  onSelect: function(ethDate, gregDate) {
    // Handle date selection
  }
});
```

### 3. ethcal-widget.js
Drupal behavior that attaches the datepicker to field widgets:
- Automatically initializes datepicker on Ethiopian date fields
- Reads widget settings from data attributes
- Stores selected dates in hidden fields for form submission
- Integrates with Drupal's jQuery.once() for proper behavior attachment

## Integration Architecture

### Drupal Libraries (ethcal_ui.libraries.yml)

The module defines three Drupal libraries:

1. **ethiopian-calendar**: Core library containing the conversion logic and datepicker UI
   - Loads: ethiopian-calendar.js, ethiopian-datepicker.js, ethiopian-datepicker.css
   - Dependencies: core/drupal, core/jquery, core/jquery.once

2. **widget**: Field widget integration
   - Loads: ethcal-widget.js, ethcal-widget.css
   - Dependencies: ethcal_ui/ethiopian-calendar, core/drupal, core/jquery

3. **formatter**: Field formatter styles
   - Loads: ethcal-formatter.css
   - Dependencies: core/drupal

### PHP Integration

#### Field Widget (EthiopianDateWidget.php)
- Extends Drupal's WidgetBase
- Provides configuration form for widget settings (Amharic, show Gregorian, etc.)
- Renders text input with datepicker class and hidden field for storing ISO date
- Attaches the 'ethcal_ui/widget' library to the form element
- Converts stored ISO dates to display format

#### Field Formatters
Three formatters for displaying dates:
- **EthiopianDateDefaultFormatter**: Side-by-side display (Ethiopian | Gregorian)
- **EthiopianDateMergedFormatter**: Merged display (Ethiopian with Gregorian in parentheses)
- **EthiopianDateOnlyFormatter**: Ethiopian calendar only

All formatters:
- Use the PHP conversion function `_ethcal_ui_convert_to_ethiopian()`
- Render through Twig templates
- Attach the 'ethcal_ui/formatter' library for styling

#### Module File (ethcal_ui.module)
Contains PHP conversion functions that mirror the JavaScript logic:
- `_ethcal_ui_convert_to_ethiopian($date, $use_amharic)` - Server-side conversion
- `_ethcal_ui_to_amharic_number($num)` - Convert numbers to Amharic numerals
- Template preprocessing functions for formatters

### Views Integration

- **ethcal_ui.views.inc**: Provides Views integration hooks
- **EthiopianDateField.php**: Custom Views field handler for Ethiopian dates
- Allows displaying Ethiopian dates in Views with format options

## Calendar Conversion Algorithm

The conversion uses the **Julian Day Number (JDN)** as an intermediate representation:

```
Gregorian Date ↔ JDN ↔ Ethiopian Date
```

### Key Constants:
- **Ethiopian Epoch**: JDN 1723856 (August 29, 8 CE in Julian calendar)
- **Year Offset**: Ethiopian calendar is approximately 7-8 years behind Gregorian
- **Ethiopian New Year**: Meskerem 1 = September 11 (or 12 in leap years)

### Ethiopian Calendar Structure:
- 12 months of 30 days each
- 13th month (Pagume) with 5 days (6 in leap years)
- Leap years occur every 4 years (similar to Julian calendar)

### Conversion Accuracy:
The conversion algorithms in both JavaScript and PHP produce identical results with an accuracy of 1 day or better, which is standard for calendar conversion systems.

## Data Flow

1. **User Input**:
   - User clicks on date field
   - Datepicker popup appears
   - User selects date in Ethiopian calendar

2. **JavaScript Processing**:
   - Selected Ethiopian date is converted to Gregorian using `EthiopianCalendar.toGregorian()`
   - Display field shows formatted Ethiopian date (optionally with Gregorian)
   - Hidden field stores Gregorian date in ISO format (YYYY-MM-DD)

3. **Form Submission**:
   - Hidden field value (ISO format) is submitted
   - Drupal stores the Gregorian date in the database

4. **Display**:
   - PHP formatter reads stored Gregorian date
   - Converts to Ethiopian using `_ethcal_ui_convert_to_ethiopian()`
   - Renders through Twig template with appropriate styling

## Testing

The integration has been verified to ensure:
- ✅ All JavaScript files load in correct order
- ✅ Ethiopian calendar conversion is accurate
- ✅ PHP and JavaScript conversions produce identical results
- ✅ Datepicker initializes correctly on field widgets
- ✅ Date selection and storage works properly
- ✅ Formatters display dates correctly
- ✅ Amharic language support works
- ✅ Views integration functions properly

## No External Dependencies

The ethcal-ui datepicker is **self-contained** within this module:
- No npm packages required
- No external CDN dependencies
- No separate GitHub repository
- Only depends on Drupal core libraries (jQuery, Drupal, drupalSettings)

## Summary

The ethcal-ui datepicker is a complete, integrated solution for Ethiopian calendar support in Drupal. It provides:
1. Accurate calendar conversion algorithms
2. Intuitive datepicker UI
3. Full Amharic language support
4. Multiple display options
5. Seamless Drupal integration
6. Views support

All components work together to provide a comprehensive Ethiopian calendar field system that stores dates in standard Gregorian format (for compatibility) while allowing input and display in the Ethiopian calendar system.
