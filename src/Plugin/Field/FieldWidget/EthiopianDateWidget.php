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
 *     "ethiopian_date"
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
    $value = $items[$delta]->value ?? '';

    $element['#type'] = 'container';
    $element['#attributes']['class'][] = 'form-item--ethcal-date';

    // Display input field for datepicker
    $element['display'] = [
      '#type' => 'textfield',
      '#default_value' => $this->formatDisplayValue($value),
      '#attributes' => [
        'class' => ['ethcal-datepicker-input'],
        'readonly' => 'readonly',
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

    // Hidden field to store the actual value
    $element['value'] = [
      '#type' => 'hidden',
      '#default_value' => $value,
      '#attributes' => [
        'class' => ['ethcal-hidden-value'],
      ],
    ];

    return $element;
  }

  /**
   * Format the display value for the input field.
   *
   * @param string $value
   *   The stored ISO date value.
   *
   * @return string
   *   Formatted display value.
   */
  protected function formatDisplayValue($value) {
    if (empty($value)) {
      return '';
    }

    // Parse the ISO date
    $date_parts = explode('-', $value);
    if (count($date_parts) !== 3) {
      return '';
    }

    try {
      $gregorian_date = new \DateTime($value);
      // This would ideally use the EthiopianCalendar JavaScript library
      // For now, we'll just show the Gregorian date
      return $gregorian_date->format('Y-m-d');
    }
    catch (\Exception $e) {
      return '';
    }
  }

  /**
   * {@inheritdoc}
   */
  public function massageFormValues(array $values, array $form, FormStateInterface $form_state) {
    foreach ($values as &$value) {
      if (isset($value['value'])) {
        // The value is already in the correct format (ISO date from hidden field)
        $value = ['value' => $value['value']];
      }
    }
    return $values;
  }

}
