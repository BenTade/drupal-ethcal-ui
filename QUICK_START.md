# Quick Start Guide

Get up and running with the Ethiopian Calendar UI module in 5 minutes!

## Installation (1 minute)

```bash
# Copy module to Drupal
cp -r ethcal_ui /path/to/drupal/modules/custom/

# Enable the module
drush en ethcal_ui -y

# Clear cache
drush cr
```

## Basic Setup (2 minutes)

### 1. Add Field to Content Type

1. Navigate to: **Structure → Content types → Article → Manage fields**
2. Click **"Add field"**
3. Select **"Date"** from the dropdown (from core datetime module)
4. Label: **"Event Date"**
5. Click **"Save and continue"** (use defaults)
6. Click **"Save settings"**

### 2. Configure Widget

1. Go to: **Structure → Content types → Article → Manage form display**
2. Find your "Event Date" field
3. Change widget to: **"Ethiopian Date Picker"**
4. Click the settings gear icon to configure:
   - ☑ **Use Amharic words and numbers** (for Amharic display)
   - ☑ **Show Gregorian date alongside** (recommended)
5. Click **"Update"**
6. Click **"Save"**

### 3. Configure Display

1. Go to: **Structure → Content types → Article → Manage display**
2. Find your "Event Date" field
3. Change format to: **"Ethiopian Date (Side by Side)"**
4. Click **"Save"**

## Create Your First Content (2 minutes)

1. Go to: **Content → Add content → Article**
2. Fill in Title
3. Click on the **Event Date** field
4. **Calendar popup appears!**
5. Select a date from the Ethiopian calendar
6. Save the content

**Result**: You'll see your date displayed in both Ethiopian and Gregorian formats!

## That's It! 🎉

You now have a working Ethiopian calendar datepicker on your Drupal site!

---

## Quick Examples

### Example 1: Show Only Ethiopian Date

**Display Settings:**
- Format: **"Ethiopian Date Only"**
- ☑ Use Amharic

**Result:** `፲፭ መስከረም ፪ሺ፲፬`

### Example 2: Side-by-Side

**Display Settings:**
- Format: **"Ethiopian Date (Side by Side)"**
- ☑ Use Amharic

**Result:** `፲፭ መስከረም ፪ሺ፲፬ | September 25, 2021`

### Example 3: Merged View

**Display Settings:**
- Format: **"Ethiopian Date (Merged View)"**
- ☑ Use Amharic

**Result:** `፲፭ መስከረም ፪ሺ፲፬ (September 25, 2021)`

---

## Common Tasks

### Add to User Profile

```
Configuration → People → Account settings
→ Manage fields → Add field → Date
→ Manage form display → Change widget to "Ethiopian Date Picker"
```

### Use in Views

```
Structure → Views → Add view
→ Add field: Event Date
→ Configure: Choose format, enable Amharic
```

### Change Field Label

```
Structure → Content types → [Type] → Manage fields
→ Edit field → Change Label
```

### Make Field Required

```
Structure → Content types → [Type] → Manage fields
→ Edit field → ☑ Required field
```

---

## Troubleshooting Quick Fixes

### Datepicker Doesn't Appear?
```bash
drush cr  # Clear cache
```

### Can't See Module in Extend Page?
Check the module is in: `modules/custom/ethcal_ui/`

### Dates Not Displaying?
Go to: **Manage display** and ensure formatter is set

### Amharic Text Shows Boxes?
Install "Noto Sans Ethiopic" font in your browser/system

---

## Quick Reference

### Ethiopian Months (English)
1. Meskerem (Sep 11)
2. Tikimt (Oct 11)
3. Hidar (Nov 10)
4. Tahsas (Dec 10)
5. Tir (Jan 9)
6. Yekatit (Feb 8)
7. Megabit (Mar 10)
8. Miazia (Apr 9)
9. Ginbot (May 9)
10. Sene (Jun 8)
11. Hamle (Jul 8)
12. Nehase (Aug 7)
13. Pagume (Sep 6)

### Ethiopian Months (Amharic)
መስከረም, ጥቅምት, ኅዳር, ታኅሳስ, ጥር, የካቲት, መጋቢት, ሚያዝያ, ግንቦት, ሰኔ, ሐምሌ, ነሐሴ, ጳጉሜን

### Year Conversion Quick Formula
**Gregorian → Ethiopian**: Subtract 7 or 8 years
- Jan 1 - Sep 10: Subtract 8 years
- Sep 11 - Dec 31: Subtract 7 years

**Example:**
- September 15, 2021 = Meskerem 5, 2014
- January 15, 2022 = Tir 6, 2014

---

## Next Steps

✅ **You're Ready!** The module is working.

Want to learn more? Check out:

📖 **[README.md](README.md)** - Full documentation
📝 **[EXAMPLES.md](EXAMPLES.md)** - 10+ practical examples
🔧 **[INSTALL.md](INSTALL.md)** - Detailed installation
👨‍💻 **[DEVELOPER.md](DEVELOPER.md)** - Developer guide
📸 **[SCREENSHOTS.md](SCREENSHOTS.md)** - Visual guide

---

## Get Support

- Review documentation files
- Check module configuration
- Visit Drupal community forums
- Submit issues on GitHub

---

## Quick Commands Cheat Sheet

```bash
# Enable module
drush en ethcal_ui -y

# Disable module
drush pmu ethcal_ui -y

# Clear cache
drush cr

# Export configuration
drush cex -y

# Check module status
drush pm:list | grep ethcal
```

---

**Happy Date Picking! 🗓️ ✨**
