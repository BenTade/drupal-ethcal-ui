# Installation Guide

## Prerequisites

Before installing the Ethiopian Calendar UI module, ensure you have:

- Drupal 10 or 11 installed
- PHP 8.1 or higher
- Composer installed
- Access to Drupal's admin interface or Drush command line tool
- Basic understanding of Drupal field configuration

## Installation Steps

### Method 1: Using Composer (Recommended)

1. **Install the module and its dependencies:**
   ```bash
   cd /path/to/your/drupal
   composer require drupal/ethcal_ui
   ```

   Or, if installing from the repository:
   ```bash
   composer require bentade/ethcal-ui
   # Then copy the module to modules/custom/ethcal_ui
   ```

2. **Enable the module:**
   ```bash
   drush en ethcal_ui -y
   ```

3. **Clear cache:**
   ```bash
   drush cr
   ```

### Method 2: Manual Installation

**Important**: This module requires the `bentade/ethcal-ui` package. You must install dependencies via Composer even for manual installation.

1. **Copy the module to your Drupal installation:**
   ```bash
   cd /path/to/your/drupal
   mkdir -p modules/custom
   cp -r /path/to/ethcal_ui modules/custom/
   ```

2. **Install dependencies:**
   ```bash
   cd /path/to/your/drupal
   composer require bentade/ethcal-ui
   ```

3. **Enable the module:**
   ```bash
   drush en ethcal_ui -y
   ```

3. **Enable the module:**
   ```bash
   drush en ethcal_ui -y
   ```

4. **Clear cache:**
   ```bash
   drush cr
   ```

### Method 3: Using Drupal Admin UI

**Important**: Even when using the admin UI, you must install dependencies via Composer first.

1. **Install dependencies:**
   ```bash
   cd /path/to/your/drupal
   composer require bentade/ethcal-ui
   ```

2. **Copy the module:**
   - Copy the `ethcal_ui` directory to `modules/custom/` in your Drupal installation

3. **Enable through UI:**
   - Navigate to: Admin > Extend (`/admin/modules`)
   - Find "Ethiopian Calendar UI" in the list
   - Check the box next to it
   - Click "Install" at the bottom of the page

4. **Clear cache:**
   - Navigate to: Admin > Configuration > Development > Performance
   - Click "Clear all caches"

## Verification

To verify the installation was successful:

1. Go to Structure > Content types > [Any content type] > Manage form display
2. Add or edit a Date field
3. Click on the widget dropdown
4. Look for "Ethiopian Date Picker" in the widget options
5. If you see it, the module is installed correctly!

## Configuration

### Adding an Ethiopian Date Field to a Content Type

1. Navigate to: Structure > Content types
2. Select a content type (e.g., Article)
3. Click "Manage fields"
4. Click "Add field"
5. Select "Date" from the field type dropdown
6. Enter a label (e.g., "Event Date")
7. Click "Save and continue"
8. Configure field settings (optional)
9. Click "Save field settings"
10. Go to "Manage form display" tab
11. Change the widget to "Ethiopian Date Picker"
12. Click the settings gear icon to configure widget settings:
    - ☑ Use Amharic words and numbers
    - ☑ Show Gregorian date alongside
    - ☐ Ethiopian calendar only
13. Click "Update"
14. Click "Save"

### Configuring the Display

1. Go to: Structure > Content types > [Your content type] > Manage display
2. Find your Ethiopian Date field
3. Change the format from the dropdown:
   - **Ethiopian Date (Side by Side)** - Shows both calendars side by side
   - **Ethiopian Date (Merged View)** - Ethiopian with Gregorian in parentheses
   - **Ethiopian Date Only** - Only Ethiopian calendar
4. Click the gear icon to configure formatter settings:
   - Toggle Amharic usage
   - Select date format (short/medium/long)
5. Click "Update" and then "Save"

### Using in Views

1. Create or edit a View: Structure > Views
2. Add the Ethiopian Date field:
   - Click "Add" under Fields
   - Search for your field name
   - Click "Add and configure fields"
3. Configure the field display:
   - Select display format (sidebyside/merged/ethiopian_only)
   - Toggle Amharic usage
   - Click "Apply"
4. Save your View

## Testing

To test the module:

1. **Create content:**
   - Navigate to: Content > Add content > [Your content type]
   - Click on the Ethiopian Date field
   - The datepicker should appear
   - Select a date from the calendar
   - Save the content

2. **View the content:**
   - Check that the date displays correctly
   - Verify formatting matches your settings
   - Test different formatters

3. **Test in Views:**
   - Create a View listing content with Ethiopian dates
   - Verify dates display correctly
   - Test date filtering and sorting

## Troubleshooting

### Missing dependencies error
- Run `composer install` in your Drupal root directory
- Ensure `bentade/ethcal-ui` package is installed: `composer show bentade/ethcal-ui`
- Check that `vendor/bentade/ethcal-ui` directory exists

### Module doesn't appear in Extend page
- Ensure the module is in the correct location: `modules/custom/ethcal_ui/`
- Check file permissions
- Verify dependencies are installed via Composer
- Clear cache: `drush cr`

### Datepicker doesn't show
- Verify `vendor/bentade/ethcal-ui/dist/ethcal-ui.umd.js` exists
- Clear cache: `drush cr`
- Check browser console for JavaScript errors
- Ensure jQuery is loaded on the page
- Check that the library path in `ethcal_ui.libraries.yml` is correct

### Dates don't display correctly
- Verify the stored date format is ISO 8601 (YYYY-MM-DD)
- Check template files are in place
- Clear cache and reload the page

### Amharic text doesn't display
- Ensure your browser/system supports Amharic fonts
- Install "Noto Sans Ethiopic" font if needed
- Check that UTF-8 encoding is properly configured

## Uninstallation

To uninstall the module:

1. **Delete all fields using the field type:**
   - Go to Structure > Content types > [Each type] > Manage fields
   - Delete any Ethiopian Date fields

2. **Uninstall the module:**
   ```bash
   drush pm:uninstall ethcal_ui -y
   ```
   
   Or through the UI:
   - Admin > Extend > Uninstall tab
   - Check "Ethiopian Calendar UI"
   - Click "Uninstall"

3. **Clear cache:**
   ```bash
   drush cr
   ```

## Support

For issues or questions:
- Check the README.md for detailed documentation
- Review the CHANGELOG.md for version-specific information
- Visit the project repository for issue tracking

## Next Steps

After installation, check out:
- [README.md](README.md) - Full documentation
- [EXAMPLES.md](EXAMPLES.md) - Usage examples
- [CHANGELOG.md](CHANGELOG.md) - Version history
