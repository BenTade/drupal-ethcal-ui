# Developer Documentation

This document provides technical information for developers who want to extend, modify, or integrate with the Ethiopian Calendar UI module.

## Architecture Overview

The module follows Drupal's plugin architecture and consists of several key components:

### Component Structure

```
ethcal_ui/
├── Field Type (Storage)
│   └── EthiopianDateItem
├── Field Widget (Input)
│   └── EthiopianDateWidget
├── Field Formatters (Display)
│   ├── EthiopianDateDefaultFormatter (Side-by-side)
│   ├── EthiopianDateMergedFormatter (Merged view)
│   └── EthiopianDateOnlyFormatter (Ethiopian only)
├── Views Integration
│   └── EthiopianDateField
└── JavaScript Libraries
    ├── ethiopian-calendar.js (Conversion engine)
    ├── ethiopian-datepicker.js (UI component)
    └── ethcal-widget.js (Drupal behavior)
```

## Data Storage

### Storage Format

Dates are stored in the database as ISO 8601 strings (YYYY-MM-DD) using the Gregorian calendar:

```php
// Field schema
[
  'columns' => [
    'value' => [
      'type' => 'varchar',
      'length' => 20,
      'not null' => FALSE,
    ],
  ],
]
```

### Why Gregorian Storage?

1. **Database compatibility**: Standard SQL date functions work out of the box
2. **Interoperability**: Easy integration with other Drupal date fields
3. **Views integration**: Native date filtering and sorting
4. **Data exchange**: Standard format for APIs and exports

## Calendar Conversion Algorithm

### Gregorian to Ethiopian

The conversion uses Julian Day Number (JDN) as an intermediate:

```
Gregorian Date → JDN → Ethiopian Date
```

**Key constants:**
- Ethiopian epoch: JDN 1724220
- Year offset: ~7-8 years
- Ethiopian year start: Gregorian Sept 11 (or Sept 12 in leap years)

### Implementation

```javascript
// In ethiopian-calendar.js
gregorianToJDN: function(year, month, day) {
  var a = Math.floor((14 - month) / 12);
  var y = year + 4800 - a;
  var m = month + 12 * a - 3;
  
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + 
         Math.floor(y / 4) - Math.floor(y / 100) + 
         Math.floor(y / 400) - 32045;
}
```

### Ethiopian Calendar Structure

- **13 months**: 12 months of 30 days + Pagume (5-6 days)
- **Leap year**: Every 4 years (aligned with Gregorian)
- **Day 1**: Starts at sunset (not implemented in this version)

## Plugin API

### Creating a Custom Field Type

```php
<?php

namespace Drupal\mymodule\Plugin\Field\FieldType;

use Drupal\ethcal_ui\Plugin\Field\FieldType\EthiopianDateItem;

/**
 * @FieldType(
 *   id = "my_custom_ethiopian_date",
 *   label = @Translation("Custom Ethiopian Date"),
 *   default_widget = "ethiopian_date_widget",
 *   default_formatter = "ethiopian_date_default"
 * )
 */
class MyCustomEthiopianDateItem extends EthiopianDateItem {
  
  // Add custom properties or methods
  
}
```

### Creating a Custom Widget

```php
<?php

namespace Drupal\mymodule\Plugin\Field\FieldWidget;

use Drupal\ethcal_ui\Plugin\Field\FieldWidget\EthiopianDateWidget;

/**
 * @FieldWidget(
 *   id = "my_ethiopian_widget",
 *   label = @Translation("My Ethiopian Widget"),
 *   field_types = {
 *     "ethiopian_date"
 *   }
 * )
 */
class MyEthiopianWidget extends EthiopianDateWidget {
  
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    $element = parent::formElement($items, $delta, $element, $form, $form_state);
    
    // Customize the element
    $element['display']['#attributes']['placeholder'] = $this->t('Select date...');
    
    return $element;
  }
  
}
```

### Creating a Custom Formatter

```php
<?php

namespace Drupal\mymodule\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FormatterBase;

/**
 * @FieldFormatter(
 *   id = "ethiopian_date_custom",
 *   label = @Translation("Custom Ethiopian Date Display"),
 *   field_types = {
 *     "ethiopian_date"
 *   }
 * )
 */
class CustomEthiopianFormatter extends FormatterBase {
  
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];
    
    foreach ($items as $delta => $item) {
      $elements[$delta] = [
        '#markup' => $this->formatCustomDate($item->value),
      ];
    }
    
    return $elements;
  }
  
  protected function formatCustomDate($value) {
    // Custom formatting logic
    return $value;
  }
  
}
```

## JavaScript API

### Using the Calendar Conversion Library

```javascript
// Convert current date to Ethiopian
var gregorianDate = new Date();
var ethiopianDate = EthiopianCalendar.toEthiopian(gregorianDate);

console.log(ethiopianDate);
// Output: { year: 2014, month: 3, day: 15 }

// Convert Ethiopian to Gregorian
var gregDate = EthiopianCalendar.toGregorian(2014, 3, 15);
console.log(gregDate);
// Output: Date object for Gregorian date

// Format Ethiopian date
var formatted = EthiopianCalendar.format(ethiopianDate, true); // Amharic
console.log(formatted);
// Output: "፲፭ ኅዳር ፪ሺ፲፬"

// Check leap year
var isLeap = EthiopianCalendar.isLeapYear(2015);
console.log(isLeap);
// Output: true or false

// Get days in month
var days = EthiopianCalendar.getDaysInMonth(2014, 13);
console.log(days);
// Output: 5 or 6
```

### Creating a Custom Datepicker

```javascript
(function ($) {
  'use strict';

  $.fn.myCustomEthiopianPicker = function(options) {
    return this.each(function() {
      var $input = $(this);
      
      // Use the base datepicker
      $input.ethiopianDatepicker({
        useAmharic: true,
        showGregorian: true,
        onSelect: function(ethDate, gregDate) {
          // Custom behavior
          console.log('Selected:', ethDate, gregDate);
          options.onSelect && options.onSelect(ethDate, gregDate);
        }
      });
      
      // Add custom enhancements
      $input.on('focus', function() {
        // Custom focus behavior
      });
    });
  };

})(jQuery);
```

## Theming

### Template Suggestions

The module provides template suggestions for theming:

```
ethcal-date-sidebyside.html.twig
ethcal-date-sidebyside--[view-mode].html.twig
ethcal-date-sidebyside--[bundle].html.twig
ethcal-date-sidebyside--[bundle]--[view-mode].html.twig
```

### Preprocess Functions

```php
<?php

/**
 * Implements hook_preprocess_ethcal_date_sidebyside().
 */
function mytheme_preprocess_ethcal_date_sidebyside(&$variables) {
  // Add custom variables
  $variables['custom_class'] = 'my-custom-class';
  
  // Modify date format
  if (!empty($variables['gregorian_formatted'])) {
    $variables['gregorian_formatted'] = strtoupper($variables['gregorian_formatted']);
  }
}

/**
 * Implements hook_preprocess_HOOK() for all Ethiopian date templates.
 */
function mytheme_preprocess_ethcal_date(&$variables) {
  // Common preprocessing for all formatters
  $variables['attributes']['class'][] = 'ethiopian-date-display';
}
```

### Custom CSS

```css
/* Override default styles */
.ethiopian-datepicker {
  /* Custom datepicker styles */
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.ethcal-day {
  /* Custom day cell styles */
  border-radius: 50%;
  transition: all 0.3s ease;
}

.ethcal-day:hover {
  transform: scale(1.1);
  background: #0073aa;
  color: white;
}

/* Amharic text enhancement */
.ethcal-amharic {
  font-family: 'Noto Sans Ethiopic', sans-serif;
  font-size: 1.1em;
  line-height: 1.6;
}
```

## Database Queries

### Querying Ethiopian Date Fields

```php
<?php

// Using Entity Query
$query = \Drupal::entityQuery('node')
  ->condition('type', 'event')
  ->condition('field_event_date', '2023-09-11', '>=')
  ->sort('field_event_date', 'ASC');

$nids = $query->execute();

// Using Database API
$query = \Drupal::database()->select('node__field_event_date', 'fd')
  ->fields('fd', ['entity_id', 'field_event_date_value'])
  ->condition('fd.field_event_date_value', '2023-01-01', '>=')
  ->condition('fd.field_event_date_value', '2023-12-31', '<=');

$results = $query->execute()->fetchAll();
```

## Testing

### Unit Testing Example

```php
<?php

namespace Drupal\Tests\ethcal_ui\Unit;

use Drupal\Tests\UnitTestCase;

/**
 * Tests Ethiopian calendar conversion.
 *
 * @group ethcal_ui
 */
class EthiopianCalendarTest extends UnitTestCase {

  /**
   * Test Gregorian to Ethiopian conversion.
   */
  public function testGregorianToEthiopian() {
    // Test known date: Sept 11, 2021 = Meskerem 1, 2014
    $date = new \DateTime('2021-09-11');
    $ethiopian = _ethcal_ui_convert_to_ethiopian($date, FALSE);
    
    $this->assertStringContainsString('Meskerem', $ethiopian);
    $this->assertStringContainsString('2014', $ethiopian);
  }

  /**
   * Test leap year calculation.
   */
  public function testLeapYear() {
    // 2015 Ethiopian = 2022/2023 Gregorian (leap year)
    // Test the PHP conversion function
    $this->assertTrue($this->isEthiopianLeapYear(2015));
    $this->assertFalse($this->isEthiopianLeapYear(2014));
  }
  
  protected function isEthiopianLeapYear($year) {
    return ($year + 1) % 4 === 0;
  }

}
```

### JavaScript Testing Example

```javascript
// Using QUnit
QUnit.test("Ethiopian Calendar Conversion", function(assert) {
  // Test conversion
  var date = new Date(2021, 8, 11); // Sept 11, 2021
  var ethDate = EthiopianCalendar.toEthiopian(date);
  
  assert.equal(ethDate.year, 2014, "Year should be 2014");
  assert.equal(ethDate.month, 1, "Month should be 1 (Meskerem)");
  assert.equal(ethDate.day, 1, "Day should be 1");
  
  // Test reverse conversion
  var gregDate = EthiopianCalendar.toGregorian(2014, 1, 1);
  assert.equal(gregDate.getFullYear(), 2021, "Year should be 2021");
  assert.equal(gregDate.getMonth(), 8, "Month should be 8 (Sept)");
  assert.equal(gregDate.getDate(), 11, "Day should be 11");
});
```

## Performance Considerations

### Caching

```php
<?php

// Cache converted dates
$cid = 'ethcal:' . $gregorian_date;
$cached = \Drupal::cache()->get($cid);

if ($cached) {
  $ethiopian_date = $cached->data;
} else {
  $ethiopian_date = _ethcal_ui_convert_to_ethiopian($date);
  \Drupal::cache()->set($cid, $ethiopian_date, Cache::PERMANENT);
}
```

### Batch Processing

```php
<?php

// Process large datasets in batches
$batch = [
  'title' => t('Converting dates...'),
  'operations' => [],
  'finished' => 'mymodule_batch_finished',
];

foreach ($nids as $nid) {
  $batch['operations'][] = [
    'mymodule_convert_date',
    [$nid]
  ];
}

batch_set($batch);
```

## Security Considerations

1. **Input Validation**: Always validate date inputs
2. **SQL Injection**: Use parameterized queries
3. **XSS Prevention**: Sanitize output with appropriate filters
4. **Access Control**: Respect field access permissions

## Extending the Module

### Adding New Calendar Systems

To add support for other calendar systems (e.g., Islamic, Hebrew):

1. Create conversion functions in JavaScript
2. Add formatter options
3. Update widget to support calendar selection
4. Add appropriate month names and numerals

### Internationalization

```php
<?php

// Add translation support
$translated = t('Ethiopian Calendar', [], ['context' => 'calendar']);

// In JavaScript
Drupal.t('Select date');
```

## Debugging

### Enable Debug Mode

```javascript
// In your custom JS
Drupal.behaviors.ethcalDebug = {
  attach: function(context, settings) {
    // Log conversion details
    console.log('Ethiopian Calendar Debug:');
    console.log('Settings:', settings.ethcalUi);
    
    // Test conversion
    var testDate = new Date();
    console.log('Test conversion:', EthiopianCalendar.toEthiopian(testDate));
  }
};
```

### PHP Debugging

```php
<?php

// Enable detailed logging
\Drupal::logger('ethcal_ui')->debug('Converting date: @date', [
  '@date' => $gregorian_date,
]);
```

## Contributing

To contribute to the module:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

### Code Standards

- Follow Drupal Coding Standards
- Use PHP CodeSniffer
- Document all public methods
- Add inline comments for complex logic

## Resources

- [Drupal Field API](https://www.drupal.org/docs/drupal-apis/entity-api/field-types-formatters-and-widgets)
- [Drupal Plugin API](https://www.drupal.org/docs/drupal-apis/plugin-api)
- [Ethiopian Calendar System](https://en.wikipedia.org/wiki/Ethiopian_calendar)
- [Julian Day Number](https://en.wikipedia.org/wiki/Julian_day)

## API Reference

### PHP Functions

- `_ethcal_ui_convert_to_ethiopian($date, $use_amharic)`: Convert Gregorian to Ethiopian
- `_ethcal_ui_to_amharic_number($num)`: Convert numbers to Amharic numerals

### JavaScript Functions

- `EthiopianCalendar.toEthiopian(date)`: Convert to Ethiopian
- `EthiopianCalendar.toGregorian(year, month, day)`: Convert to Gregorian
- `EthiopianCalendar.format(ethDate, useAmharic)`: Format date
- `EthiopianCalendar.isLeapYear(year)`: Check leap year
- `EthiopianCalendar.getDaysInMonth(year, month)`: Get days in month

### jQuery Plugin

- `$('.selector').ethiopianDatepicker(options)`: Initialize datepicker

## Support

For technical questions:
- Check existing issues on GitHub
- Review the documentation
- Ask in the Drupal community forums
