# Ethiopian Calendar UI for Drupal 11

A Drupal 11 module that provides an Ethiopian calendar datepicker widget and formatters for date fields, with full Views integration.

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

### Requirements

This module includes bundled Ethiopian calendar UI components and requires the `andegna/calender` package for date conversion, which is automatically installed via Composer.

### Installation Steps

1. Install the module using Composer (recommended):
   ```bash
   composer require drupal/ethcal_ui
   ```

2. Enable the module:
   ```bash
   drush en ethcal_ui
   ```

3. Clear cache:
   ```bash
   drush cr
   ```

**Note**: The module includes bundled Ethiopian calendar UI components. If you install the module manually (not via Composer), you must ensure the `andegna/calender` dependency is installed by running `composer install` in your Drupal root directory.

## Usage

### Adding an Ethiopian Date Field

1. Go to Structure > Content types > [Your content type] > Manage fields
2. Click "Add field"
3. Select "Date" as the field type (from the core datetime module)
4. Configure the field settings
5. In the "Manage form display" tab, select "Ethiopian Date Picker" as the widget
6. Configure the widget settings:
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
2. Add your date field to the view
3. The field will use the Ethiopian Date Field handler
4. Configure display format and Amharic option in field settings
5. Use date filters to filter content by date ranges

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
- Composer (for dependency management)
- `andegna/calender` package (automatically installed via Composer)
- Field module (core)
- Datetime module (core)
- Views module (core)

## Technical Details

The module extends the standard Drupal datetime field with Ethiopian calendar functionality. Dates are stored internally in ISO 8601 format using the Gregorian calendar for database compatibility and interoperability. Conversion to/from Ethiopian calendar happens on display and input through the widget and formatters.

This module includes bundled Ethiopian calendar UI components:
- JavaScript UI components for Ethiopian calendar selection
- PHP classes for server-side date conversion using the `andegna/calender` library
- Pre-built, optimized JavaScript and CSS files

### JavaScript Libraries

The module includes bundled libraries:
- `ethcal-ui.umd.js`: Complete Ethiopian calendar UI library
- `ethcal-widget.js`: Drupal behavior for field widget integration

### PHP Classes

#### Drupal Classes
- `EthiopianDateWidget`: Field widget plugin for datetime fields
- `EthiopianDateDefaultFormatter`: Side-by-side formatter for datetime fields
- `EthiopianDateMergedFormatter`: Merged view formatter for datetime fields
- `EthiopianDateOnlyFormatter`: Ethiopian-only formatter for datetime fields
- `EthiopianDateField`: Views field handler for datetime fields

#### Bundled Classes
- `EthiopianCalendar`: Server-side date conversion using andegna/calender library

## Development

### File Structure

```
ethcal_ui/
├── css/
│   ├── ethcal-widget.css
│   └── ethcal-formatter.css
├── js/
│   └── ethcal-widget.js          # Drupal integration
├── lib/                          # Bundled Ethiopian calendar components
│   ├── css/
│   │   └── ethcal-ui.css
│   ├── js/
│   │   └── ethcal-ui.umd.js
│   └── php/
│       └── EthiopianCalendar.php
├── src/
│   └── Plugin/
│       ├── Field/
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
├── composer.json                 # Requires andegna/calender for date conversion
├── ethcal_ui.info.yml
├── ethcal_ui.libraries.yml       # References bundled lib/ files
├── ethcal_ui.module
├── ethcal_ui.views.inc
└── README.md
```

**Note**: The module includes bundled Ethiopian calendar components in the `lib/` directory:
- JavaScript calendar UI (`lib/js/ethcal-ui.umd.js`)
- CSS styling (`lib/css/ethcal-ui.css`)
- PHP date conversion (`lib/php/EthiopianCalendar.php`)

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