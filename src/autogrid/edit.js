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
import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
} from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	__experimentalUnitControl as UnitControl,
} from '@wordpress/components';
import BaseControlMedia from '../../includes/BaseControlMedia';
import ModalMoreDetailed from '../../includes/ModalMoreDetailed';
import CSSQuery from '../../includes/CSSQuery';

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
export default function Edit( { attributes, setAttributes, clientId } ) {
	const ALLOWED_BLOCKS = [ 'andreslav/autogrid-item' ];

	const TEMPLATE = [
		[ 'andreslav/autogrid-item', {} ],
		[ 'andreslav/autogrid-item', {} ],
	];

	const newCSSQuery = new CSSQuery( {
		selector: `#${ 'block-' + clientId }>*>*`,
	} );

	const gap = newCSSQuery.apply( {
		sizes: attributes.gaps,
		propNames: {
			horizontal: '--grid-layout-gap-x',
			vertical: '--grid-layout-gap-y',
		},
	} );

	const childrenPadding = newCSSQuery.apply( {
		sizes: attributes.childrenPaddings,
		propNames: {
			horizontal: '--grid-item-padding-child-x',
			vertical: '--grid-item-padding-child-y',
		},
	} );

	const STYLE_CSS = newCSSQuery.getCSS();

	return (
		<>
			<div
				{ ...useBlockProps( {
					style: {
						'--grid-item-min-width':
							parseInt( attributes.minWidth ) + 'px',
						'--grid-layout-gap-x': gap.horizontal,
						'--grid-layout-gap-y': gap.vertical,
						'--grid-item-padding-child-x':
							childrenPadding.horizontal,
						'--grid-item-padding-child-y': childrenPadding.vertical,
						'--grid-column-count': parseInt(
							attributes.columnCount
						),
					},
				} ) }
			>
				<div className="wp-block-andreslav-autogrid__container">
					<div className="wp-block-andreslav-autogrid__content">
						<InnerBlocks
							allowedBlocks={ ALLOWED_BLOCKS }
							template={ TEMPLATE }
							orientation="horizontal"
						/>
					</div>
				</div>
				{ STYLE_CSS && (
					<style
						dangerouslySetInnerHTML={ { __html: STYLE_CSS } }
					></style>
				) }
			</div>

			{ /* Begin Sidebar Inspector Zone */ }
			<InspectorControls>
				<PanelBody title={ __( 'Settings', 'autogrid' ) }>
					<RangeControl
						label={ __( 'Maximum number of columns', 'autogrid' ) }
						help={ __(
							'This value also includes the spacing between cells.',
							'autogrid'
						) }
						min={ 1 }
						value={ attributes.columnCount }
						onChange={ ( val ) => {
							setAttributes( { columnCount: val } );
						} }
						required
					/>
					<UnitControl
						label={ __( 'Minimum column width', 'autogrid' ) }
						help={ __(
							'When the cells reach this width, they are rearranged.',
							'autogrid'
						) }
						onChange={ ( val ) => {
							setAttributes( { minWidth: parseInt( val ) } );
						} }
						value={ attributes.minWidth }
						min={ 0 }
						units={ [] }
						unit="px"
						required
					/>
					<BaseControlMedia
						help={
							<>
								{ __(
									'This parameter allows you to set the spacing between cells.',
									'autogrid'
								) }
								<ModalMoreDetailed
									title={ __(
										'Spacing between cells',
										'autogrid'
									) }
								>
									<p
										dangerouslySetInnerHTML={ {
											__html: __(
												'This parameter allows you to set the spacing between cells. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the rule [VALUE: 10, MAX: 500] means that if the width of the container is less than 500 px, the spacing between cells should be 10 px.',
												'autogrid'
											),
										} }
									></p>
									<p>
										{ __(
											'If more than one rule is created, the lower one has higher priority.',
											'autogrid'
										) }
									</p>
								</ModalMoreDetailed>
							</>
						}
						label={ __( 'Spacing between cells', 'autogrid' ) }
						values={ attributes.gaps }
						isAxis
						lockLastElement
						onChange={ ( val ) => {
							setAttributes( { gaps: val } );
						} }
						minProp={ {
							help: __( 'Min', 'autogrid' ),
						} }
						maxProp={ {
							help: __( 'Max', 'autogrid' ),
						} }
					/>
					<BaseControlMedia
						help={
							<>
								{ __(
									'This option allows you to set the padding of cells.',
									'autogrid'
								) }
								<ModalMoreDetailed
									title={ __(
										'Padding of cells',
										'autogrid'
									) }
								>
									<p
										dangerouslySetInnerHTML={ {
											__html: __(
												'This option allows you to set the padding of cells. The MIN and MAX values are optional and can be used to customize the adaptability of the parameter. For example, the [VALUE: 10, MIN: 500] rule means that when <u>the container width</u> is greater than 500 px, the padding of cells should be 10 px.',
												'autogrid'
											),
										} }
									></p>
									<p>
										{ __(
											'If more than one rule is created, the lower one has higher priority.',
											'autogrid'
										) }
									</p>
								</ModalMoreDetailed>
							</>
						}
						label={ __( 'Padding of cells', 'autogrid' ) }
						values={ attributes.childrenPaddings }
						isAxis
						lockLastElement
						onChange={ ( val ) => {
							setAttributes( { childrenPaddings: val } );
						} }
						minProp={ {
							help: __( 'Min', 'autogrid' ),
						} }
						maxProp={ {
							help: __( 'Max', 'autogrid' ),
						} }
					/>
				</PanelBody>
			</InspectorControls>
			{ /* End Sidebar Inspector Zone */ }
		</>
	);
}
