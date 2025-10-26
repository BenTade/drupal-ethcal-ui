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
      'ethiopian_date_format' => 'medium',
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

    $elements['ethiopian_date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Ethiopian date format'),
      '#options' => [
        'short' => $this->t('Short (1/1/2015)'),
        'medium' => $this->t('Medium (1 Meskerem 2015)'),
        'long' => $this->t('Long (Meskerem 1, 2015)'),
      ],
      '#default_value' => $this->getSetting('ethiopian_date_format'),
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

    $summary[] = $this->t('Merged view (Ethiopian @eth_format with Gregorian @greg_format in parentheses)', [
      '@eth_format' => $this->getSetting('ethiopian_date_format'),
      '@greg_format' => $this->getSetting('gregorian_date_format'),
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
          '#theme' => 'ethcal_date_merged',
          '#gregorian_date' => $date_value,
          '#use_amharic' => $this->getSetting('use_amharic'),
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
