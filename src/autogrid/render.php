<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

if( !class_exists('Andr_Autogrid') ) {
	class Andr_Autogrid {
	    private $selector = '';
	    private $STYLE_CSS = ''; // для <style>
	    private $QUERY_AND_PROPS_CSS = []; // {query1: [prop, prop, ...], query2: [prop, ...], ...}

	    public function __construct($uniqueSelector, $gaps, $childrenPaddings) {
	        $this->selector = $uniqueSelector;

	        // валидация и очистка
	        $gaps = array_filter(
	        	array_map([$this, 'format'], (array) $gaps), 
	        	[$this, 'checkIsValidItem']
	        );
	        $childrenPaddings = array_filter(
	        	array_map([$this, 'format'], (array) $childrenPaddings), 
	        	[$this, 'checkIsValidItem']
	        );

	        // извлекаем правила, в которых не заданы значения min и max
			$this->gap = $this->getLastBase($gaps);
			$this->childrenPadding = $this->getLastBase($childrenPaddings);

			// оставляем правила, в которых задано хотябы одно из значений: min или max
			$gaps = array_filter( $gaps, function ($item) { return !$this->checkIsBaseItem($item); } );
			$childrenPaddings = array_filter( $childrenPaddings, function ($item) { return !$this->checkIsBaseItem($item); } );

			// приобразовываем правила в строки CSS, которые помещаются в QUERY_AND_PROPS_CSS и затем объединяем их в STYLE_CSS
			array_walk($gaps, function ($item) { $this->dataCollection($item, '--grid-layout-gap'); });
			$this->queryAndProps_toStyleCSS();
			array_walk($childrenPaddings, function ($item) { $this->dataCollection($item, '--grid-item-padding-child'); });
			$this->queryAndProps_toStyleCSS();
	    }

	    public function format($item) {
	        return [
				'value' => $item['value'] === '' || $item['value'] === null ? '' : intval($item['value']), 
				'min' => $item['min'] === '' || $item['min'] === null ? '' : intval($item['min']), 
				'max' => $item['max'] === '' || $item['max'] === null ? '' : intval($item['max'])
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
	    		function ($v, $item) { return $item['value']; }, 
	    		'' 
	    	);
		}

	    public function getQueryAndPropCSS($value, $min, $max, $propName) {
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
				'value' => $propName.':'.$value.'px;'
			];
		}

	    public function dataCollection($item, $propName) {
			[ 'query' => $query, 'value' => $value ] = $this->getQueryAndPropCSS( $item['value'], $item['min'], $item['max'], $propName );

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

	    public function getStyle() {
			return $this->STYLE_CSS;
		}
	}
}

$uniqueSelector = 'wp-block-autogrid-' . wp_unique_id();
$columnCount = $attributes["columnCount"];
$minWidth = $attributes["minWidth"];
$gaps = $attributes["gaps"];
$childrenPaddings = $attributes["childrenPaddings"];

$new_Andr_Autogrid = new Andr_Autogrid('.'.$uniqueSelector.'>*>*', $gaps, $childrenPaddings);
$gap = $new_Andr_Autogrid->gap;
$childrenPadding = $new_Andr_Autogrid->childrenPadding;
$style = $new_Andr_Autogrid->getStyle();
var_dump([$gap, $childrenPadding, $style]);

$inlineStyle =  "--grid-column-count:$columnCount;".
				"--grid-item-min-width:$minWidth"."px;".
				"--grid-layout-gap:$gap"."px;".
				"--grid-item-padding-child:$childrenPadding"."px;";
?>

<div <?php echo get_block_wrapper_attributes( ['class' => $uniqueSelector, 'style' => $inlineStyle] ); ?>>
	<div class="wp-block-andreslav-autogrid__container">
		<div class="wp-block-andreslav-autogrid__content">
			<?= $content; ?>
		</div>
	</div>
	<?= $style ? '<style>'.$style.'</style>' : ''; ?>
</div>
