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
import { PanelBody, RangeControl, __experimentalUnitControl as UnitControl } from '@wordpress/components';

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
	const ALLOWED_BLOCKS = [ 'andreslav/autogrid-item' ];

	const TEMPLATE = [
	    [ 'andreslav/autogrid-item', {} ],
	    [ 'andreslav/autogrid-item', {} ]
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
			<PanelBody title={ __("Settings", "autogrid-block") }>
				<RangeControl
					label={ __("Maximum number of columns", "autogrid-block") }
					help={ __("When the blocks reach this width, they are rearranged.", "autogrid-block") }
					min={1}
					value={attributes.columnCount}
					onChange={(val) => { setAttributes({columnCount: val}) }}
				/>
				<UnitControl
					label={ __("Minimum column width", "autogrid-block") }
					onChange={(val) => { setAttributes({minWidth: parseInt(val)}) }}
					value={attributes.minWidth}
					min={0}
					units={[]}
					unit="px"
				/>
				<UnitControl
					label={ __("Spaces between blocks", "autogrid-block") }
					onChange={(val) => { setAttributes({gap: parseInt(val)}) }}
					value={attributes.gap}
					min={0}
					units={[]}
					unit="px"
				/>
				<UnitControl
					label={ __("Padding of blocks", "autogrid-block") }
					onChange={(val) => { setAttributes({paddingChild: parseInt(val)}) }}
					value={attributes.paddingChild}
					min={0}
					units={[]}
					unit="px"
				/>
			</PanelBody>
		</InspectorControls>
		{/* End Sidebar Inspector Zone */}
		</>
	);
}
