# Changelog

All notable changes to the Ethiopian Calendar UI module will be documented in this file.

## [1.0.1] - 2025-10-24

### Changed
- **Breaking change**: Bundled Ethiopian calendar UI components directly into the module
- Removed external dependency on `bentade/ethcal-ui` package
- Now requires `andegna/calender` directly for date conversion
- Updated library paths to use bundled files in `lib/` directory
- Updated documentation to reflect bundled components

### Fixed
- Fixed composer package resolution error where `bentade/ethcal-ui` could not be found
- Module can now be installed without requiring VCS repository definitions

## [1.0.0] - 2025-10-24

### Added
- Initial stable release of Ethiopian Calendar UI module for Drupal 10 and 11
- Ethiopian Date Picker widget for standard Drupal `datetime` fields
- Three field formatters for Ethiopian calendar display:
  - Side-by-side view (Ethiopian | Gregorian)
  - Merged view (Ethiopian with Gregorian in parentheses)
  - Ethiopian-only view
- Full Amharic language support for month names and numerals
- Bundled JavaScript libraries for Ethiopian calendar conversion
- Ethiopian calendar datepicker jQuery plugin
- Views integration for filtering and displaying dates
- Template files for all display formats
- Comprehensive documentation and examples
- Support for Drupal 10 and 11

### Features
- Widget and formatters extend the standard Drupal `datetime` field type
- Automatic conversion between Ethiopian and Gregorian calendars
- Configurable widget settings (Amharic, show Gregorian, Ethiopian only)
- Configurable formatter settings (date format, Amharic)
- Views field handler with format options
- Responsive datepicker design
- Support for all 13 Ethiopian months including Pagume

### Technical Details
- Uses ISO 8601 date format for storage (Gregorian)
- Client-side conversion using JavaScript
- Server-side conversion for rendering via bundled `EthiopianCalendar` class
- Proper field API integration with datetime fields
- Views data integration via `hook_field_views_data_alter()`
- Theme system integration with Twig templates
