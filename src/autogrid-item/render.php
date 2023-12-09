<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

if( !function_exists('autogrid_getCSS') ) {
	function autogrid_getCSS($startColumn, $endColumn, $minWidth, $gap, $numberOfTracks, $uniqueSelector) {
		$query = '';

		if($startColumn != '') {
			$width = ($minWidth * ($startColumn + 1) + $gap * $startColumn) . 'px';
			$min = "(min-width:$width)";
			$query = $query ? $query . ' and ' . $min : $min;
		}

		if($endColumn != '') {
			$width = ($minWidth * ($endColumn + 1) + $gap * $endColumn) . 'px';
			$max = "(max-width:$width)";
			$query = $query ? $query . ' and ' . $max : $max;
		}
		
		return $query ? "@container autogrid $query{.".$uniqueSelector."{--grid-item-column-span:$numberOfTracks;}}" : '';
	}
}

$uniqueSelector = 'wp-block-autogrid-item-' . wp_unique_id();
$indexNode      = $attributes['indexNode'];
$sizes          = $attributes['sizes'];
$columnCount    = intval($block->context['autogrid/columnCount']);
$minWidth       = intval($block->context['autogrid/minWidth']);
$gap            = intval($block->context['autogrid/gap']);

$style = '';
foreach ($sizes as $size) {
	$startColumn = $size['startColumn'] == '' ? '' : intval($size['startColumn']);
	$numberOfTracks = max(intval($size['numberOfTracks']), 1);
	$endColumn = $size['endColumn'] == '' ? '' : intval($size['endColumn']);
	$style .= autogrid_getCSS($startColumn, $endColumn, $minWidth, $gap, $numberOfTracks, $uniqueSelector);
}
$style = $style ? '<style>'.$style.'</style>' : '';
$inlineStyle = '' // "order:$indexNode"
?>

<div <?= get_block_wrapper_attributes(['class' => $uniqueSelector, 'style' => $inlineStyle]); ?>>
	<?= $content; ?>
	<?= $style; ?>
</div>
