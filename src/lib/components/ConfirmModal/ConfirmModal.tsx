import React, { useEffect } from 'react'
import {
  ModalOverlay,
  ModalContainer,
  ModalMessage,
  ModalButtonContainer,
} from './ConfirmModal.style'
import { BUTTON } from '../../constants'
import { Button } from '../../styles/Button.style'

interface ConfirmModalProps {
  header: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  header,
  message,
  onConfirm,
  onCancel,
}) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const lastButtonRef = React.useRef<HTMLButtonElement>(null)

  useEffect(() => {
    buttonRef.current?.focus()

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (document.activeElement === lastButtonRef.current && !e.shiftKey) {
          e.preventDefault()
          buttonRef.current?.focus()
        } else if (document.activeElement === buttonRef.current && e.shiftKey) {
          e.preventDefault()
          lastButtonRef.current?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return (
    <ModalOverlay>
      <ModalContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal"
      >
        <h3>{header}</h3>
        <ModalMessage>{message}</ModalMessage>
        <ModalButtonContainer>
          <Button ref={buttonRef} type="danger" onClick={onConfirm}>
            {BUTTON.CONFIRM_BUTTON}
          </Button>
          <Button ref={lastButtonRef} type="outline" onClick={onCancel}>
            {BUTTON.CANCEL_BUTTON}
          </Button>
        </ModalButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  )
}

export default ConfirmModal
