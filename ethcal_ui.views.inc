<?php

/**
 * @file
 * Provides views data for the Ethiopian Calendar UI module.
 */

/**
 * Implements hook_field_views_data_alter().
 */
function ethcal_ui_field_views_data_alter(array &$data, \Drupal\field\FieldStorageConfigInterface $field_storage) {
  // Only alter datetime fields
  if ($field_storage->getType() !== 'datetime') {
    return;
  }
  
  foreach ($data as $table_name => $table_data) {
    if (isset($data[$table_name][$field_storage->getName() . '_value'])) {
      // Add custom Ethiopian date field handler as an alternative
      // This allows users to choose between standard datetime display
      // and Ethiopian calendar display in Views
      $data[$table_name][$field_storage->getName() . '_value']['field']['id'] = 'ethiopian_date_field';
    }
  }
}
