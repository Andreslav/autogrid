<?php
/**
 * Dynamic Block Template.
 *
 * @param   array $attributes - A clean associative array of block attributes.
 * @param   array $block - All the block settings and attributes.
 * @param   string $content - The block inner HTML (usually empty unless using inner blocks).
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

namespace Andreslav\Autogrid;

require __DIR__ . '/../../includes/CSSQuery.php';


$unique_selector         = 'wp-block-autogrid-' . wp_unique_id();
$gaps                    = $attributes['gaps'];
$children_paddings       = $attributes['childrenPaddings'];
$column_count            = intval( $attributes['columnCount'] );
$min_width               = intval( $attributes['minWidth'] );
$child_item_color        = isset( $attributes['childItemColor'] ) ? $attributes['childItemColor'] : '';
$custom_child_item_color = isset( $attributes['customChildItemColor'] ) ? $attributes['customChildItemColor'] : '';

/*
	Нацеливание на потомка необходимо для корректной работы адаптивности.

	Причина
	selector {
		container-name: autogrid;
	}
	@container autogrid (...) {
		selector {
			// Стили не применяются!
		}
	}

	Но
	@container autogrid (...) {
		selector > * {
			// Применяются
		}
	}
*/
$new_css_query = new CSSQuery(
	[
		'selector'       => '.' . $unique_selector . '>*',
		'container_name' => 'autogrid-root',
	]
);

$gap = $new_css_query->apply(
	[
		'sizes'      => $gaps,
		'prop_names' => [
			'horizontal' => '--grid-layout-gap-x',
			'vertical'   => '--grid-layout-gap-y',
		],
	]
);

$children_paddings = $new_css_query->apply(
	[
		'sizes'      => $children_paddings,
		'prop_names' => [
			'horizontal' => '--grid-item-padding-child-x',
			'vertical'   => '--grid-item-padding-child-y',
		],
	]
);

$gap_horizontal = $gap->horizontal;
$gap_vertical   = $gap->vertical;

$children_padding_horizontal = $children_paddings->horizontal;
$children_padding_vertical   = $children_paddings->vertical;

$style_css = $new_css_query->get_css();
$style_css = $style_css ? "<style>$style_css</style>" : '';

$child_item_background_color = $child_item_color ? "var(--wp--preset--color--$child_item_color)" : $custom_child_item_color;

$inline_style = "--grid-column-count:$column_count;" .
				"--grid-item-min-width:$min_width" . 'px;' .
				( $gap_horizontal ? "--grid-layout-gap-x:$gap_horizontal;" : '' ) .
				( $gap_vertical ? "--grid-layout-gap-y:$gap_vertical;" : '' ) .
				( $children_padding_horizontal ? "--grid-item-padding-child-x:$children_padding_horizontal;" : '' ) .
				( $children_padding_vertical ? "--grid-item-padding-child-y:$children_padding_vertical;" : '' ) .
				( $child_item_background_color ? "--grid-item-background-color:$child_item_background_color;" : '' );

$block_attributes = [
	'class' => "$unique_selector andreslav-outside-editor",
	'style' => $inline_style,
]; ?>

<div <?php echo get_block_wrapper_attributes( $block_attributes ); ?>>
	<div class="wp-block-andreslav-autogrid__content-wraper"><?php // дополнительная обёртка для исправления бага в Safari ?>
		<div class="wp-block-andreslav-autogrid__content">
			<?php
				// Нет подходящей функции очистки
				// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				echo $content;
			?>
		</div>
	</div>
	<?php
		// Нет подходящей функции очистки
		// @link https://core.trac.wordpress.org/ticket/48873
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $style_css;
	?>
</div>
