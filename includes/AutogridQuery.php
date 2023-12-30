<?php
/**
 * Для генерации CSS
*/
namespace Andreslav;

if( !class_exists(AutogridQuery::class) ) {
	class AutogridQuery {

		private $STYLE_CSS = ''; // для <style>
		private $QUERY_AND_PROPS_CSS = []; // {query1: [prop, prop, ...], query2: [prop, ...], ...}
		private $ALLOWED_AXES = ['all', 'horizontal', 'vertical'];
		private $DEFAULT_VALUE_UNIT = 'px';

		public function __construct( $param ) {
			$this->selector = isset( $param['selector'] ) ? $param[ 'selector' ] : '';
			$this->otherData = isset( $param['otherData'] ) ? $param[ 'otherData' ] : [];
		}

		/*
			sizes: { value: int | string, min: int, max: int, axis: string }
			propNames: { all, horizontal?, vertical? }; key as ALLOWED_AXES
			defaultValueUnit: string
		*/
		public function apply( $param ) {
			[ 'sizes' => $sizes, 'propNames' => $propNames ] = $param;
			if( isset( $param[ 'defaultValueUnit' ] ) ) $this->DEFAULT_VALUE_UNIT = $param[ 'defaultValueUnit' ];

			// валидация и очистка
			$sizes = array_filter(
				array_map( [ $this, 'format' ], (array) $sizes ), 
				[ $this, 'checkIsValidItem' ]
			);

			// извлекаем правила, в которых не заданы значения min и max и берём 'value' последних из них
			$baseSize = $this->getLastBase($sizes);

			// оставляем правила, в которых задано хотябы одно из значений: min или max
			$sizes = array_filter( $sizes, function( $item ) { return !$this->checkIsBaseItem( $item ); } );

			// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
			array_walk( $sizes, function( $item ) use( $propNames ) { $this->dataCollection( $item, $propNames ); } );
			$this->queryAndProps_toStyleCSS();

			// возврат базового значения
			return (object) $baseSize;
		}

		public function format( $item ) {
			$value = $item['value'];
			$clearValue = is_string( $value ) || is_numeric( $value ) ? (string) $value : '';

			// Get spacing CSS variable from preset value if provided.
			if ( str_contains( $clearValue, 'var:preset|spacing|' ) ) {
				$index_to_splice = strrpos( $clearValue, '|' ) + 1;
				$slug            = _wp_to_kebab_case( substr( $clearValue, $index_to_splice ) );
				$clearValue      = "var(--wp--preset--spacing--$slug)";
			} else {
				preg_match( '/([\d.\-\+]*)\s*(.*)/', $clearValue, $unitMatch );
				$parsedQuantity = $unitMatch[ 1 ];
				$parsedUnit = strtolower( $unitMatch[ 2 ] );
				if ( $parsedQuantity !== '' && !$parsedUnit ) $parsedUnit = $this->DEFAULT_VALUE_UNIT;
				$clearValue = $parsedQuantity . $parsedUnit;
			}

			$axis = $item['axis'] ?? '';
			if( !$axis || !in_array( $axis, $this->ALLOWED_AXES ) ) $axis = $this->ALLOWED_AXES[0];

			return [
				'value' => $clearValue, 
				'min'   => $item[ 'min' ] === '' || $item[ 'min' ] === null ? '' : intval( $item[ 'min' ] ), 
				'max'   => $item[ 'max' ] === '' || $item[ 'max' ] === null ? '' : intval( $item[ 'max' ] ),
				'axis'  => $axis
			];
		}

		public function checkIsValidItem( $item ) {
			return $item[ 'value' ] !== '';
		}

		public function checkIsBaseItem( $item ) {
			return $item[ 'min' ] === '' && $item[ 'max' ] === '';
		}

		public function getLastBase( $items ) {
			$startBase = [];
			array_walk( $this->ALLOWED_AXES, function( $item ) use( $startBase ) { $startBase[ $item ] = ''; } );

			return array_reduce(
				array_filter( $items, [ $this, 'checkIsBaseItem' ] ), 
				function($rez, $item) {
					$value = $item[ 'value' ];
					if( $item[ 'axis' ] === $this->ALLOWED_AXES[ 0 ] ) {
						array_walk( $this->ALLOWED_AXES, function( $item ) use( &$rez, $value ) {
							$rez[ $item ] = $value;
						} );
					} else {
						$rez[ $item[ 'axis' ] ] = $value;
					}
					return $rez;
				}, 
				$startBase
			);
		}

		public function getQueryAndPropCSS( $value, $min, $max, $propName, $otherData ) {
			$querySize = ''; $width; $minWidth; $maxWidth;

			if(	$min !== '' ) {
				$width = $min . 'px';
				$minWidth = "(min-width:$width)";
				$querySize = $querySize ? $querySize . ' and ' . $minWidth : $minWidth;
			}

			if( $max !== '' ) {
				$width = $max . 'px';
				$maxWidth = "(max-width:$width)";
				$querySize = $querySize ? $querySize . ' and ' . $maxWidth : $maxWidth;
			}

			return [
				'query' => $querySize ? "@container autogrid $querySize" : '',
				'value' => $propName . ':' . $value . ';'
			];
		}

		public function dataCollection( $item, $propNames ) {
			[ 'query' => $query, 'value' => $value ] = $this->getQueryAndPropCSS(
				$item[ 'value' ], 
				$item[ 'min' ], 
				$item[ 'max' ], 
				$propNames[ $item[ 'axis' ] ], 
				$this->otherData
			);

			// заполняем
			if( !isset( $this->QUERY_AND_PROPS_CSS[$query] ) ) $this->QUERY_AND_PROPS_CSS[$query] = [];
			$this->QUERY_AND_PROPS_CSS[ $query ][] = $value;
		}

		public function queryAndProps_toStyleCSS() {
			foreach( $this->QUERY_AND_PROPS_CSS as $key => $value ) {
				$this->STYLE_CSS .= $key . '{' . $this->selector . '{' . join( '', $value ) . '}}';
			}

			// очищаем
			$this->QUERY_AND_PROPS_CSS = [];
		}

		public function getCSS() {
			return $this->STYLE_CSS;
		}

	}
}