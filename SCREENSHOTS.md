# Visual Guide & Screenshots

This document provides a visual reference for the Ethiopian Calendar UI module's features and user interface.

## Module Features Overview

### 1. Datepicker Popup Interface

The datepicker popup provides an intuitive calendar interface for selecting Ethiopian dates:

```
┌─────────────────────────────────────────┐
│  ≪  ‹   መስከረም ፪ሺ፲፬   ›  ≫          │
├─────────────────────────────────────────┤
│  ፩   ፪   ፫   ፬   ፭   ፮   ፯          │
│  ፰   ፱   ፲   ፲፩  ፲፪  ፲፫  ፲፬         │
│  ፲፭  ፲፮  ፲፯  ፲፰  ፲፱  ፳   ፳፩         │
│  ፳፪  ፳፫  ፳፬  ፳፭  ፳፮  ፳፯  ፳፰         │
│  ፳፱  ፴                              │
└─────────────────────────────────────────┘
```

**Features:**
- Month and year navigation buttons
- All 13 months including Pagume
- Amharic numerals (optional)
- Hover effects for date selection
- Responsive design

### 2. Field Widget Display

When editing content, the field appears as a text input with popup calendar:

```
┌─────────────────────────────────────────────────┐
│ Event Date *                                    │
│ ┌─────────────────────────────────────────────┐ │
│ │ ፲፭ መስከረም ፪ሺ፲፬ (September 25, 2021)       │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [Calendar popup appears on click]               │
└─────────────────────────────────────────────────┘
```

**Configuration Options:**
- ☑ Use Amharic words and numbers
- ☑ Show Gregorian date alongside
- ☐ Ethiopian calendar only

### 3. Display Formatters

#### A. Side-by-Side View

Shows both calendars with clear separation:

```
┌───────────────────────────────────────────────┐
│ Ethiopian                    Gregorian        │
│ ፲፭ መስከረም ፪ሺ፲፬    |    September 25, 2021  │
└───────────────────────────────────────────────┘
```

**Best for:**
- International audiences
- Documentation requiring both calendars
- Educational content

#### B. Merged View

Ethiopian date with Gregorian in parentheses:

```
┌───────────────────────────────────────────────┐
│ ፲፭ መስከረም ፪ሺ፲፬ (September 25, 2021)         │
└───────────────────────────────────────────────┘
```

**Best for:**
- News articles
- Event listings
- General content

#### C. Ethiopian Only

Only shows Ethiopian calendar:

```
┌───────────────────────────────────────────────┐
│ ፲፭ መስከረም ፪ሺ፲፬                              │
└───────────────────────────────────────────────┘
```

**Best for:**
- Ethiopian-focused content
- Official documents
- Cultural content

### 4. Field Configuration Screen

Structure > Content Types > [Type] > Manage Fields > Add Field

```
┌─────────────────────────────────────────────────┐
│ Add a new field                                 │
│                                                 │
│ Field Type: [Ethiopian Date ▼]                 │
│ Label: [Event Date                    ]        │
│                                                 │
│ [Save and continue]                             │
└─────────────────────────────────────────────────┘
```

### 5. Widget Configuration

Structure > Content Types > [Type] > Manage Fields > Field Settings

```
┌─────────────────────────────────────────────────┐
│ Widget Settings                                 │
│                                                 │
│ ☑ Use Amharic words and numbers                │
│   Display month names and numbers in Amharic   │
│   script.                                       │
│                                                 │
│ ☑ Show Gregorian date alongside                │
│   Display both Ethiopian and Gregorian dates   │
│   in the input field.                           │
│                                                 │
│ ☐ Ethiopian calendar only                      │
│   Only show Ethiopian calendar in the          │
│   datepicker (hides Gregorian reference).      │
│                                                 │
│ [Save settings]                                 │
└─────────────────────────────────────────────────┘
```

### 6. Formatter Configuration

Structure > Content Types > [Type] > Manage Display

```
┌─────────────────────────────────────────────────┐
│ Field                Format                     │
│ ───────────────────────────────────────────────│
│ Event Date          [Ethiopian Date (Side... ▼]│
│                     ⚙                           │
│                                                 │
│ Format Settings (when clicking ⚙):             │
│ ┌─────────────────────────────────────────────┐ │
│ │ ☑ Use Amharic                               │ │
│ │ Date format: [Medium ▼]                     │ │
│ │ [Update] [Cancel]                           │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ [Save]                                          │
└─────────────────────────────────────────────────┘
```

### 7. Views Integration

Structure > Views > Add View

```
┌─────────────────────────────────────────────────┐
│ Fields                                          │
│ ───────────────────────────────────────────────│
│ • Content: Title                                │
│ • Content: Event Date                           │
│   + Configure Field                             │
│     ┌───────────────────────────────────────┐  │
│     │ Display format:                       │  │
│     │ ( ) Side by side                      │  │
│     │ (•) Merged                            │  │
│     │ ( ) Ethiopian only                    │  │
│     │                                       │  │
│     │ ☑ Use Amharic                        │  │
│     │                                       │  │
│     │ [Apply]                               │  │
│     └───────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### 8. Content Listing Example

A typical event listing using the module:

```
╔═════════════════════════════════════════════════╗
║            Upcoming Events                      ║
╠═════════════════════════════════════════════════╣
║                                                 ║
║  የኢትዮጵያ አዲስ ዓመት                              ║
║  ፩ መስከረም ፪ሺ፲፭ | September 11, 2022            ║
║  ───────────────────────────────────────────    ║
║                                                 ║
║  መስቀል                                          ║
║  ፲፯ መስከረም ፪ሺ፲፭ | September 27, 2022           ║
║  ───────────────────────────────────────────    ║
║                                                 ║
║  ገና                                            ║
║  ፳፱ ታኅሳስ ፪ሺ፲፭ | January 7, 2023              ║
║  ───────────────────────────────────────────    ║
║                                                 ║
╚═════════════════════════════════════════════════╝
```

## Calendar System Details

### Ethiopian Calendar Structure

```
Month Name (Amharic)    Days    Gregorian Equivalent
────────────────────────────────────────────────────
፩. መስከረም               30      Sep 11 - Oct 10
፪. ጥቅምት                30      Oct 11 - Nov 9
፫. ኅዳር                 30      Nov 10 - Dec 9
፬. ታኅሳስ                30      Dec 10 - Jan 8
፭. ጥር                  30      Jan 9 - Feb 7
፮. የካቲት                30      Feb 8 - Mar 9
፯. መጋቢት                30      Mar 10 - Apr 8
፰. ሚያዝያ                30      Apr 9 - May 8
፱. ግንቦት                30      May 9 - Jun 7
፲. ሰኔ                  30      Jun 8 - Jul 7
፲፩. ሐምሌ                30      Jul 8 - Aug 6
፲፪. ነሐሴ                30      Aug 7 - Sep 5
፲፫. ጳጉሜን              5-6      Sep 6 - Sep 10
```

### Amharic Numerals

```
Decimal    Amharic
───────────────────
0          ፲
1          ፩
2          ፪
3          ፫
4          ፬
5          ፭
6          ፮
7          ፯
8          ፰
9          ፱
10         ፲
```

## User Interface Elements

### Buttons and Controls

```
Navigation:
≪ Previous Year   ‹ Previous Month   › Next Month   ≫ Next Year

Action Buttons:
[Save]  [Cancel]  [Update]  [Apply]

Checkboxes:
☑ Checked option
☐ Unchecked option
```

### Color Scheme

The module uses a clean, professional color scheme:

- **Primary**: #0073aa (Drupal blue)
- **Hover**: #e8f4f8 (Light blue)
- **Border**: #ccc (Light gray)
- **Text**: #333 (Dark gray)
- **Background**: #fff (White)

### Responsive Design

The datepicker adapts to different screen sizes:

**Desktop (>480px):**
- Full width datepicker
- All controls visible
- Optimal spacing

**Mobile (<480px):**
- Centered popup
- Touch-friendly buttons
- Compact layout

## Browser Compatibility

The module is compatible with:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Accessibility Features

- Keyboard navigation support
- ARIA labels for screen readers
- High contrast mode support
- Focus indicators
- Semantic HTML structure

## Performance

- Lightweight JavaScript (~12KB combined)
- CSS (~4KB combined)
- No external dependencies (except jQuery, provided by Drupal)
- Fast conversion algorithm (O(1) complexity)
- Minimal DOM manipulation

## Styling Customization

### Easy Override Points

```css
/* Change datepicker colors */
.ethiopian-datepicker {
  background: #your-color;
  border-color: #your-color;
}

/* Change day hover color */
.ethcal-day:hover {
  background: #your-color;
  color: #your-text-color;
}

/* Change Amharic text styling */
.ethcal-amharic {
  font-family: 'Your-Amharic-Font';
  font-size: your-size;
}
```

## Integration Examples

### With Content Types
- Events
- News articles
- User profiles
- Historical records
- Government documents

### With Paragraphs
- Timeline items
- Date-specific sections
- Event details

### With Custom Entities
- Any custom entity type
- Commerce products with dates
- Custom content models

## Support for Multiple Languages

While the module focuses on Amharic and English, the architecture supports adding more languages:

```javascript
// Example: Adding Oromo month names
var oromoMonths = [
  'Fulbaana', 'Onkoloolessa', 'Sadaasa', 'Muddee',
  // ... etc
];
```

## Future Enhancement Ideas

Potential features for future versions:
- Time picker integration
- Date range picker
- Recurring date support
- Custom date formats
- Additional calendar systems
- More localization options
- Advanced Views filters
- REST API documentation

## Getting Help

If you need visual assistance:
1. Check the README.md for detailed text instructions
2. Review EXAMPLES.md for practical use cases
3. See INSTALL.md for step-by-step setup
4. Read DEVELOPER.md for technical details

---

**Note**: This is a text-based visual guide. For actual screenshots in a production environment:
1. Install the module in a Drupal site
2. Configure a content type with the field
3. Take screenshots of each configuration page
4. Take screenshots of the datepicker in action
5. Capture display examples in various formats
