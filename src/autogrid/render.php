<?php
/**
 * Dynamic Block Template.
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
*/

$minWidth = $attributes["minWidth"];
$gap = $attributes["gap"];
$paddingChild = $attributes["paddingChild"];
$columnCount = $attributes["columnCount"];
$inlineStyle = "--grid-item-min-width:$minWidth"."px;--grid-layout-gap:$gap"."px;--grid-item-padding-child:$paddingChild"."px;--grid-column-count:$columnCount";
?>

<div <?php echo get_block_wrapper_attributes(); ?> style="<?= $inlineStyle ?>">
	<?php echo $content; ?>
</div>
