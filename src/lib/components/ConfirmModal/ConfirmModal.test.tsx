import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmModal from './ConfirmModal'
import { BUTTON } from '../../constants'

describe('ConfirmModal', () => {
  const header = 'Confirm Action'
  const message = 'Are you sure you want to proceed?'
  const onConfirm = jest.fn()
  const onCancel = jest.fn()

  beforeEach(() => {
    render(
      <ConfirmModal
        header={header}
        message={message}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
    )
  })

  test('renders correctly', () => {
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  test('displays the correct header and message', () => {
    expect(screen.getByText(header)).toBeInTheDocument()
    expect(screen.getByText(message)).toBeInTheDocument()
  })

  test('calls onConfirm when Confirm button is clicked', () => {
    fireEvent.click(screen.getByText(BUTTON.CONFIRM_BUTTON))
    expect(onConfirm).toHaveBeenCalledTimes(1)
  })

  test('calls onCancel when Cancel button is clicked', () => {
    fireEvent.click(screen.getByText(BUTTON.CANCEL_BUTTON))
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  test('focus is managed correctly between buttons', () => {
    const confirmButton = screen.getByText(BUTTON.CONFIRM_BUTTON)
    const cancelButton = screen.getByText(BUTTON.CANCEL_BUTTON)

    confirmButton.focus()
    expect(confirmButton).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true })
    expect(cancelButton).toHaveFocus()

    fireEvent.keyDown(document, { key: 'Tab' })
    expect(confirmButton).toHaveFocus()
  })
})
