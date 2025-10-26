# Ethiopian Calendar Field Widget Features

## Overview

The Ethiopian Calendar field widget provides a user-friendly interface for selecting dates using the Ethiopian calendar system. Inspired by best practices from the Drupal smart_date module, the widget seamlessly integrates with Drupal's field system while maintaining the look and feel of core date fields.

## Key Features

### 1. Core Date Field Appearance

The widget is styled to closely match Drupal's native date field:
- Textfield input with calendar icon
- Readonly field to ensure date selection through the picker
- Compatible with modern admin themes (Claro, Gin)
- Proper focus states and accessibility support
- Error state styling
- Required field indicators

### 2. Dual Calendar Display Modes

The widget supports two distinct calendar display modes:

#### Side-by-Side View
When "Show Gregorian calendar side-by-side" is enabled (and merged view is disabled):
- Two separate calendars are displayed simultaneously
- Ethiopian calendar on the left
- Gregorian calendar on the right
- Each calendar can be navigated independently
- Clicking a date in either calendar selects that date
- Both calendars highlight the same selected date
- Ideal for users who need to reference both calendar systems

#### Merged Calendar View
When "Merged calendar view" is enabled:
- Single calendar display with dual date information
- Each day cell shows both Ethiopian and Gregorian dates
- Primary calendar (configurable) determines the calendar structure
- Secondary date appears as a small overlay in each cell
- More compact than side-by-side view
- Easier to see correspondence between calendar systems

### 3. Configurable Primary Calendar

In merged view mode, you can choose which calendar system is primary:
- **Ethiopian Primary**: Calendar follows Ethiopian month structure, Gregorian dates shown as secondary
- **Gregorian Primary**: Calendar follows Gregorian month structure, Ethiopian dates shown as secondary

### 4. Amharic Support

Full support for Amharic language:
- Amharic month names (መስከረም, ጥቅምት, ኅዳር, etc.)
- Amharic day names (እሁድ, ሰኞ, ማክሰኞ, etc.)
- Ethiopic numerals option (፩፪፫፬፭፮፯፰፱፲...)

### 5. Ethiopian-Only Mode

For users who only need the Ethiopian calendar:
- Hides Gregorian calendar reference
- Shows only Ethiopian calendar in popup
- Simplified interface

## Widget Configuration

### Settings

Configure the widget in the "Manage form display" page for your content type:

1. **Use Amharic words and numbers**
   - Display month and day names in Amharic script
   
2. **Use Ethiopic numerals**
   - Display date numbers using Ethiopic numerals (፩፪፫...)
   
3. **Merged calendar view**
   - Show both calendars in a single view with dual date display
   
4. **Primary calendar in merged view**
   - Choose Ethiopian or Gregorian as primary (only visible when merged view is enabled)
   
5. **Show Gregorian calendar side-by-side**
   - Display both calendars side-by-side (only visible when merged view is disabled)
   
6. **Ethiopian calendar only**
   - Only show Ethiopian calendar (only visible when merged view is disabled)

### Settings Summary

The widget displays a helpful summary in the field configuration:
- "Using Amharic" - when Amharic is enabled
- "Using Ethiopic numerals" - when Ethiopic numbers are enabled
- "Merged calendar view (ethiopian primary)" - in merged mode
- "Side-by-side calendar view (Ethiopian + Gregorian)" - in side-by-side mode
- "Ethiopian calendar only" - when only Ethiopian calendar is shown
- "No Gregorian reference" - when ethiopian_only is enabled

## User Experience

### Date Selection Flow

1. User clicks on the date field
2. Calendar popup appears with configured view (side-by-side or merged)
3. User navigates months/years using arrow buttons
4. User clicks on a date to select it
5. Selected date is displayed in the field
6. Calendar popup closes automatically

### Display Format

The field displays dates in different formats based on configuration:

- **Gregorian Primary**: `2024-10-26` (ISO format)
- **Ethiopian Primary**: `15/2/2017` (Day/Month/Year in Ethiopian calendar)
- **With Ethiopic Numerals**: `፲፭/፪/፪ሺ፲፯`

### Form Submission

Regardless of display format, dates are always submitted and stored in ISO 8601 format (YYYY-MM-DD) using the Gregorian calendar for:
- Database compatibility
- Interoperability with other Drupal modules
- Standard date filtering and sorting in Views

## Technical Details

### Architecture

```
EthiopianDateWidget (PHP)
  └─> Generates textfield with settings
      └─> Attaches ethcal_ui/widget library
          ├─> ethcal-widget.js (Drupal behavior)
          │   └─> Initializes EthiopianCalendarUI
          │       └─> lib/js/ethcal-ui.umd.js (calendar logic)
          └─> ethcal-widget.css (field styling)
              └─> lib/css/ethcal-ui.css (popup styling)
```

### Date Conversion

Date conversion happens automatically:
- On field load: ISO date → Ethiopian date (if Ethiopian primary)
- On date selection: Ethiopian/Gregorian → ISO date for storage
- Conversion uses the `EthiopianCalendar` class from the bundled library
- Julian Day Number (JDN) used as intermediate format

### Browser Compatibility

The widget works in all modern browsers:
- Chrome, Firefox, Safari, Edge
- Desktop and mobile devices
- Responsive design adapts to screen size

## Comparison with Core Date Field

| Feature | Core Date Field | Ethiopian Calendar Widget |
|---------|----------------|---------------------------|
| Input Type | Native HTML5 date picker | Custom calendar popup |
| Calendar System | Gregorian only | Ethiopian + Gregorian |
| Display Options | ISO format only | Multiple format options |
| Dual Calendar | No | Yes (side-by-side or merged) |
| Localization | Browser-dependent | Amharic built-in |
| Storage Format | ISO 8601 | ISO 8601 |
| Theme Integration | Core styling | Core-like styling |

## Examples

### Example 1: Side-by-Side View

**Configuration:**
- ☐ Merged calendar view
- ☑ Show Gregorian calendar side-by-side
- ☑ Use Amharic

**Result:** Two calendars shown side-by-side with Ethiopian calendar in Amharic on the left and Gregorian on the right.

### Example 2: Merged View with Ethiopian Primary

**Configuration:**
- ☑ Merged calendar view
- Primary calendar: Ethiopian
- ☑ Use Amharic

**Result:** Single calendar following Ethiopian month structure with small Gregorian dates overlaid on each cell.

### Example 3: Ethiopian Only

**Configuration:**
- ☐ Merged calendar view
- ☐ Show Gregorian calendar side-by-side
- ☑ Ethiopian calendar only
- ☑ Use Ethiopic numerals

**Result:** Single Ethiopian calendar with dates displayed in Ethiopic numerals.

## Best Practices

1. **Choose the right mode for your users:**
   - Side-by-side: When users need to frequently reference both calendars
   - Merged: When space is limited or for a cleaner interface
   - Ethiopian-only: For users exclusively using Ethiopian calendar

2. **Consider your audience:**
   - Enable Amharic for native Ethiopian speakers
   - Keep Gregorian reference for international users
   - Use side-by-side for users learning the Ethiopian calendar

3. **Performance:**
   - The calendar library is lightweight (~19KB minified)
   - Popup renders quickly with minimal overhead
   - Date conversion is fast (< 1ms per conversion)

## Troubleshooting

### Calendar doesn't appear
- Check that the `ethcal_ui/widget` library is loaded
- Verify JavaScript console for errors
- Ensure the EthiopianCalendarUI library is available

### Dates not saving correctly
- Check that form submission converts display format to ISO
- Verify the `data-iso-date` attribute is set on the input
- Check browser console for JavaScript errors

### Styling issues
- Clear Drupal cache
- Check for CSS conflicts with custom themes
- Verify admin theme compatibility (Claro/Gin)

## Future Enhancements

Potential improvements for future versions:
- Time picker integration for datetime fields
- Date range selection
- Recurring date patterns
- Calendar printing/export
- More localization options (Oromo, Tigrinya, etc.)
