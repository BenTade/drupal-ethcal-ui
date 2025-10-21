<?php

namespace Drupal\ethcal_ui\Plugin\Field\FieldType;

use Drupal\Core\Field\FieldItemBase;
use Drupal\Core\Field\FieldStorageDefinitionInterface;
use Drupal\Core\TypedData\DataDefinition;

/**
 * Plugin implementation of the 'ethiopian_date' field type.
 *
 * @FieldType(
 *   id = "ethiopian_date",
 *   label = @Translation("Ethiopian Date"),
 *   description = @Translation("Stores dates using Ethiopian calendar with Gregorian conversion."),
 *   default_widget = "ethiopian_date_widget",
 *   default_formatter = "ethiopian_date_default"
 * )
 */
class EthiopianDateItem extends FieldItemBase {

  /**
   * {@inheritdoc}
   */
  public static function propertyDefinitions(FieldStorageDefinitionInterface $field_definition) {
    $properties['value'] = DataDefinition::create('string')
      ->setLabel(t('Date value'))
      ->setDescription(t('The Gregorian date value in ISO 8601 format (YYYY-MM-DD).'))
      ->setRequired(TRUE);

    return $properties;
  }

  /**
   * {@inheritdoc}
   */
  public static function schema(FieldStorageDefinitionInterface $field_definition) {
    return [
      'columns' => [
        'value' => [
          'type' => 'varchar',
          'length' => 20,
          'not null' => FALSE,
        ],
      ],
      'indexes' => [
        'value' => ['value'],
      ],
    ];
  }

  /**
   * {@inheritdoc}
   */
  public function isEmpty() {
    $value = $this->get('value')->getValue();
    return $value === NULL || $value === '';
  }

}
