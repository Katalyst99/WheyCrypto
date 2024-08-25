// tests/frontend/auth.test.js
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupForm from '../../frontend/src/components/SignupForm';
import * as authService from '../../frontend/src/services/authService';

jest.mock('../../frontend/src/services/authService');

describe('SignupForm', () => {
    test('successful registration', async () => {
        authService.register.mockResolvedValue({
            token: 'fakeToken',
            user: { username: 'testuser', email: 'test@example.com' }
        });

        const { getByPlaceholderText, getByText } = render(<SignupForm />);

        fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

        fireEvent.click(getByText('Register'));

        await waitFor(() => {
            expect(authService.register).toHaveBeenCalledWith({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123'
            });
        });
    });
});

