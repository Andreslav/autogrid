/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useEffect, useState } from 'react';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */
import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button, Dashicon, Flex, FlexBlock, FlexItem, BaseControl, __experimentalNumberControl as NumberControl } from '@wordpress/components'

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
export default function Edit({attributes, setAttributes, context, clientId}) {

	const TEMPLATE = [
	    [ 'core/paragraph', {} ]
	];

	const minMax = (value, min, max) => Math.min(Math.max(value, min), max);
	function autogrid_getCSS(startColumn, endColumn, minWidth, gap, numberOfTracks, uniqueSelector) {
		let query = '';

		if(	!isNaN(startColumn) ) {
			let width = (minWidth * (startColumn + 1) + gap * startColumn) + 'px';
			let min = `(min-width:${width})`;
			query = query ? query + ' and ' + min : min;
		}

		if( !isNaN(endColumn) ) {
			let width = (minWidth * (endColumn + 1) + gap * endColumn) + 'px';
			let max = `(max-width:${width})`;
			query = query ? query + ' and ' + max : max;
		}
		
		return query ? `@container autogrid ${query}{#`+uniqueSelector+`{--grid-item-column-span:${numberOfTracks};}}` : '';
	}

	const uniqueSelector = 'block-' + clientId;
	const columnCount = parseInt(context['autogrid/columnCount']);
	const minWidth = parseInt(context['autogrid/minWidth']);
	const gap = parseInt(context['autogrid/gap']);

	const [stop, setStop] = useState(1);
	useEffect(() => {
		if(!stop) {
			let validSizes = attributes.sizes.map((size, index) => {
				let startColumn = size['startColumn'];
				let numberOfTracks = size['numberOfTracks'];
				let endColumn = size['endColumn'];

				return { startColumn, numberOfTracks: 1, endColumn }
			})

			setAttributes({sizes: validSizes});
		} else {
			setStop(0);

			let node = document.body.querySelector('#' + uniqueSelector);
			let indexNode = [...node.parentElement.children].indexOf(node);
			setAttributes({indexNode});
		}
	}, [columnCount]);

	let style = '';
	attributes.sizes.forEach(size => {
		let startColumn = parseInt(size['startColumn']);
		let numberOfTracks = parseInt(size['numberOfTracks']);
		let endColumn = parseInt(size['endColumn']);
		style += autogrid_getCSS(startColumn, endColumn, minWidth, gap, numberOfTracks, uniqueSelector);
	})
	
	return (
		<>
		<div { ...useBlockProps({ style: {
			// 'order': attributes.indexNode
		} }) }>
			<InnerBlocks template={TEMPLATE} orientation="horizontal" />
			{ style && <style>{style}</style> }
		</div>

		{/* Begin Sidebar Inspector Zone */}
		<InspectorControls>
			<PanelBody title="Settings">
				<BaseControl
				  __nextHasNoMarginBottom
				  help="Сколько колонок занимает блок, когда количество колонок больше СТАРТ и (или) меньше КОНЕЦ"
				>
				<Flex>
					<FlexBlock>
						<BaseControl.VisualLabel>Sizes</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexItem>
						<Button 
							icon={ <Dashicon icon="plus-alt2"/> } 
							label="Add" 
							onClick={() => {
								setAttributes({sizes: [{startColumn: columnCount - 1, numberOfTracks: 1, endColumn: ''}, ...attributes.sizes]})
							}}
						/>
					</FlexItem>
				</Flex>
				{
					!!attributes.sizes.length && <Flex>
						<FlexBlock>
							<BaseControl.VisualLabel>Tracks</BaseControl.VisualLabel>
						</FlexBlock>
						<FlexBlock>
							<BaseControl.VisualLabel>Start</BaseControl.VisualLabel>
						</FlexBlock>
						<FlexBlock>
							<BaseControl.VisualLabel>End</BaseControl.VisualLabel>
						</FlexBlock>
						<FlexItem>
							<Button 
								icon={ <Dashicon icon=""/> } 
								label=""
								disabled
							/>
						</FlexItem>
				    </Flex>
				}
				{
					attributes.sizes.map((size, index) => {
						return (
							<Flex key={index}>
								<FlexBlock>
									<NumberControl
										label="Tracks"
										hideLabelFromVision
										// hideHTMLArrows
										onChange={(val) => { size.numberOfTracks = val; setAttributes({sizes: [...attributes.sizes]}) }}
										value={size.numberOfTracks}
										min={1}
										max={columnCount}
									/>
								</FlexBlock>
								<FlexBlock>
									<NumberControl
										label="Start"
										hideLabelFromVision
										// hideHTMLArrows
										onChange={(val) => { size.startColumn = val; setAttributes({sizes: [...attributes.sizes]}) }}
										value={size.startColumn}
										min={0}
										max={columnCount}
									/>
								</FlexBlock>
								<FlexBlock>
									<NumberControl
										label="End"
										hideLabelFromVision
										// hideHTMLArrows
										onChange={(val) => { size.endColumn = val; setAttributes({sizes: [...attributes.sizes]}) }}
										value={size.endColumn}
										min={0}
										max={columnCount}
									/>
								</FlexBlock>
								<FlexItem>
									<Button 
										icon={ <Dashicon icon="minus"/> } 
										label="Remove" 
										onClick={() => {
											setAttributes({sizes: attributes.sizes.filter((size, i) => i != index)})
										}}
									/>
								</FlexItem>
						    </Flex>
						)
					})
				}
			    </BaseControl>
			</PanelBody>
		</InspectorControls>
		{/* End Sidebar Inspector Zone */}
		</>
	);
}