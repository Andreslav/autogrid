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


if ( ! class_exists( CSSQueryChild::class ) ) {
	class CSSQueryChild extends CSSQuery {
		public function get_query_and_prop_css( $number_of_tracks, $start_column, $end_column, $prop_name, $container_name, $other_data ) {
			$min_width_block = $other_data['min_width_block'];
			$query_size      = '';
			$width;
			$min_width;
			$max_width;

			if ( $start_column !== '' ) {
				$width      = $min_width_block * ( $start_column + 1 ) . 'px';
				$min_width  = "(min-width:$width)";
				$query_size = $query_size ? $query_size . ' and ' . $min_width : $min_width;
			}

			if ( $end_column !== '' ) {
				$width      = ( $min_width_block * ( $end_column + 1 ) - 1 ) . 'px';
				$max_width  = "(max-width:$width)";
				$query_size = $query_size ? $query_size . ' and ' . $max_width : $max_width;
			}

			return [
				'query' => $query_size ? "@container $container_name $query_size" : '',
				'value' => $prop_name . ':' . $number_of_tracks . ';',
			];
		}
	}
}

$unique_selector = 'wp-block-autogrid-item-' . wp_unique_id();
$sizes           = (array) $attributes['sizes'];
$min_width       = intval( $block->context['autogrid/minWidth'] );

$new_css_query_child = new CSSQueryChild(
	[
		'selector'       => '.' . $unique_selector,
		'other_data'     => [ 'min_width_block' => $min_width ],
		'container_name' => 'autogrid',
	]
);

$size = $new_css_query_child->apply(
	[
		'sizes'              => $sizes,
		'default_value_unit' => '',
		'prop_names'         => [
			'all' => '--grid-item-column-span',
		],
	]
);

$size_all = $size->all ?? '';

$style_css = $new_css_query_child->get_css();
$style_css = $style_css ? "<style>$style_css</style>" : '';

$inline_style = $size_all ? "--grid-item-column-span:$size_all;" : '';

$block_attributes = [
	'class' => $unique_selector,
	'style' => $inline_style,
]; ?>

<div <?php echo get_block_wrapper_attributes( $block_attributes ); ?>>
	<?php
		// Нет подходящей функции очистки
		// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		echo $content;
	?>
</div>
<?php echo wp_kses( $style_css, [ 'style' => [] ] ); ?>
