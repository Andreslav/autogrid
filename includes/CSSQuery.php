<?php
/**
 * Для генерации CSS
 */

namespace Andreslav\Autogrid;

if ( ! class_exists( CSSQuery::class ) ) {
	/**
		Свойства CSSQuery
		style_css: для <style>
		query_and_props_css[]: {query1: [prop, prop, ...], query2: [prop, ...], ...}
		...
	 */
	class CSSQuery {
		private $style_css           = '';
		private $query_and_props_css = [];
		private $allowed_axes        = [ 'all', 'horizontal', 'vertical' ];
		private $default_value_unit  = 'px';
		private $selector;
		private $other_data;
		private $container_name;

		public function __construct( $param ) {
			$this->selector       = isset( $param['selector'] ) ? $param['selector'] : '';
			$this->other_data     = isset( $param['other_data'] ) ? $param['other_data'] : [];
			$this->container_name = isset( $param['container_name'] ) ? $param['container_name'] : '';
		}

		/**
			Для добавления стиля
			sizes[]: { value: int | string, min: int, max: int, axis: string }
			prop_names: { all, horizontal?, vertical? }; key as allowed_axes
			default_value_unit: string
		 */
		public function apply( $param ) {
			$sizes      = (array) $param['sizes'];
			$prop_names = $param['prop_names'];

			if ( isset( $param['default_value_unit'] ) ) {
				$this->default_value_unit = $param['default_value_unit'];
			}
			if ( isset( $param['container_name'] ) ) {
				$this->container_name = $param['container_name'];
			}

			// валидация и очистка
			$sizes = array_filter(
				array_map( [ $this, 'format' ], $sizes ),
				[ $this, 'check_is_valid_item' ]
			);

			// извлекаем правила, в которых не заданы значения min и max и берём 'value' последних из них
			$base_size = $this->get_last_base( $sizes );

			// оставляем правила, в которых задано хотябы одно из значений: min или max
			$sizes = array_filter(
				$sizes,
				function ( $item ) {
					return ! $this->check_is_base_item( $item );
				}
			);

			// приобразовываем правила в строки CSS, которые помещаются в query_and_props_css и затем объединяем их в style_css
			array_walk(
				$sizes,
				function ( $item ) use ( $prop_names ) {
					$axis = $item['axis'];
					if ( $axis === $this->allowed_axes[0] ) {
						array_walk(
							$this->allowed_axes,
							function ( $item_axis ) use ( $prop_names, $item ) {
								$this->data_collection( $item, $prop_names[ $item_axis ] ?? '' );
							}
						);
					} else {
						$this->data_collection( $item, $prop_names[ $axis ] ?? '' );
					}
				}
			);
			$this->query_and_props_to_style_css();

			// возврат базового значения
			return (object) $base_size;
		}

		public function format( $item ) {
			$value       = $item['value'];
			$clear_value = is_string( $value ) || is_numeric( $value ) ? (string) $value : '';

			// Get spacing CSS variable from preset value if provided.
			if ( str_contains( $clear_value, 'var:preset|spacing|' ) ) {
				$index_to_splice = strrpos( $clear_value, '|' ) + 1;
				$slug            = _wp_to_kebab_case( substr( $clear_value, $index_to_splice ) );
				$clear_value     = "var(--wp--preset--spacing--$slug)";
			} else {
				preg_match( '/([\d.\-\+]*)\s*(.*)/', $clear_value, $unit_match );
				$parsed_quantity = $unit_match[1];
				$parsed_unit     = strtolower( $unit_match[2] );
				if ( $parsed_quantity !== '' && ! $parsed_unit ) {
					$parsed_unit = $this->default_value_unit;
				}
				$clear_value = $parsed_quantity . $parsed_unit;
			}

			$axis = $item['axis'] ?? '';
			if ( ! $axis || ! in_array( $axis, $this->allowed_axes, true ) ) {
				$axis = $this->allowed_axes[0];
			}

			return [
				'value' => $clear_value,
				'min'   => $item['min'] === '' || $item['min'] === null ? '' : intval( $item['min'] ),
				'max'   => $item['max'] === '' || $item['max'] === null ? '' : intval( $item['max'] ),
				'axis'  => $axis,
			];
		}

		public function check_is_valid_item( $item ) {
			return $item['value'] !== '';
		}

		public function check_is_base_item( $item ) {
			return $item['min'] === '' && $item['max'] === '';
		}

		public function get_last_base( $items ) {
			$start_base = [];
			array_walk(
				$this->allowed_axes,
				function ( $item ) use ( &$start_base ) {
					$start_base[ $item ] = '';
				}
			);

			return array_reduce(
				array_filter( $items, [ $this, 'check_is_base_item' ] ),
				function ( $rez, $item ) {
					$value = $item['value'];
					if ( $item['axis'] === $this->allowed_axes[0] ) {
						array_walk(
							$this->allowed_axes,
							function ( $item ) use ( &$rez, $value ) {
								$rez[ $item ] = $value;
							}
						);
					} else {
						$rez[ $item['axis'] ] = $value;
					}
					return $rez;
				},
				$start_base
			);
		}

		// phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter.FoundAfterLastUsed
		public function get_query_and_prop_css( $value, $min, $max, $prop_name, $container_name, $other_data ) {
			$query_size = '';
			$width;
			$min_width;
			$max_width;

			if ( $min !== '' ) {
				$width      = $min . 'px';
				$min_width  = "(min-width:$width)";
				$query_size = $query_size ? $query_size . ' and ' . $min_width : $min_width;
			}

			if ( $max !== '' ) {
				$width      = $max . 'px';
				$max_width  = "(max-width:$width)";
				$query_size = $query_size ? $query_size . ' and ' . $max_width : $max_width;
			}

			return [
				'query' => $query_size ? "@container $container_name $query_size" : '',
				'value' => $prop_name . ':' . $value . ';',
			];
		}

		public function data_collection( $item, $prop_name ) {
			if ( ! $prop_name ) {
				return;
			}

			$query_and_prop = $this->get_query_and_prop_css(
				$item['value'],
				$item['min'],
				$item['max'],
				$prop_name,
				$this->container_name,
				$this->other_data
			);

			$query = $query_and_prop['query'];
			$value = $query_and_prop['value'];

			// заполняем
			if ( ! isset( $this->query_and_props_css[ $query ] ) ) {
				$this->query_and_props_css[ $query ] = [];
			}
			$this->query_and_props_css[ $query ][] = $value;
		}

		public function query_and_props_to_style_css() {
			foreach ( $this->query_and_props_css as $key => $value ) {
				$this->style_css .= $key . '{' . $this->selector . '{' . join( '', $value ) . '}}';
			}

			// очищаем
			$this->query_and_props_css = [];
		}

		public function get_css() {
			return $this->style_css;
		}
	}
}
