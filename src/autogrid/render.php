<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

namespace Andreslav;
include __DIR__ . '/../../includes/AutogridQuery.php';


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
	'propNames' => [
		'horizontal' => '--grid-layout-gap-x',
		'vertical' => '--grid-layout-gap-y',
	],
]);

$childrenPadding = $new_AutogridQuery->apply([
	'sizes'    => $childrenPaddings,
	'propNames' => [
		'horizontal' => '--grid-item-padding-child-x',
		'vertical' => '--grid-item-padding-child-y',
	],
]);

$gapHorizontal = $gap->horizontal;
$gapVertical = $gap->vertical;

$childrenPaddingHorizontal = $childrenPadding->horizontal;
$childrenPaddingVertical = $childrenPadding->vertical;

$STYLE_CSS = $new_AutogridQuery->getCSS();
$STYLE_CSS = $STYLE_CSS ? "<style>$STYLE_CSS</style>" : '';

$inlineStyle =  "--grid-column-count:$columnCount;" .
				"--grid-item-min-width:$minWidth"."px;" .
				( $gapHorizontal ? "--grid-layout-gap-x:$gapHorizontal;" : '' ) .
				( $gapVertical ? "--grid-layout-gap-y:$gapVertical;" : '' ) .
				( $childrenPaddingHorizontal ? "--grid-item-padding-child-x:$childrenPaddingHorizontal;" : '' ) .
				( $childrenPaddingVertical ? "--grid-item-padding-child-y:$childrenPaddingVertical;" : '' );
?>

<div <?php echo get_block_wrapper_attributes( ['class' => "$uniqueSelector andreslav-outside-editor", 'style' => $inlineStyle] ); ?>>
	<div class="wp-block-andreslav-autogrid__container">
		<div class="wp-block-andreslav-autogrid__content">
			<?php echo $content; ?>
		</div>
	</div>
	<?php 
		// @link https://core.trac.wordpress.org/ticket/48873
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $STYLE_CSS;
	?>
</div>
