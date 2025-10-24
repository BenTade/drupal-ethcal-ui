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

    $elements['show_gregorian'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Gregorian date alongside'),
      '#default_value' => $this->getSetting('show_gregorian'),
      '#description' => $this->t('Display both Ethiopian and Gregorian dates in the input field.'),
    ];

    $elements['ethiopian_only'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Ethiopian calendar only'),
      '#default_value' => $this->getSetting('ethiopian_only'),
      '#description' => $this->t('Only show Ethiopian calendar in the datepicker (hides Gregorian reference).'),
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

    if ($this->getSetting('show_gregorian')) {
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

    // Use the same structure as core datetime widget for consistent appearance
    $element['value'] = [
      '#type' => 'date',
      '#default_value' => $value,
      '#date_date_format' => 'Y-m-d',
      '#attributes' => [
        'class' => ['ethcal-datepicker-input'],
        'data-widget-settings' => json_encode([
          'useAmharic' => $this->getSetting('use_amharic'),
          'showGregorian' => !$this->getSetting('ethiopian_only') && $this->getSetting('show_gregorian'),
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
