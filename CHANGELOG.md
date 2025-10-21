# Changelog

All notable changes to the Ethiopian Calendar UI module will be documented in this file.

## [1.0.0] - 2025-10-21

### Added
- Initial release of Ethiopian Calendar UI module for Drupal 11
- Ethiopian Date field type with storage
- Ethiopian Date Picker widget with popup calendar interface
- Three field formatters:
  - Side-by-side view (Ethiopian | Gregorian)
  - Merged view (Ethiopian with Gregorian in parentheses)
  - Ethiopian-only view
- Full Amharic language support for month names and numerals
- JavaScript libraries for Ethiopian calendar conversion
- Ethiopian calendar datepicker jQuery plugin
- Views integration with custom field handler
- Template files for all display formats
- Comprehensive documentation and examples
- Support for Drupal 10 and 11

### Features
- Automatic conversion between Ethiopian and Gregorian calendars
- Configurable widget settings (Amharic, show Gregorian, Ethiopian only)
- Configurable formatter settings (date format, Amharic)
- Views field handler with format options
- Responsive datepicker design
- Support for all 13 Ethiopian months including Pagume

### Technical Details
- Uses ISO 8601 date format for storage (Gregorian)
- Client-side conversion using JavaScript
- Server-side conversion for rendering
- Proper field API integration
- Views data integration
- Theme system integration with Twig templates
