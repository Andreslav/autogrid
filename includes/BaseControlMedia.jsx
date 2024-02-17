/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 * @see https://wordpress.github.io/gutenberg/?path=/docs/components-anglepickercontrol--default
 */
import {
	Button,
	Dashicon,
	Icon,
	Flex,
	FlexBlock,
	FlexItem,
	BaseControl,
} from '@wordpress/components';

import {
	plus,
	reset,
	mobile,
	sidesAll,
	sidesHorizontal,
	sidesVertical,
} from '@wordpress/icons';

import OneSpacingSizesControl from './OneSpacingSizesControl';
import DropdownMenuRadio from './DropdownMenuRadio';
import BaseControlMediaItem from './BaseControlMediaItem';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './BaseControlMedia.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function BaseControlMedia( {
	help,
	label,
	values,
	onChange,
	disableUnits,
	baseRule,
	isAxis,
	lockLastElement,
	valueProp = {},
	minProp = {},
	maxProp = {},
} ) {
	const controlsAxis = [
		{
			slug: 'all',
			label: 'All',
			icon: sidesAll,
		},
		{
			slug: 'horizontal',
			label: 'Horizontal',
			icon: sidesHorizontal,
		},
		{
			slug: 'vertical',
			label: 'Vertical',
			icon: sidesVertical,
		},
	];

	const [ forceUpdate, setForceUpdate ] = useState( 0 );
	const onSetForceUpdate = () => setForceUpdate( ( v ) => ++v );

	const onAddRule = () => {
		onChange( [
			...values,
			baseRule || {
				value: 0,
				min: '',
				max: '',
				...( isAxis ? { axis: controlsAxis[ 0 ].slug } : {} ),
			},
		] );
	};
	const onChangeMediaItem = ( index, val ) => {
		values = [ ...values ];
		values.splice( index, 1, val );
		onChange( values );
	};
	const onDeleteMediaItem = ( index ) => {
		onChange( values.filter( ( value, i ) => i != index ) );
	};
	const onMoveUpMediaItem = ( index ) => {
		values = [ ...values ];
		[ values[ index - 1 ], values[ index ] ] = [
			values[ index ],
			values[ index - 1 ],
		];
		onChange( values );
		onSetForceUpdate();
	};
	const onMoveDownMediaItem = ( index ) => {
		values = [ ...values ];
		[ values[ index + 1 ], values[ index ] ] = [
			values[ index ],
			values[ index + 1 ],
		];
		onChange( values );
		onSetForceUpdate();
	};

	return (
		<BaseControl
			__nextHasNoMarginBottom
			help={ <span style={ { fontSize: '12px' } }>{ help }</span> }
			className="autogrid-base-control-media"
		>
			<Flex>
				<BaseControl.VisualLabel
					as="legend"
					style={ { marginBottom: 0 } }
				>
					{ label }
				</BaseControl.VisualLabel>
				<Button
					icon={ plus }
					label={ __( 'Add a rule', 'autogrid' ) }
					iconSize={ 24 }
					onClick={ onAddRule }
				/>
			</Flex>
			{ disableUnits && !! values.length && (
				<Flex className="autogrid-help-visual-label">
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Value', 'autogrid' ) }
						</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Min', 'autogrid' ) }
						</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Max', 'autogrid' ) }
						</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexItem>
						<Button
							icon={ <Dashicon icon="" /> }
							style={ { height: 0 } }
							label=""
							disabled
						/>
					</FlexItem>
				</Flex>
			) }
			{ values.map( ( value, index ) => {
				return (
					<BaseControlMediaItem
						key={ forceUpdate + '-' + index }
						value={ value }
						onChange={ onChangeMediaItem.bind( null, index ) }
						onDelete={ onDeleteMediaItem.bind( null, index ) }
						onMoveUp={ onMoveUpMediaItem.bind( null, index ) }
						onMoveDown={ onMoveDownMediaItem.bind( null, index ) }
						controlsAxis={ controlsAxis }
						disableUnits={ disableUnits }
						isAxis={ isAxis }
						isHideDelete={ values.length === 1 && lockLastElement }
						isHideMoveUp={ index === 0 }
						isHideMoveDown={ index === values.length - 1 }
						valueProp={ valueProp }
						minProp={ minProp }
						maxProp={ maxProp }
					/>
				);
			} ) }
		</BaseControl>
	);
}
