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
	Button,
	Dashicon,
	Flex,
	FlexBlock,
	FlexItem,
	BaseControl,
	__experimentalUnitControl as UnitControl,
	Modal,
} from '@wordpress/components';

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
	return (
		<BaseControl
			__nextHasNoMarginBottom
			help={ <span style={ { fontSize: '12px' } }>{ help }</span> }
		>
			<Flex>
				<FlexBlock>
					<BaseControl.VisualLabel>{ label }</BaseControl.VisualLabel>
				</FlexBlock>
				<FlexItem>
					<Button
						icon={ <Dashicon icon="plus-alt2" /> }
						label={ __( 'Add a rule', 'autogrid-block' ) }
						onClick={ () => {
							onChange( [
								...values,
								baseRule || {
									value: 0,
									min: '',
									max: '',
									dddd: 1,
								},
							] );
						} }
					/>
				</FlexItem>
			</Flex>
			{ !! values.length && (
				<Flex>
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Value', 'autogrid-block' ) }
						</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Min', 'autogrid-block' ) }
						</BaseControl.VisualLabel>
					</FlexBlock>
					<FlexBlock>
						<BaseControl.VisualLabel>
							{ __( 'Max', 'autogrid-block' ) }
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
				return (
					<Flex key={ index }>
						<FlexBlock>
							<UnitControl
								label={
									valueProp.label ||
									__( 'Value', 'autogrid-block' )
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
										'autogrid-block'
									)
								}
								hideLabelFromVision
								onChange={ ( val ) => {
									value.min = parseInt( val );
									onChange( [ ...values ] );
								} }
								value={ value.min }
								min={
									minProp.min == undefined ? 0 : minProp.min
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
										'autogrid-block'
									)
								}
								hideLabelFromVision
								onChange={ ( val ) => {
									value.max = parseInt( val );
									onChange( [ ...values ] );
								} }
								value={ value.max }
								min={
									maxProp.min == undefined ? 0 : maxProp.min
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
							{ ( values.length > 1 || unlockLastElement ) && (
								<Button
									icon={ <Dashicon icon="minus" /> }
									label={ __(
										'Delete a rule',
										'autogrid-block'
									) }
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
				);
			} ) }
		</BaseControl>
	);
}
