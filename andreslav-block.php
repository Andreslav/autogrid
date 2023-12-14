<?php
/**
 * Plugin Name:       Autogrid Block
 * Description:       CSS auto grid
 * Requires at least: 6.4
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Andreslav
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       andreslav-block
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
function andreslav_block_andreslav_block_block_init() {
	// Generates an array of directory paths based on the build folder
	$block_directories = glob(__DIR__ . "/build/*", GLOB_ONLYDIR);

	foreach ($block_directories as $block) {
		register_block_type( $block );
	}
}
add_action( 'init', 'andreslav_block_andreslav_block_block_init' );
