<?php

namespace Drupal\ethcal_ui\Plugin\views\field;

use Drupal\views\Plugin\views\field\FieldPluginBase;
use Drupal\views\ResultRow;
use Drupal\Core\Form\FormStateInterface;

/**
 * A handler to provide proper displays for Ethiopian dates in Views.
 *
 * @ingroup views_field_handlers
 *
 * @ViewsField("ethiopian_date_field")
 */
class EthiopianDateField extends FieldPluginBase {

  /**
   * {@inheritdoc}
   */
  protected function defineOptions() {
    $options = parent::defineOptions();
    $options['date_format'] = ['default' => 'merged'];
    $options['use_amharic'] = ['default' => FALSE];
    return $options;
  }

  /**
   * {@inheritdoc}
   */
  public function buildOptionsForm(&$form, FormStateInterface $form_state) {
    $form['date_format'] = [
      '#type' => 'select',
      '#title' => $this->t('Display format'),
      '#options' => [
        'sidebyside' => $this->t('Side by side'),
        'merged' => $this->t('Merged'),
        'ethiopian_only' => $this->t('Ethiopian only'),
      ],
      '#default_value' => $this->options['date_format'],
    ];

    $form['use_amharic'] = [
      '#type' => 'checkbox',
      '#title' => $this->t('Use Amharic'),
      '#default_value' => $this->options['use_amharic'],
    ];

    parent::buildOptionsForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function render(ResultRow $values) {
    $value = $this->getValue($values);
    
    if (empty($value)) {
      return '';
    }

    $format = $this->options['date_format'];
    $use_amharic = $this->options['use_amharic'];

    $build = [
      '#theme' => 'ethcal_date_' . $format,
      '#gregorian_date' => $value,
      '#use_amharic' => $use_amharic,
      '#attached' => [
        'library' => [
          'ethcal_ui/formatter',
        ],
      ],
    ];

    return $build;
  }

}
