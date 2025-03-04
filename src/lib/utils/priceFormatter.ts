const numberFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
})

export const priceFormatter = (price: number, quantity: number): string => {
  const totalPrice = numberFormatter.format(price * quantity)
  return totalPrice
}
