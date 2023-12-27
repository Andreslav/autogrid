/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from '@wordpress/element';

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
	Button,
	Dashicon,
	Flex,
	FlexBlock,
	FlexItem,
	BaseControl,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';
import BaseControlMedia from '../../includes/BaseControlMedia';
import ModalMoreDetailed from '../../includes/ModalMoreDetailed';
import AutogridQuery from '../../includes/AutogridQuery';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

class AutogridChildQuery extends AutogridQuery {
	getQueryAndPropCSS(
		numberOfTracks,
		startColumn,
		endColumn,
		propName,
		{ minWidthBlock }
	) {
		let querySize = '',
			width,
			minWidth,
			maxWidth;

		if ( ! isNaN( startColumn ) ) {
			width = minWidthBlock * ( startColumn + 1 ) + 'px';
			minWidth = `(min-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + minWidth : minWidth;
		}

		if ( ! isNaN( endColumn ) ) {
			width = minWidthBlock * ( endColumn + 1 ) + 'px';
			maxWidth = `(max-width:${ width })`;
			querySize = querySize ? querySize + ' and ' + maxWidth : maxWidth;
		}

		return {
			query: querySize ? `@container autogrid ${ querySize }` : '',
			value: `${ propName }:${ numberOfTracks };`,
		};
	}
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( {
	attributes,
	setAttributes,
	context,
	clientId,
} ) {
	const TEMPLATE = [ [ 'core/paragraph', {} ] ];

	const uniqueSelector = 'block-' + clientId;
	const minWidth = parseInt( context[ 'autogrid/minWidth' ] );
	const sizes = attributes.sizes;

	const newAutogridChildQuery = new AutogridChildQuery( {
		selector: `#${ uniqueSelector }`,
		otherData: { minWidthBlock: minWidth },
	} );

	const size = newAutogridChildQuery.apply( {
		sizes: sizes,
		propName: '--grid-item-column-span',
	} );

	const STYLE_CSS = newAutogridChildQuery.getCSS();

	const columnCount = parseInt( context[ 'autogrid/columnCount' ] );
	const [ stop, setStop ] = useState( 1 );
	useEffect( () => {
		if ( ! stop ) {
			let validSizes = sizes.map( ( size, index ) => {
				let value = size[ 'value' ];
				let min = size[ 'min' ];
				let max = size[ 'max' ];

				return { value, min: 1, max };
			} );

			setAttributes( { sizes: validSizes } );
		} else {
			setStop( 0 );

			// let node = document.body.querySelector('#' + uniqueSelector);
			// let indexNode = [...node.parentElement.children].indexOf(node);
			// setAttributes({indexNode});
		}
	}, [ columnCount ] );

	return (
		<>
			<div
				{ ...useBlockProps( {
					style: {
						'--grid-item-column-span': isNaN( size ) ? '' : size,
						// 'order': attributes.indexNode
					},
				} ) }
			>
				<InnerBlocks template={ TEMPLATE } orientation="horizontal" />
			</div>

			{ STYLE_CSS && (
				<style
					dangerouslySetInnerHTML={ { __html: STYLE_CSS } }
				></style>
			) }

			{ /* Begin Sidebar Inspector Zone */ }
			<InspectorControls>
				<PanelBody title="Settings">
					<BaseControlMedia
						help={
							<>
								{ __(
									'By default, a cell occupies one column. This option allows you to change this.',
									'autogrid'
								) }
								<ModalMoreDetailed
									title={ __( 'Cell size', 'autogrid' ) }
								>
									<p>
										{ __(
											'By default, a cell occupies one column. This option allows you to change this by defining rules that include the following parameters:',
											'autogrid'
										) }
									</p>
									<ul>
										<li
											dangerouslySetInnerHTML={ {
												__html: __(
													'1. <b>The number of columns</b> that the cell should occupy.',
													'autogrid'
												),
											} }
										></li>
										<li
											dangerouslySetInnerHTML={ {
												__html: __(
													'2. <b>The minimum number of columns to be displayed</b> when the rule should start to apply. Optional parameter.',
													'autogrid'
												),
											} }
										></li>
										<li
											dangerouslySetInnerHTML={ {
												__html: __(
													'3. <b>The maximum number of displayed columns</b> after which the rule should stop applying. Optional parameter.',
													'autogrid'
												),
											} }
										></li>
									</ul>
									<p>
										{ __(
											'If more than one rule is created, the lower one has higher priority.',
											'autogrid'
										) }
									</p>
								</ModalMoreDetailed>
							</>
						}
						label={ __( 'Cell size', 'autogrid' ) }
						valueProp={ {
							min: 1,
							max: columnCount,
							label: __( 'Number of columns', 'autogrid' ),
						} }
						minProp={ {
							max: columnCount,
							label: __(
								'Minimum number of columns displayed',
								'autogrid'
							),
						} }
						maxProp={ {
							max: columnCount,
							label: __(
								'Maximum number of columns displayed.',
								'autogrid'
							),
						} }
						values={ sizes }
						onChange={ ( val ) => {
							setAttributes( { sizes: val } );
						} }
						baseRule={ {
							value: columnCount - 1,
							min: 1,
							max: '',
						} }
						unlockLastElement
						disableUnits
					/>
				</PanelBody>
			</InspectorControls>
			{ /* End Sidebar Inspector Zone */ }
		</>
	);
}
