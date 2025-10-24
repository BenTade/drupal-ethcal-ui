# Changelog

All notable changes to the Ethiopian Calendar UI module will be documented in this file.

## [0.1.0] - 2025-10-24

### Release
- First stable release of Ethiopian Calendar UI module
- Production-ready version with complete feature set
- All core functionality tested and verified
- Documentation finalized

## [2.0.0] - 2025-10-21

### Changed - BREAKING
- **Major architectural change**: Module no longer provides a custom field type
- Widget and formatters now extend the standard Drupal `datetime` field type
- Widget can be used with any Date field
- Formatters can be used with any Date field

### Removed
- Custom `ethiopian_date` field type
- `EthiopianDateItem` field type class
- Field storage configuration file

### Updated
- `EthiopianDateWidget` now works with `datetime` field type
- All three formatters now work with `datetime` field type
- Views integration updated to use `hook_field_views_data_alter()`
- Documentation updated to reflect new architecture
- Module description and help text updated

### Migration Notes
- Existing `ethiopian_date` fields will need to be migrated to standard Date fields
- Configure the Date field to use "Ethiopian Date Picker" widget
- Configure display to use Ethiopian calendar formatters

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
