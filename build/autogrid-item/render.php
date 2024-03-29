<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

namespace Andreslav\Autogrid;
include __DIR__ . '/../../includes/CSSQuery.php';


if( !class_exists(CSSQueryChild::class) ) {
	class CSSQueryChild extends CSSQuery {
		public function getQueryAndPropCSS($numberOfTracks, $startColumn, $endColumn, $propName, $otherData) {
			['minWidthBlock' => $minWidthBlock] = $otherData;
			$querySize = ''; $width; $minWidth; $maxWidth;

			if(	$startColumn !== '' ) {
				$width = $minWidthBlock * ($startColumn + 1) . 'px';
				$minWidth = "(min-width:$width)";
				$querySize = $querySize ? $querySize . ' and ' . $minWidth : $minWidth;
			}

			if( $endColumn !== '' ) {
				$width = ($minWidthBlock * ($endColumn + 1) - 1) . 'px';
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

$new_CSSQueryChild = new CSSQueryChild([
	'selector'  => '.' . $uniqueSelector,
	'otherData' => [ 'minWidthBlock' => $minWidth ]
]);

$size = $new_CSSQueryChild->apply([
	'sizes'    => $sizes,
	'defaultValueUnit' => '',
	'propNames' => [
		'all' => '--grid-item-column-span',
	],
]);

$sizeAll = $size->all ?? '';

$STYLE_CSS = $new_CSSQueryChild->getCSS();
$STYLE_CSS = $STYLE_CSS ? "<style>$STYLE_CSS</style>" : '';

$inlineStyle = $sizeAll ? "--grid-item-column-span:$sizeAll;" : '';
?>

<div <?php echo get_block_wrapper_attributes( ['class' => $uniqueSelector, 'style' => $inlineStyle] ); ?>>
	<?php
		// Нет подходящей функции очистки
		echo $content;
	?>
</div>
<?php echo wp_kses($STYLE_CSS, ['style' => []]); ?>
