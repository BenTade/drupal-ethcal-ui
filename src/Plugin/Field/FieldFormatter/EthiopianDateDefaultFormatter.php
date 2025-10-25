<?php

namespace Drupal\ethcal_ui\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'ethiopian_date_default' formatter.
 *
 * @FieldFormatter(
 *   id = "ethiopian_date_default",
 *   label = @Translation("Ethiopian Date (Side by Side)"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class EthiopianDateDefaultFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'use_amharic' => FALSE,
      'date_format' => 'medium',
      'show_ethiopian_date' => TRUE,
      'show_gregorian_date' => TRUE,
      'ethiopian_date_format' => 'long',
      'gregorian_date_format' => 'medium',
    ] + parent::defaultSettings();
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state) {
    $elements = parent::settingsForm($form, $form_state);

    $elements['use_amharic'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Use Amharic'),
      '#default_value' => $this->getSetting('use_amharic'),
      '#description' => $this->t('Display dates using Amharic script.'),
    ];

    $elements['show_ethiopian_date'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Ethiopian date'),
      '#default_value' => $this->getSetting('show_ethiopian_date'),
      '#description' => $this->t('Display the Ethiopian calendar date.'),
    ];

    $elements['ethiopian_date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Ethiopian date format'),
      '#options' => [
        'short' => $this->t('Short (1/1/2015)'),
        'medium' => $this->t('Medium (1 Meskerem 2015)'),
        'long' => $this->t('Long (Meskerem 1, 2015)'),
      ],
      '#default_value' => $this->getSetting('ethiopian_date_format'),
      '#states' => [
        'visible' => [
          ':input[name="fields[' . $this->fieldDefinition->getName() . '][settings_edit_form][settings][show_ethiopian_date]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    $elements['show_gregorian_date'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Show Gregorian date'),
      '#default_value' => $this->getSetting('show_gregorian_date'),
      '#description' => $this->t('Display the Gregorian calendar date.'),
    ];

    $elements['gregorian_date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Gregorian date format'),
      '#options' => [
        'short' => $this->t('Short (9/11/2022)'),
        'medium' => $this->t('Medium (Sep 11, 2022)'),
        'long' => $this->t('Long (September 11, 2022)'),
      ],
      '#default_value' => $this->getSetting('gregorian_date_format'),
      '#states' => [
        'visible' => [
          ':input[name="fields[' . $this->fieldDefinition->getName() . '][settings_edit_form][settings][show_gregorian_date]"]' => ['checked' => TRUE],
        ],
      ],
    ];

    // Keep legacy date_format for backward compatibility
    $elements['date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Date format (legacy)'),
      '#options' => [
        'short' => $this->t('Short'),
        'medium' => $this->t('Medium'),
        'long' => $this->t('Long'),
      ],
      '#default_value' => $this->getSetting('date_format'),
      '#access' => FALSE,
    ];

    return $elements;
  }

  /**
   * {@inheritdoc}
   */
  public function settingsSummary() {
    $summary = [];

    if ($this->getSetting('use_amharic')) {
      $summary[] = $this->t('Amharic');
    }

    $parts = [];
    if ($this->getSetting('show_ethiopian_date')) {
      $parts[] = $this->t('Ethiopian (@format)', [
        '@format' => $this->getSetting('ethiopian_date_format'),
      ]);
    }
    if ($this->getSetting('show_gregorian_date')) {
      $parts[] = $this->t('Gregorian (@format)', [
        '@format' => $this->getSetting('gregorian_date_format'),
      ]);
    }

    if (!empty($parts)) {
      $summary[] = implode(' | ', $parts);
    }
    else {
      $summary[] = $this->t('No dates selected');
    }

    return $summary;
  }

  /**
   * {@inheritdoc}
   */
  public function viewElements(FieldItemListInterface $items, $langcode) {
    $elements = [];

    foreach ($items as $delta => $item) {
      if (!empty($item->value)) {
        // For datetime fields, extract just the date part
        $date_value = $item->value;
        if (strpos($date_value, 'T') !== FALSE) {
          $date_value = substr($date_value, 0, 10); // Get YYYY-MM-DD part
        }
        
        $elements[$delta] = [
          '#theme' => 'ethcal_date_sidebyside',
          '#gregorian_date' => $date_value,
          '#use_amharic' => $this->getSetting('use_amharic'),
          '#date_format' => $this->getSetting('date_format'),
          '#show_ethiopian_date' => $this->getSetting('show_ethiopian_date'),
          '#show_gregorian_date' => $this->getSetting('show_gregorian_date'),
          '#ethiopian_date_format' => $this->getSetting('ethiopian_date_format'),
          '#gregorian_date_format' => $this->getSetting('gregorian_date_format'),
          '#attached' => [
            'library' => [
              'ethcal_ui/formatter',
            ],
          ],
        ];
      }
    }

    return $elements;
  }

}
