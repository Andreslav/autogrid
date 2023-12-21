<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

namespace Andreslav;
include __DIR__ . '\..\..\includes\AutogridQuery.php';


if( !class_exists(AutogridChildQuery::class) ) {
	class AutogridChildQuery extends AutogridQuery {
		public function getQueryAndPropCSS($numberOfTracks, $startColumn, $endColumn, $propName, $otherData) {
			['minWidthBlock' => $minWidthBlock] = $otherData;
			$querySize = ''; $width; $minWidth; $maxWidth;

			if(	$startColumn !== '' ) {
				$width = $minWidthBlock * ($startColumn + 1) . 'px';
				$minWidth = "(min-width:$width)";
				$querySize = $querySize ? $querySize . ' and ' . $minWidth : $minWidth;
			}

			if( $endColumn !== '' ) {
				$width = $minWidthBlock * ($endColumn + 1) . 'px';
				$maxWidth = "(max-width:$width)";
				$querySize = $querySize ? $querySize . ' and ' . $maxWidth : $maxWidth;
			}

			return [
				'query' => $querySize ? "@container autogrid $querySize" : '',
				'value' => $propName . ':' . $numberOfTracks . ';'
			];
		}
	}
}

$uniqueSelector = 'wp-block-autogrid-item-' . wp_unique_id();
$sizes          = (array) $attributes['sizes'];
$minWidth       = intval($block->context['autogrid/minWidth']);
// $indexNode      = $attributes['indexNode'];

$new_AutogridChildQuery = new AutogridChildQuery([
	'selector'  => '.' . $uniqueSelector,
	'otherData' => ['minWidthBlock' => $minWidth]
]);

$size = $new_AutogridChildQuery->apply([
	'sizes'    => $sizes,
	'propName' => '--grid-item-column-span'
]);

$STYLE_CSS = $new_AutogridChildQuery->getCSS();

$inlineStyle = $size === '' ? '' :  "--grid-item-column-span:$size;";
?>

<div <?= get_block_wrapper_attributes( ['class' => $uniqueSelector, 'style' => $inlineStyle] ); ?>>
	<?= $content; ?>
	<?= $STYLE_CSS ? "<style>$STYLE_CSS</style>" : ''; ?>
</div>
