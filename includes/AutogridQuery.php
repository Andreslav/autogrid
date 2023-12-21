<?php
/**
 * Для генерации CSS
*/
namespace Andreslav;

if( !class_exists(AutogridQuery::class) ) {
	class AutogridQuery {

		private $STYLE_CSS = ''; // для <style>
		private $QUERY_AND_PROPS_CSS = []; // {query1: [prop, prop, ...], query2: [prop, ...], ...}

		public function __construct($param) {
			$this->selector = isset($param['selector']) ? $param['selector'] : '';
			$this->otherData = isset($param['otherData']) ? $param['otherData'] : [];
		}

		public function apply($param) {
			['sizes' => $sizes, 'propName' => $propName] = $param;

			// валидация и очистка
			$sizes = array_filter(
				array_map( [$this, 'format'], (array) $sizes ), 
				[$this, 'checkIsValidItem']
			);

			// извлекаем правила, в которых не заданы значения min и max и берём 'value' последнего из них
			$baseSize = $this->getLastBase($sizes);

			// оставляем правила, в которых задано хотябы одно из значений: min или max
			$sizes = array_filter( $sizes, function($item) { return !$this->checkIsBaseItem($item); } );

			// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
			array_walk( $sizes, function($item) use($propName) { $this->dataCollection($item, $propName); } );
			$this->queryAndProps_toStyleCSS();

			// возврат базового значения
			return $baseSize;
		}

		public function format($item) {
			return [
				'value' => $item['value'] === '' || $item['value'] === null ? '' : intval($item['value']), 
				'min'   => $item['min']   === '' || $item['min']   === null ? '' : intval($item['min']), 
				'max'   => $item['max']   === '' || $item['max']   === null ? '' : intval($item['max'])
			];
		}

		public function checkIsValidItem($item) {
			return $item['value'] !== '';
		}

		public function checkIsBaseItem($item) {
			return $item['min'] === '' && $item['max'] === '';
		}

		public function getLastBase($items) {
			return array_reduce( 
				array_filter( $items, [$this, 'checkIsBaseItem'] ), 
				function($v, $item) { return $item['value']; }, 
				'' 
			);
		}

		public function getQueryAndPropCSS($value, $min, $max, $propName, $otherData) {
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
				'value' => $propName . ':' . $value . 'px;'
			];
		}

		public function dataCollection($item, $propName) {
			['query' => $query, 'value' => $value] = $this->getQueryAndPropCSS( $item['value'], $item['min'], $item['max'], $propName, $this->otherData );

			// заполняем
			if( !isset($this->QUERY_AND_PROPS_CSS[$query]) ) $this->QUERY_AND_PROPS_CSS[$query] = [];
			$this->QUERY_AND_PROPS_CSS[$query][] = $value;
		}

		public function queryAndProps_toStyleCSS() {
			foreach( $this->QUERY_AND_PROPS_CSS as $key => $value ) {
				$this->STYLE_CSS .= $key . '{' . $this->selector . '{' . join('', $value) . '}}';
			}

			// очищаем
			$this->QUERY_AND_PROPS_CSS = [];
		}

		public function getCSS() {
			return $this->STYLE_CSS;
		}

	}
}