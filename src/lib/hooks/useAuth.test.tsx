import { render, act } from '@testing-library/react';
import { AuthProvider } from '../../contexts/AuthContext/AuthContext';
import useAuth from './useAuth';

const TestComponent = () => {
    const { isAuthenticated, login, logout } = useAuth();

    return (
        <div>
            <div>{isAuthenticated ? `Logged in` : 'No user'}</div>
            <button onClick={() => login({ email: 'test@test.com', password: 'pass123' })}>Login</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

describe('useAuth Hook', () => {

    test('returns context values correctly within AuthProvider', () => {
        const { getByText, getByRole } = render(
            <AuthProvider>
                <TestComponent />
            </AuthProvider>
        );

        expect(getByText('No user')).toBeInTheDocument();
        act(() => {
            getByRole('button', { name: /login/i }).click();
        });

        expect(getByText('Logged in')).toBeInTheDocument();
        act(() => {
            getByRole('button', { name: /logout/i }).click();
        });
        expect(getByText('No user')).toBeInTheDocument();
    });
});
