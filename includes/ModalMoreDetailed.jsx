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
import { Button, Flex, Modal } from '@wordpress/components';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function ModalMoreDetailed( { children, title } ) {
	const [ isOpen, setOpen ] = useState( false );
	const openModal = () => setOpen( true );
	const closeModal = () => setOpen( false );

	return (
		<>
			<span>
				{ ' ' }
				<Button variant="link" onClick={ openModal }>
					{ __( 'More', 'autogrid' ) }
				</Button>
			</span>
			{ isOpen && (
				<Modal title={ title } onRequestClose={ closeModal }>
					<div style={ { maxWidth: '350px' } }>{ children }</div>
					<Flex direction="row" justify="flex-end">
						<Button variant="secondary" onClick={ closeModal }>
							{ __( 'Ok', 'autogrid' ) }
						</Button>
					</Flex>
				</Modal>
			) }
		</>
	);
}
