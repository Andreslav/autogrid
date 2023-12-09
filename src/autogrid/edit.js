/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, RangeControl, __experimentalNumberControl as NumberControl } from '@wordpress/components';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes}) {
	const ALLOWED_BLOCKS = [ 'andreslav/item-autogrid' ];

	const TEMPLATE = [
	    [ 'andreslav/item-autogrid', {} ],
	    [ 'andreslav/item-autogrid', {} ]
	];

	return (
		<>
		<div { ...useBlockProps({ style: {
			'--grid-item-min-width': attributes.minWidth + 'px',
			'--grid-layout-gap': attributes.gap + 'px',
			'--grid-item-padding-child': attributes.paddingChild + 'px',
			'--grid-column-count': attributes.columnCount
		} }) }>
			<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} orientation="horizontal" />
		</div>

		{/* Begin Sidebar Inspector Zone */}
		<InspectorControls>
			<PanelBody title="Settings">
				<RangeControl
					label="Column count"
					help="Select how long each slide of the carousel is shown in seconds"
					min={1}
					value={attributes.columnCount}
					onChange={(val) => { setAttributes({columnCount: val})}}
				/>
				<NumberControl
					label="Min width"
					onChange={(val) => { setAttributes({minWidth: val})}}
					value={attributes.minWidth}
					min={0}
				/>
				<NumberControl
					label="Layout gap"
					onChange={(val) => { setAttributes({gap: val})}}
					value={attributes.gap}
					min={0}
				/>
				<NumberControl
					label="Padding child"
					onChange={(val) => { setAttributes({paddingChild: val})}}
					value={attributes.paddingChild}
					min={0}
				/>
			</PanelBody>
		</InspectorControls>
		{/* End Sidebar Inspector Zone */}
		</>
	);
}
