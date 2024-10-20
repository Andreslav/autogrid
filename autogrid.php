<?php
/**
 * Plugin Name:       Autogrid
 * Description:       A block for the WordPress block editor that allows you to create responsive columns.
 * Requires at least: 6.4
 * Requires PHP:      7.0
 * Version:           2.0.7
 * Author:            Andreslav
 * Author URI:        https://profiles.wordpress.org/andreslav
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       autogrid
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function andreslav_autogrid_block_init() {
	// Generates an array of directory paths based on the build folder
	$block_directories = glob( __DIR__ . '/build/*', GLOB_ONLYDIR );

	foreach ( $block_directories as $block ) {
		register_block_type( $block );
		wp_set_script_translations( 'andreslav-' . basename( $block ) . '-editor-script', 'autogrid' );
	}
}
add_action( 'init', 'andreslav_autogrid_block_init' );
