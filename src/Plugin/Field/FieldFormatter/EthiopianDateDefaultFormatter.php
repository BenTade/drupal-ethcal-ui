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

    $elements['date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Date format'),
      '#options' => [
        'short' => $this->t('Short'),
        'medium' => $this->t('Medium'),
        'long' => $this->t('Long'),
      ],
      '#default_value' => $this->getSetting('date_format'),
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

    $summary[] = $this->t('Format: @format', [
      '@format' => $this->getSetting('date_format'),
    ]);

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
