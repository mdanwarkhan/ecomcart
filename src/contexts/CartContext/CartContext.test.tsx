import { render, screen, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import { CartProvider, CartContext } from './CartContext'
import { Product } from '../../lib/types/Product'
import { Item } from '../../lib/types/Cart'

jest.mock('../../lib/services/cartService')
jest.mock('@tanstack/react-query', () => ({
    ...jest.requireActual('@tanstack/react-query'),
    useQuery: jest.fn(),
}))

const queryClient = new QueryClient()

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    )
}

describe('CartContext', () => {
    const mockCart: Item[] = [{ productId: 1, quantity: 2 }]
    const mockProducts: Product[] = [{ id: 1, title: 'Product 1', image: 'p1.png', price: 100, quantity: 2 }]

    beforeEach(() => {
        (useQuery as jest.Mock).mockImplementation(({ queryKey }) => {
            if (queryKey[0] === 'cart') {
                return { data: mockCart }
            }
            if (queryKey[0] === 'products') {
                return { data: mockProducts }
            }
            return { data: [] }
        })
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    test('provides cart data after fetching', async () => {
        renderWithProviders(
            <CartProvider>
                <CartContext.Consumer>
                    {(value) => (
                        <div>
                            {value?.cart.map((product) => (
                                <div key={product.id}>{product.title}</div>
                            ))}
                        </div>
                    )}
                </CartContext.Consumer>
            </CartProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument()
        })
    })

    test('removes item from cart', async () => {
        renderWithProviders(
            <CartProvider>
                <CartContext.Consumer>
                    {(value) => (
                        <div>
                            <button onClick={() => value?.removeFromCart(1)}>Remove</button>
                            {value?.cart.map((product) => (
                                <div key={product.id}>{product.title}</div>
                            ))}
                        </div>
                    )}
                </CartContext.Consumer>
            </CartProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument()
        })

        screen.getByText('Remove').click()

        await waitFor(() => {
            expect(screen.queryByText('Product 1')).not.toBeInTheDocument()
        })
    })

    test('updates product quantity in cart', async () => {
        renderWithProviders(
            <CartProvider>
                <CartContext.Consumer>
                    {(value) => (
                        <div>
                            <button onClick={() => value?.updateProductQuantity(1, 1)}>Increase</button>
                            {value?.cart.map((product) => (
                                <div key={product.id}>{product.title} - {product.quantity}</div>
                            ))}
                        </div>
                    )}
                </CartContext.Consumer>
            </CartProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Product 1 - 2')).toBeInTheDocument()
        })

        screen.getByText('Increase').click()

        await waitFor(() => {
            expect(screen.getByText('Product 1 - 3')).toBeInTheDocument()
        })
    })

    test('calculates total price of the cart', async () => {
        renderWithProviders(
            <CartProvider>
                <CartContext.Consumer>
                    {(value) => (
                        <div>
                            <div>Total Price: {value?.getTotalPrice()}</div>
                        </div>
                    )}
                </CartContext.Consumer>
            </CartProvider>
        )

        await waitFor(() => {
            expect(screen.getByText('Total Price: 200')).toBeInTheDocument()
        })
    })
})