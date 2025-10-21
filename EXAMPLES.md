# Usage Examples

This document provides practical examples of using the Ethiopian Calendar UI module in various scenarios.

## Example 1: Event Date Field

### Scenario
You want to create an event content type with an Ethiopian date field for event dates.

### Steps

1. **Create the content type:**
   - Go to: Structure > Content types > Add content type
   - Name: "Event"
   - Description: "Ethiopian events and celebrations"
   - Click "Save and manage fields"

2. **Add the Ethiopian date field:**
   - Click "Add field"
   - Field type: "Ethiopian Date"
   - Label: "Event Date"
   - Click "Save and continue"
   - Use default storage settings
   - Click "Save field settings"

3. **Configure the widget:**
   - ☑ Use Amharic words and numbers
   - ☑ Show Gregorian date alongside
   - Click "Save settings"

4. **Configure the display:**
   - Go to: Manage display tab
   - Format: "Ethiopian Date (Side by Side)"
   - Click gear icon:
     - ☑ Use Amharic
     - Date format: "Medium"
   - Click "Save"

### Usage

When creating an event:
```
Title: የኢትዮጵያ አዲስ ዓመት (Ethiopian New Year)
Event Date: [Click field, select from datepicker]
  - Select: ፩ መስከረም ፪ሺ፲፬ (1 Meskerem 2014)
  - Displays as: 1 መስከረም 2014 (September 11, 2021)
```

## Example 2: Birth Date in User Profile

### Scenario
Add an Ethiopian birth date field to user profiles.

### Steps

1. **Add field to user entity:**
   - Go to: Configuration > People > Account settings
   - Click "Manage fields" tab
   - Add field: Ethiopian Date
   - Label: "Birth Date (Ethiopian)"

2. **Configure for birth dates:**
   - Widget settings:
     - ☑ Use Amharic words and numbers
     - ☐ Show Gregorian date alongside
     - ☑ Ethiopian calendar only

3. **Display configuration:**
   - Go to "Manage display" tab
   - Format: "Ethiopian Date Only"
   - ☑ Use Amharic

### Usage

Users enter their birth date in the familiar Ethiopian calendar format.

## Example 3: News Article Publication Date

### Scenario
Display article publication dates in both Ethiopian and Gregorian calendars.

### Steps

1. **Add field to Article:**
   - Structure > Content types > Article > Manage fields
   - Add field: "Ethiopian Publication Date"

2. **Widget configuration:**
   - ☑ Use Amharic words and numbers
   - ☑ Show Gregorian date alongside

3. **Display configuration:**
   - Format: "Ethiopian Date (Merged View)"
   - Results in display like: "፲፭ ጥር ፪ሺ፲፬ (January 23, 2022)"

## Example 4: Views - Upcoming Events

### Scenario
Create a View that lists upcoming events sorted by Ethiopian date.

### Steps

1. **Create the View:**
   - Structure > Views > Add view
   - View name: "Upcoming Events"
   - Show: Content of type Event
   - Create a page

2. **Add fields:**
   - Add field: "Title"
   - Add field: "Event Date"
     - Display format: "Ethiopian Date (Side by Side)"
     - ☑ Use Amharic

3. **Add filter:**
   - Add filter criteria: "Event Date"
   - Operator: "Is greater than or equal to"
   - Value: "now"

4. **Sort criteria:**
   - Add sort: "Event Date"
   - Order: Ascending

5. **Save the View**

### Result

A list of upcoming events showing:
```
Ethiopian New Year
፩ መስከረም ፪ሺ፲፭ | September 11, 2022

Meskel Celebration  
፲፯ መስከረም ፪ሺ፲፭ | September 27, 2022
```

## Example 5: Date Range Filter in Views

### Scenario
Create a View with exposed filters for date ranges.

### Steps

1. **Create View:**
   - Show: Content with Ethiopian Date field

2. **Add exposed filter:**
   - Filter: Event Date
   - Expose this filter: ☑
   - Operator: "Between"
   - Label: "Date Range"

3. **Configuration:**
   - Users can filter content by date range
   - Dates stored in ISO format work with Views date filters

## Example 6: Multiple Date Format Display

### Scenario
Show the same date in different formats on a single page.

### Implementation in Template

```twig
{# In your node template (node--event.html.twig) #}
<div class="event-dates">
  <div class="date-ethiopian-only">
    {{ content.field_event_date|field_value(0) }}
  </div>
  
  <div class="date-sidebyside">
    {# Configure a second view mode or use Views field #}
  </div>
</div>
```

## Example 7: Custom Date Formatting in Code

### PHP Example

```php
<?php

// In a custom module or theme preprocess function
function mymodule_preprocess_node(&$variables) {
  $node = $variables['node'];
  
  if ($node->hasField('field_event_date')) {
    $date_value = $node->get('field_event_date')->value;
    
    if (!empty($date_value)) {
      // Use the conversion function
      $ethiopian_date = _ethcal_ui_convert_to_ethiopian(
        new DateTime($date_value),
        TRUE  // Use Amharic
      );
      
      $variables['ethiopian_date_custom'] = $ethiopian_date;
    }
  }
}
```

### Twig Template Usage

```twig
{# In your template #}
{% if ethiopian_date_custom %}
  <div class="custom-ethiopian-date">
    {{ ethiopian_date_custom }}
  </div>
{% endif %}
```

## Example 8: JavaScript API Usage

### Custom JavaScript Implementation

```javascript
(function ($, Drupal) {
  'use strict';

  Drupal.behaviors.customEthiopianDate = {
    attach: function (context, settings) {
      // Get Ethiopian date from Gregorian
      var today = new Date();
      var ethDate = EthiopianCalendar.toEthiopian(today);
      
      console.log('Ethiopian Date:');
      console.log('Year:', ethDate.year);
      console.log('Month:', ethDate.month);
      console.log('Day:', ethDate.day);
      
      // Format for display
      var formatted = EthiopianCalendar.format(ethDate, true); // Use Amharic
      $('.custom-ethiopian-display', context).text(formatted);
      
      // Convert back to Gregorian
      var gregDate = EthiopianCalendar.toGregorian(
        ethDate.year,
        ethDate.month,
        ethDate.day
      );
      console.log('Gregorian:', gregDate);
    }
  };

})(jQuery, Drupal);
```

## Example 9: REST API Integration

### Exposing Ethiopian Dates via REST

When using Drupal's REST API, Ethiopian dates are stored as ISO 8601 strings:

```json
{
  "title": "Ethiopian New Year",
  "field_event_date": "2022-09-11",
  "type": "event"
}
```

Client applications can use the JavaScript library to convert:

```javascript
// In your client app
const response = await fetch('/api/events/1');
const event = await response.json();

// Convert the date
const gregDate = new Date(event.field_event_date);
const ethDate = EthiopianCalendar.toEthiopian(gregDate);
const formatted = EthiopianCalendar.format(ethDate, true);

console.log(formatted); // ፩ መስከረም ፪ሺ፲፬
```

## Example 10: Theming the Datepicker

### Custom CSS Override

```css
/* In your theme's CSS file */

.ethiopian-datepicker {
  /* Custom styling */
  background: linear-gradient(to bottom, #009543, #fcdd09, #da121a);
  border-color: #009543;
}

.ethcal-header {
  background: rgba(0, 149, 67, 0.1);
}

.ethcal-day:hover {
  background: #009543;
  color: white;
}

/* Amharic text styling */
.ethcal-amharic {
  font-family: 'Noto Sans Ethiopic', 'Abyssinica SIL', 'Ethiopia Jiret', sans-serif;
  font-size: 16px;
}
```

## Tips and Best Practices

1. **Always use Amharic for Ethiopian-centric content** to maintain cultural authenticity

2. **Show both calendars** when your audience might include international users

3. **Use date ranges carefully** - remember the Ethiopian calendar is about 7-8 years behind

4. **Consider time zones** - Ethiopian calendar dates should be interpreted in Ethiopian time context

5. **Test thoroughly** - especially around the 13th month (Pagume) and New Year transitions

6. **Validate user input** - ensure dates make sense in both calendar systems

7. **Use Views** for complex date queries rather than custom code when possible

8. **Cache considerations** - date conversions are computationally light but cache rendered output for performance

## Common Patterns

### Pattern 1: Birthday Field
- Use Ethiopian only
- Enable Amharic
- Don't show Gregorian

### Pattern 2: News/Events
- Side-by-side or merged
- Enable Amharic based on audience
- Show both calendars

### Pattern 3: Historical Records
- Side-by-side view
- English month names
- Include both for reference

### Pattern 4: Government/Official
- Ethiopian only
- Amharic required
- Official documentation style

## Further Reading

- [README.md](README.md) - Full module documentation
- [INSTALL.md](INSTALL.md) - Installation guide
- Ethiopian Calendar on Wikipedia
- Ethiopian Time and Calendar System
