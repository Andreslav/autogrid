<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

namespace Andr;
include __DIR__ . '\..\..\src\inc\AutogridQuery.php';


$uniqueSelector   = 'wp-block-autogrid-' . wp_unique_id();
$gaps             = $attributes["gaps"];
$childrenPaddings = $attributes["childrenPaddings"];
$columnCount      = intval($attributes["columnCount"]);
$minWidth         = intval($attributes["minWidth"]);

$new_AutogridQuery = new AutogridQuery([
	'selector' => '.' . $uniqueSelector . '>*>*'
]);

$gap = $new_AutogridQuery->apply([
	'sizes'    => $gaps, 
	'propName' => '--grid-layout-gap'
]);

$childrenPadding = $new_AutogridQuery->apply([
	'sizes'    => $childrenPaddings, 
	'propName' => '--grid-item-padding-child'
]);

$STYLE_CSS = $new_AutogridQuery->getCSS();

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
	<?= $STYLE_CSS ? "<style>$STYLE_CSS</style>" : ''; ?>
</div>
