<?php

/**
 * @file
 * Provides views data for the Ethiopian Calendar UI module.
 */

/**
 * Implements hook_field_views_data().
 */
function ethcal_ui_field_views_data(\Drupal\field\FieldStorageConfigInterface $field_storage) {
  $data = views_field_default_views_data($field_storage);
  
  foreach ($data as $table_name => $table_data) {
    if (isset($table_data[$field_storage->getName() . '_value'])) {
      // Add custom field handler for Ethiopian dates
      $data[$table_name][$field_storage->getName() . '_value']['field'] = [
        'id' => 'ethiopian_date_field',
        'click sortable' => TRUE,
      ];
      
      // Add filter handler
      $data[$table_name][$field_storage->getName() . '_value']['filter'] = [
        'id' => 'date',
        'allow empty' => TRUE,
      ];
      
      // Add sort handler
      $data[$table_name][$field_storage->getName() . '_value']['sort'] = [
        'id' => 'standard',
      ];
    }
  }
  
  return $data;
}
