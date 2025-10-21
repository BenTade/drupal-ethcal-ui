# Ethiopian Calendar UI for Drupal 11

A Drupal 11 module that provides an Ethiopian calendar datepicker field with multiple display formatters and full Views integration.

## Features

- **Ethiopian Calendar Datepicker**: Intuitive popup calendar interface for selecting Ethiopian dates
- **Automatic Conversion**: Seamless conversion between Ethiopian and Gregorian calendar systems
- **Multiple Display Formats**:
  - Side-by-side view (Ethiopian | Gregorian)
  - Merged view (Ethiopian with Gregorian in parentheses)
  - Ethiopian-only view
- **Amharic Support**: Full support for Amharic month names and numerals
- **Field Widget**: Easy-to-use field widget for content editing
- **Field Formatters**: Three different formatters for displaying dates
- **Views Integration**: Complete Views support for filtering and displaying dates
- **Drupal 11 Compatible**: Built specifically for Drupal 10 and 11

## Installation

1. Copy the `ethcal_ui` directory to your Drupal `modules/custom` directory
2. Enable the module: `drush en ethcal_ui`
3. Clear cache: `drush cr`

## Usage

### Adding an Ethiopian Date Field

1. Go to Structure > Content types > [Your content type] > Manage fields
2. Click "Add field"
3. Select "Ethiopian Date" as the field type
4. Configure the field settings
5. Configure the widget settings:
   - Enable "Use Amharic words and numbers" for Amharic display
   - Choose whether to show Gregorian date alongside
   - Select if you want Ethiopian calendar only

### Display Configuration

1. Go to Structure > Content types > [Your content type] > Manage display
2. Choose from three available formatters:
   - **Ethiopian Date (Side by Side)**: Shows both calendars side by side
   - **Ethiopian Date (Merged View)**: Shows Ethiopian date with Gregorian in parentheses
   - **Ethiopian Date Only**: Shows only the Ethiopian date

### Using in Views

1. Create or edit a View
2. Add the Ethiopian Date field
3. Configure display format and Amharic option in field settings
4. Use date filters to filter content by date ranges

## Ethiopian Calendar

The Ethiopian calendar (ዓመተ ምሕረት) is the principal calendar used in Ethiopia. It has:
- 13 months (12 months of 30 days + Pagume with 5 or 6 days)
- Approximately 7-8 years behind the Gregorian calendar
- New Year starts on September 11 (or September 12 in leap years)

## Month Names

### Amharic
መስከረም, ጥቅምት, ኅዳር, ታኅሳስ, ጥር, የካቲት, መጋቢት, ሚያዝያ, ግንቦት, ሰኔ, ሐምሌ, ነሐሴ, ጳጉሜን

### English
Meskerem, Tikimt, Hidar, Tahsas, Tir, Yekatit, Megabit, Miazia, Ginbot, Sene, Hamle, Nehase, Pagume

## Requirements

- Drupal 10 or 11
- PHP 8.1 or higher
- Field module (core)
- Datetime module (core)
- Views module (core)

## Technical Details

The module stores dates internally in ISO 8601 format (YYYY-MM-DD) using the Gregorian calendar for database compatibility and interoperability. Conversion to/from Ethiopian calendar happens on display and input.

### JavaScript Libraries

- `ethiopian-calendar.js`: Core conversion library between calendars
- `ethiopian-datepicker.js`: jQuery datepicker plugin
- `ethcal-widget.js`: Drupal behavior for field widget integration

### PHP Classes

- `EthiopianDateItem`: Field type plugin
- `EthiopianDateWidget`: Field widget plugin
- `EthiopianDateDefaultFormatter`: Side-by-side formatter
- `EthiopianDateMergedFormatter`: Merged view formatter
- `EthiopianDateOnlyFormatter`: Ethiopian-only formatter
- `EthiopianDateField`: Views field handler

## Development

### File Structure

```
ethcal_ui/
├── css/
│   ├── ethiopian-datepicker.css
│   ├── ethcal-widget.css
│   └── ethcal-formatter.css
├── js/
│   ├── ethiopian-calendar.js
│   ├── ethiopian-datepicker.js
│   └── ethcal-widget.js
├── src/
│   └── Plugin/
│       ├── Field/
│       │   ├── FieldType/
│       │   │   └── EthiopianDateItem.php
│       │   ├── FieldWidget/
│       │   │   └── EthiopianDateWidget.php
│       │   └── FieldFormatter/
│       │       ├── EthiopianDateDefaultFormatter.php
│       │       ├── EthiopianDateMergedFormatter.php
│       │       └── EthiopianDateOnlyFormatter.php
│       └── views/
│           └── field/
│               └── EthiopianDateField.php
├── templates/
│   ├── ethcal-date-sidebyside.html.twig
│   ├── ethcal-date-merged.html.twig
│   └── ethcal-date-only.html.twig
├── ethcal_ui.info.yml
├── ethcal_ui.libraries.yml
├── ethcal_ui.module
├── ethcal_ui.views.inc
└── README.md
```

## Support

For issues, feature requests, or contributions, please visit the project repository.

## License

This project follows Drupal's licensing. See LICENSE.txt for details.

## Credits

Developed for integration of Ethiopian calendar functionality into Drupal 11 content management system.