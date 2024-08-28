import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionHistory from '../../src/components/TransactionHistory';
import { AuthProvider } from '../../src/contexts/AuthContext';
import * as transactionService from '../../src/services/transactionService';

jest.mock('../../src/services/transactionService');

const mockTransactions = [
    { transaction_id: 1, crypto_id: 'bitcoin', amount: 1.5, transaction_type: 'buy', price_at_transaction: 45000, created_at: '2023-08-27T12:00:00Z' },
    { transaction_id: 2, crypto_id: 'ethereum', amount: 3, transaction_type: 'sell', price_at_transaction: 3000, created_at: '2023-08-28T15:30:00Z' },
];

describe('TransactionHistory Component', () => {
    beforeEach(() => {
        transactionService.getTransactions.mockResolvedValue(mockTransactions);
    });

    test('renders transaction history', async () => {
        render(
            <AuthProvider>
                <TransactionHistory />
            </AuthProvider>
        );
        const items = await screen.findAllByText(/bitcoin/i);
        expect(items.length).toBe(1);
    });

    test('allows adding a new transaction', async () => {
        transactionService.addTransaction.mockResolvedValue({ message: 'Transaction created successfully' });
        render(
            <AuthProvider>
                <TransactionHistory />
            </AuthProvider>
        );
        fireEvent.change(screen.getByPlaceholderText('Crypto ID'), { target: { value: 'dogecoin' } });
        fireEvent.change(screen.getByPlaceholderText('Amount'), { target: { value: '10' } });
        fireEvent.change(screen.getByPlaceholderText('Price at Transaction'), { target: { value: '0.50' } });
        fireEvent.click(screen.getByText(/Add Transaction/i));
        expect(transactionService.addTransaction).toHaveBeenCalledTimes(1);
    });

    test('allows updating a transaction', async () => {
        transactionService.updateTransaction.mockResolvedValue({ message: 'Transaction updated successfully' });
        render(
            <AuthProvider>
                <TransactionHistory />
            </AuthProvider>
        );
        fireEvent.click(await screen.findByText(/Update/i));
        expect(transactionService.updateTransaction).toHaveBeenCalledTimes(1);
    });

    test('allows deleting a transaction', async () => {
        transactionService.deleteTransaction.mockResolvedValue({ message: 'Transaction deleted successfully' });
        render(
            <AuthProvider>
                <TransactionHistory />
            </AuthProvider>
        );
        fireEvent.click(await screen.findByText(/Delete/i));
        expect(transactionService.deleteTransaction).toHaveBeenCalledTimes(1);
    });
});
