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
	__experimentalUnitControl as UnitControl,
	__experimentalHStack as HStack,
	Modal,
} from '@wordpress/components';

import OneSpacingSizesControl from './OneSpacingSizesControl';
import DropdownMenuRadio from './DropdownMenuRadio';
import { Dropdown } from '@wordpress/components';

import {
	plus,
	reset,
	mobile,
	sidesAll,
	sidesHorizontal,
	sidesVertical,
} from '@wordpress/icons';

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
	unlockLastElement,
	valueProp = {},
	minProp = {},
	maxProp = {},
} ) {
	values = values.map( ( item ) => ( { ...item } ) );
	console.log( values );

	const controlsAxis = [
		{
			slug: 'all',
			label: 'All',
		},
		{
			slug: 'horizontal',
			label: 'Horizontal',
		},
		{
			slug: 'vertical',
			label: 'Vertical',
		},
	];
	const iconsAxis = {
		all: sidesAll,
		horizontal: sidesHorizontal,
		vertical: sidesVertical,
	};
	const controlsRule = [
		{
			slug: 'delete',
			label: __( 'Delete a rule', 'autogrid' ),
			isDestructive: true,
		},
		{
			slug: 'moveUp',
			label: 'Move up',
		},
		{
			slug: 'moveDown',
			label: 'Move down',
		},
	];

	return (
		<BaseControl
			__nextHasNoMarginBottom
			help={ <span style={ { fontSize: '12px' } }>{ help }</span> }
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
					onClick={ () => {
						onChange( [
							...values,
							baseRule || {
								value: 0,
								min: '',
								max: '',
							},
						] );
					} }
				/>
			</Flex>
			{ !! values.length && (
				<Flex>
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
						{ ( values.length > 1 || unlockLastElement ) && (
							<Button
								icon={ <Dashicon icon="" /> }
								style={ { height: 0 } }
								label=""
								disabled
							/>
						) }
					</FlexItem>
				</Flex>
			) }
			{ values.map( ( value, index ) => {
				const useMediaRule = value.min !== '' || value.max !== '';
				const axis = value.axis || 'all';

				const _controlsRule =
					values.length > 1 || unlockLastElement
						? controlsRule
						: controlsRule.filter(
								( item ) => item.slug !== 'delete'
						  );

				return (
					<div key={ index }>
						<HStack className="one-spacing-sizes-control">
							<DropdownMenuRadio
								label={ __( 'Select a direction' ) }
								controls={ controlsAxis }
								selected={ axis }
								icon={ iconsAxis[ axis ] }
								onChange={ ( val ) => {
									value.axis = val;
									onChange( [ ...values ] );
								} }
							/>
							<FlexBlock>
								{ disableUnits ? (
									<FlexBlock>
										<UnitControl
											label={
												valueProp.label ||
												__( 'Value', 'autogrid' )
											}
											hideLabelFromVision
											onChange={ ( val ) => {
												value.value = parseInt( val );
												onChange( [ ...values ] );
											} }
											value={ value.value }
											min={
												valueProp.min == undefined
													? 0
													: valueProp.min
											}
											max={
												valueProp.max == undefined
													? Infinity
													: valueProp.max
											}
											units={ [] }
											unit="px"
											disableUnits={ disableUnits }
											required
										/>
									</FlexBlock>
								) : (
									<OneSpacingSizesControl
										onChange={ ( val ) => {
											value.value = val;
											// value.value = parseInt( val );
											onChange( [ ...values ] );
										} }
										value={ value.value }
									/>
								) }
							</FlexBlock>
							<Dropdown
								popoverProps={ { placement: 'bottom-end' } }
								renderToggle={ ( { isOpen, onToggle } ) => (
									<Button
										onClick={ onToggle }
										aria-expanded={ isOpen }
										icon={ mobile }
										style={ {
											opacity: useMediaRule ? 1 : 0.5,
										} }
									/>
								) }
								renderContent={ () => (
									<Flex
										align="start"
										style={ { minWidth: '140px' } }
									>
										<FlexBlock>
											<UnitControl
												label={
													minProp.label ||
													__(
														'Minimum container width',
														'autogrid'
													)
												}
												hideLabelFromVision
												help={ __( 'Min', 'autogrid' ) }
												onChange={ ( val ) => {
													val = parseInt( val );
													value.min = isNaN( val )
														? ''
														: val;
													onChange( [ ...values ] );
												} }
												value={ value.min }
												min={
													minProp.min == undefined
														? 0
														: minProp.min
												}
												max={
													minProp.max == undefined
														? Infinity
														: minProp.max
												}
												units={ [] }
												unit="px"
												disableUnits={ disableUnits }
											/>
										</FlexBlock>
										<FlexBlock>
											<UnitControl
												label={
													maxProp.label ||
													__(
														'Maximum container width',
														'autogrid'
													)
												}
												hideLabelFromVision
												help={
													maxProp.label ||
													__( 'Max', 'autogrid' )
												}
												onChange={ ( val ) => {
													val = parseInt( val );
													value.max = isNaN( val )
														? ''
														: val;
													onChange( [ ...values ] );
												} }
												value={ value.max }
												min={
													maxProp.min == undefined
														? 0
														: maxProp.min
												}
												max={
													maxProp.max == undefined
														? Infinity
														: maxProp.max
												}
												units={ [] }
												unit="px"
												disableUnits={ disableUnits }
											/>
										</FlexBlock>
									</Flex>
								) }
							/>
							<DropdownMenuRadio
								label={ __( '...' ) }
								controls={ _controlsRule }
								// selected={ axis }
								// icon={ iconsAxis[axis] }
								onChange={ ( val ) => {
									switch ( val ) {
										case 'delete':
											onChange(
												values.filter(
													( value, i ) => i != index
												)
											);
											break;

										case 'moveUp':
											break;

										case 'moveDown':
											break;
									}
								} }
							/>
							<FlexItem>
								{ ( values.length > 1 ||
									unlockLastElement ) && (
									<Button
										icon={ reset }
										label={ __(
											'Delete a rule',
											'autogrid'
										) }
										iconSize={ 24 }
										onClick={ () => {
											onChange(
												values.filter(
													( value, i ) => i != index
												)
											);
										} }
									/>
								) }
							</FlexItem>
						</HStack>

						<Flex
							key={ index }
							align="start"
							style={ { display: 'none' } }
						>
							<FlexBlock>
								<UnitControl
									label={
										valueProp.label ||
										__( 'Value', 'autogrid' )
									}
									hideLabelFromVision
									onChange={ ( val ) => {
										value.value = parseInt( val );
										onChange( [ ...values ] );
									} }
									value={ value.value }
									min={
										valueProp.min == undefined
											? 0
											: valueProp.min
									}
									max={
										valueProp.max == undefined
											? Infinity
											: valueProp.max
									}
									units={ [] }
									unit="px"
									disableUnits={ disableUnits }
									required
								/>
							</FlexBlock>
							<FlexBlock>
								<UnitControl
									label={
										minProp.label ||
										__(
											'Minimum container width',
											'autogrid'
										)
									}
									hideLabelFromVision
									onChange={ ( val ) => {
										value.min = parseInt( val );
										onChange( [ ...values ] );
									} }
									value={ value.min }
									min={
										minProp.min == undefined
											? 0
											: minProp.min
									}
									max={
										minProp.max == undefined
											? Infinity
											: minProp.max
									}
									units={ [] }
									unit="px"
									disableUnits={ disableUnits }
								/>
							</FlexBlock>
							<FlexBlock>
								<UnitControl
									label={
										maxProp.label ||
										__(
											'Maximum container width',
											'autogrid'
										)
									}
									hideLabelFromVision
									onChange={ ( val ) => {
										value.max = parseInt( val );
										onChange( [ ...values ] );
									} }
									value={ value.max }
									min={
										maxProp.min == undefined
											? 0
											: maxProp.min
									}
									max={
										maxProp.max == undefined
											? Infinity
											: maxProp.max
									}
									units={ [] }
									unit="px"
									disableUnits={ disableUnits }
								/>
							</FlexBlock>
							<FlexItem>
								{ ( values.length > 1 ||
									unlockLastElement ) && (
									<Button
										icon={ reset }
										label={ __(
											'Delete a rule',
											'autogrid'
										) }
										style={ { height: '30px' } }
										onClick={ () => {
											onChange(
												values.filter(
													( value, i ) => i != index
												)
											);
										} }
									/>
								) }
							</FlexItem>
						</Flex>
					</div>
				);
			} ) }
		</BaseControl>
	);
}
