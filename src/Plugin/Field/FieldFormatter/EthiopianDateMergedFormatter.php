<?php

namespace Drupal\ethcal_ui\Plugin\Field\FieldFormatter;

use Drupal\Core\Field\FieldItemListInterface;
use Drupal\Core\Field\FormatterBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Plugin implementation of the 'ethiopian_date_merged' formatter.
 *
 * @FieldFormatter(
 *   id = "ethiopian_date_merged",
 *   label = @Translation("Ethiopian Date (Merged View)"),
 *   field_types = {
 *     "datetime"
 *   }
 * )
 */
class EthiopianDateMergedFormatter extends FormatterBase {

  /**
   * {@inheritdoc}
   */
  public static function defaultSettings() {
    return [
      'use_amharic' => FALSE,
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

    $summary[] = $this->t('Merged view (Ethiopian with Gregorian in parentheses)');

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
          '#theme' => 'ethcal_date_merged',
          '#gregorian_date' => $date_value,
          '#use_amharic' => $this->getSetting('use_amharic'),
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
