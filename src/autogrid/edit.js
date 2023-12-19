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
import BaseControlMedia from '../../includes/BaseControlMedia';
import ModalMoreDetailed from '../../includes/ModalMoreDetailed';
import AutogridQuery from '../../includes/AutogridQuery';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({attributes, setAttributes, clientId}) {
	const ALLOWED_BLOCKS = [ 'andreslav/autogrid-item' ];

	const TEMPLATE = [
		 [ 'andreslav/autogrid-item', {} ],
		 [ 'andreslav/autogrid-item', {} ]
	];

	const newAutogridQuery = new AutogridQuery({
		selector: `#${'block-' + clientId}>*>*`
	})

	const gap = newAutogridQuery.apply({
		sizes: attributes.gaps, 
		propName: '--grid-layout-gap'
	})

	const childrenPadding = newAutogridQuery.apply({
		sizes: attributes.childrenPaddings, 
		propName: '--grid-item-padding-child'
	})

	const STYLE_CSS = newAutogridQuery.getCSS()

	return (
		<>
		<div { ...useBlockProps({ style: {
				'--grid-item-min-width': parseInt(attributes.minWidth) + 'px',
				'--grid-layout-gap': isNaN(gap) ? '' : gap + 'px',
				'--grid-item-padding-child': isNaN(childrenPadding) ? '' : childrenPadding + 'px',
				'--grid-column-count': parseInt(attributes.columnCount)
			} }) }>
			<div className='wp-block-andreslav-autogrid__container'>
				<div className='wp-block-andreslav-autogrid__content'>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} orientation="horizontal" />
				</div>
			</div>
			{ STYLE_CSS && <style dangerouslySetInnerHTML={{__html: STYLE_CSS }}></style> }
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
					required
				/>
				<UnitControl
					label={ __("Minimum column width", "autogrid-block") }
					onChange={(val) => { setAttributes({minWidth: parseInt(val)}) }}
					value={attributes.minWidth}
					min={0}
					units={[]}
					unit="px"
					required
				/>
				<BaseControlMedia
					help={
						<>
							{ __("This parameter allows you to set the gap between elements.", "autogrid-block") }
							<ModalMoreDetailed title={ __("Gaps", "autogrid-block") }>
								{ __("This parameter allows you to set the gap between elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MAX: 500] means that if the width of the container is less than 500 px, the spacing between elements should be 10 px.", "autogrid-block") }
							</ModalMoreDetailed>
						</>
					}
					label={ __("Gaps", "autogrid-block") }
					values={ attributes.gaps }
					onChange={(val) => { setAttributes({gaps: val}) }}
				/>
				<BaseControlMedia
					help={
						<>
							{ __("This parameter allows you to set the internal indentation of elements.", "autogrid-block") }
							<ModalMoreDetailed title={ __("Children paddings", "autogrid-block") }>
								{ __("This parameter allows you to set the internal indentation of elements. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MIN: 500] means that if the width of the container is greater than 500 px, the internal indentation of elements should be 10 px.", "autogrid-block") }
							</ModalMoreDetailed>
						</>
					}
					label={ __("Children paddings", "autogrid-block") }
					values={ attributes.childrenPaddings }
					onChange={(val) => { setAttributes({childrenPaddings: val}) }}
				/>
			</PanelBody>
		</InspectorControls>
		{/* End Sidebar Inspector Zone */}
		</>
	);
}
