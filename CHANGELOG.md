# Changelog

All notable changes to the Ethiopian Calendar UI module will be documented in this file.

## [Unreleased]

### Added
- **Widget enhancements**: Added support for all ethcal-ui calendar options
  - Use Ethiopic numerals option (፩፪፫...)
  - Merged calendar view with both calendars in one grid
  - Primary calendar selection (Ethiopian or Gregorian) for merged view
  - Conditional visibility of options based on merged view setting
- **Formatter enhancements**: Added comprehensive date formatting options
  - Show/hide individual calendars in side-by-side formatter
  - Ethiopian date format selection (short, medium, long)
  - Gregorian date format selection (short, medium, long)
  - Date format options for all three formatters
- **Date formatting improvements**:
  - Short format: 1/1/2015 or ፩/፩/፪፻፲፭
  - Medium format: 1 Meskerem 2015 or ፩ መስከረም ፪፻፲፭
  - Long format: Meskerem 1, 2015 or መስከረም ፩, ፪፻፲፭

### Changed
- Updated widget to pass all options to ethcal-ui library
- Enhanced template preprocess functions to support new formatting options
- Improved settings summaries for better admin UX

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
