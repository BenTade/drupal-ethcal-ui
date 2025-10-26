<?php

namespace Drupal\ethcal_ui\Plugin\Field\FieldWidget;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\WidgetBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'ethiopian_date_widget' widget.
 *
 * @FieldWidget(
 *   id = "ethiopian_date_widget",
 *   label = @Translation("Ethiopian Date Picker"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class EthiopianDateWidget extends WidgetBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'use_amharic' => FALSE,
      'show_gregorian' => TRUE,
      'ethiopian_only' => FALSE,
      'use_ethiopic_numbers' => FALSE,
      'merged_view' => FALSE,
      'primary_calendar' => 'ethiopian',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);

    $elements['use_amharic'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Use Amharic words and numbers'),
      '#default_value' => $this->getSetting('use_amharic'),
      '#description' => $this->t('Display month names and numbers in Amharic script.'),
    ];

    $elements['use_ethiopic_numbers'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Use Ethiopic numerals'),
      '#default_value' => $this->getSetting('use_ethiopic_numbers'),
      '#description' => $this->t('Display date numbers using Ethiopic numerals (፩፪፫...).'),
    ];

    $elements['merged_view'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Merged calendar view'),
      '#default_value' => $this->getSetting('merged_view'),
      '#description' => $this->t('Show both calendars merged in a single view with dual date display.'),
    ];

    $elements['primary_calendar'] = [
      '#type' => 'select',
      '#title' => $this->t('Primary calendar in merged view'),
      '#options' => [
        'ethiopian' => $this->t('Ethiopian'),
        'gregorian' => $this->t('Gregorian'),
      ],
      '#default_value' => $this->getSetting('primary_calendar'),
      '#description' => $this->t('Which calendar to use as primary in merged view.'),
      '#states' => [
        'visible' => [
          ':input[name="fields[' . $this->fieldDefinition->getName() . '][settings_edit_form][settings][merged_view]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $elements['show_gregorian'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Gregorian date alongside'),
      '#default_value' => $this->getSetting('show_gregorian'),
      '#description' => $this->t('Display both Ethiopian and Gregorian dates in the input field.'),
      '#states' => [
        'visible' => [
          ':input[name="fields[' . $this->fieldDefinition->getName() . '][settings_edit_form][settings][merged_view]"]' => ['checked' => FALSE],
        ],
      ],
    ];

    $elements['ethiopian_only'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Ethiopian calendar only'),
      '#default_value' => $this->getSetting('ethiopian_only'),
      '#description' => $this->t('Only show Ethiopian calendar in the datepicker (hides Gregorian reference).'),
      '#states' => [
        'visible' => [
          ':input[name="fields[' . $this->fieldDefinition->getName() . '][settings_edit_form][settings][merged_view]"]' => ['checked' => FALSE],
        ],
      ],
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    if ($this->getSetting('use_amharic')) {
      $summary[] = $this->t('Using Amharic');
    }

    if ($this->getSetting('use_ethiopic_numbers')) {
      $summary[] = $this->t('Using Ethiopic numerals');
    }

    if ($this->getSetting('merged_view')) {
      $summary[] = $this->t('Merged view (@primary primary)', [
        '@primary' => $this->getSetting('primary_calendar'),
      ]);
    }
    elseif ($this->getSetting('show_gregorian')) {
      $summary[] = $this->t('Show Gregorian date');
    }

    if ($this->getSetting('ethiopian_only')) {
      $summary[] = $this->t('Ethiopian calendar only');
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function formElement(FieldItemListInterface $items, $delta, array $element, array &$form, FormStateInterface $form_state) {
    // For datetime fields, the value is stored in the 'value' property
    // and is typically in ISO 8601 format (e.g., '2024-01-15T00:00:00')
    $value = $items[$delta]->value ?? '';
    
    // Extract just the date part if it's a datetime value
    if (!empty($value) && strpos($value, 'T') !== FALSE) {
      $value = substr($value, 0, 10); // Get YYYY-MM-DD part
    }

    // Use textfield instead of date to prevent HTML5 date picker
    $element['value'] = [
      '#type' => 'textfield',
      '#default_value' => $value,
      '#attributes' => [
        'class' => ['ethcal-datepicker-input'],
        'readonly' => 'readonly',
        'placeholder' => $this->t('Select a date...'),
        'data-widget-settings' => json_encode([
          'useAmharic' => $this->getSetting('use_amharic'),
          'useEthiopicNumbers' => $this->getSetting('use_ethiopic_numbers'),
          'showGregorian' => !$this->getSetting('ethiopian_only') && $this->getSetting('show_gregorian'),
          'mergedView' => $this->getSetting('merged_view'),
          'primaryCalendar' => $this->getSetting('primary_calendar'),
        ]),
      ],
      '#attached' => [
        'library' => [
          'ethcal_ui/widget',
        ],
      ],
    ];

    return $element;
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    foreach ($values as &$value) {
      if (isset($value['value']) && !empty($value['value'])) {
        // For datetime fields, we need to store the value in ISO 8601 format
        // If the field type is 'datetime', add time component (midnight)
        $date_value = $value['value'];
        
        // If it's just a date (YYYY-MM-DD), convert to datetime format
        if (strlen($date_value) === 10 && strpos($date_value, 'T') === FALSE) {
          $date_value .= 'T00:00:00';
        }
        
        $value = ['value' => $date_value];
      }
    }
    return $values;
  }

}
