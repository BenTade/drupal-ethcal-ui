# New Features - Widget and Formatter Options

This document describes the new options added to the Ethiopian Calendar UI module.

## Widget Options (Field Form Display)

When configuring the "Ethiopian Date Picker" widget in the "Manage form display" tab, you now have the following options:

### Basic Options

1. **Use Amharic words and numbers**
   - Display month names and numbers in Amharic script
   - Example: መስከረም instead of Meskerem

2. **Use Ethiopic numerals**
   - Display date numbers using Ethiopic numerals
   - Example: ፩፪፫ instead of 123

### Calendar View Options

3. **Merged calendar view**
   - Show both calendars merged in a single view with dual date display
   - Each day cell shows both Ethiopian and Gregorian dates
   - When enabled, the "Primary calendar" option becomes available

4. **Primary calendar in merged view** (only visible when merged view is enabled)
   - Choose which calendar to use as primary: Ethiopian or Gregorian
   - The primary calendar determines the calendar structure and navigation

### Side-by-Side View Options (only visible when merged view is disabled)

5. **Show Gregorian date alongside**
   - Display both Ethiopian and Gregorian calendars side by side
   - Allows users to see both calendar systems simultaneously

6. **Ethiopian calendar only**
   - Only show the Ethiopian calendar in the datepicker
   - Hides the Gregorian calendar reference completely

## Formatter Options (Field Display)

### Ethiopian Date (Side by Side) Formatter

When configuring the "Ethiopian Date (Side by Side)" formatter in the "Manage display" tab:

1. **Use Amharic**
   - Display dates using Amharic script

2. **Show Ethiopian date**
   - Toggle display of the Ethiopian calendar date
   - When enabled, Ethiopian date format option appears

3. **Ethiopian date format**
   - **Short**: 1/1/2015 or ፩/፩/፪፻፲፭
   - **Medium**: 1 Meskerem 2015 or ፩ መስከረም ፪፻፲፭
   - **Long**: Meskerem 1, 2015 or መስከረም ፩, ፪፻፲፭

4. **Show Gregorian date**
   - Toggle display of the Gregorian calendar date
   - When enabled, Gregorian date format option appears

5. **Gregorian date format**
   - **Short**: 9/11/2022
   - **Medium**: Sep 11, 2022
   - **Long**: September 11, 2022

### Ethiopian Date (Merged View) Formatter

When configuring the "Ethiopian Date (Merged View)" formatter:

1. **Use Amharic**
   - Display dates using Amharic script

2. **Ethiopian date format**
   - **Short**: 1/1/2015 or ፩/፩/፪፻፲፭
   - **Medium**: 1 Meskerem 2015 or ፩ መስከረም ፪፻፲፭
   - **Long**: Meskerem 1, 2015 or መስከረም ፩, ፪፻፲፭

3. **Gregorian date format**
   - **Short**: 9/11/2022
   - **Medium**: Sep 11, 2022
   - **Long**: September 11, 2022

Display format: Ethiopian date (Gregorian date)
Example: Meskerem 1, 2015 (September 11, 2022)

### Ethiopian Date Only Formatter

When configuring the "Ethiopian Date Only" formatter:

1. **Use Amharic**
   - Display dates using Amharic script

2. **Date format**
   - **Short**: 1/1/2015 or ፩/፩/፪፻፲፭
   - **Medium**: 1 Meskerem 2015 or ፩ መስከረም ፪፻፲፭
   - **Long**: Meskerem 1, 2015 or መስከረም ፩, ፪፻፲፭

## Usage Examples

### Example 1: News Article with Both Calendars

**Widget Configuration:**
- Use Amharic words and numbers: ✓
- Use Ethiopic numerals: ✓
- Merged calendar view: ✗
- Show Gregorian date alongside: ✓

**Formatter Configuration (Side by Side):**
- Use Amharic: ✓
- Show Ethiopian date: ✓
- Ethiopian date format: Long
- Show Gregorian date: ✓
- Gregorian date format: Medium

**Result:**
- Input: Interactive calendar showing both calendars
- Display: መስከረም ፩, ፪፻፲፭ | Sep 11, 2022

### Example 2: Ethiopian-Only Event

**Widget Configuration:**
- Use Amharic words and numbers: ✓
- Use Ethiopic numerals: ✓
- Ethiopian calendar only: ✓

**Formatter Configuration (Ethiopian Only):**
- Use Amharic: ✓
- Date format: Long

**Result:**
- Input: Ethiopian calendar only with Ethiopic numerals
- Display: መስከረም ፩, ፪፻፲፭

### Example 3: Merged View Calendar

**Widget Configuration:**
- Use Amharic words and numbers: ✓
- Use Ethiopic numerals: ✗
- Merged calendar view: ✓
- Primary calendar: Ethiopian

**Formatter Configuration (Merged View):**
- Use Amharic: ✗
- Ethiopian date format: Medium
- Gregorian date format: Medium

**Result:**
- Input: Single calendar grid with dual dates per cell
- Display: 1 Meskerem 2015 (Sep 11, 2022)

## Technical Notes

### Date Storage
All dates are stored in the database in ISO 8601 format (YYYY-MM-DD) using the Gregorian calendar, ensuring compatibility with:
- Drupal's native date functions
- Views queries and filters
- REST API
- Database queries

### Conversion
Conversion between calendars happens:
- **Input**: JavaScript converts Ethiopian selection to Gregorian for storage
- **Display**: PHP converts Gregorian storage to Ethiopian for rendering
- **Both use**: The same conversion algorithm for consistency

### HTML5 Date Picker Replacement
The widget JavaScript prevents the default HTML5 date picker from appearing by:
- Intercepting click, focus, and mousedown events
- Preventing keyboard navigation (except Tab)
- Displaying the custom Ethiopian calendar UI instead

This ensures users always interact with the Ethiopian calendar interface, even on browsers with native date picker support.

## Browser Compatibility

The module works on all modern browsers:
- Chrome/Edge (Chromium)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)

The custom calendar replaces the native date picker on all platforms.

## Backward Compatibility

All new options are optional with sensible defaults. Existing configurations will continue to work without modification:
- Default widget settings remain unchanged
- Existing formatter configurations are preserved
- Legacy `date_format` setting is maintained for backward compatibility

## Accessibility

The custom calendar maintains accessibility features:
- Keyboard navigation (Arrow keys for date selection)
- ARIA labels on navigation buttons
- Screen reader compatible
- Focus management

## Further Information

See [README.md](README.md) for general module documentation.
See [EXAMPLES.md](EXAMPLES.md) for more usage examples.
See [CHANGELOG.md](CHANGELOG.md) for version history.
