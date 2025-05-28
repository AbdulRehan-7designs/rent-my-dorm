
export interface EscrowTransaction {
  id: string;
  rentalId: string;
  renterId: string;
  vendorId: string;
  totalAmount: number;
  commissionFee: number;
  vendorAmount: number;
  status: 'pending' | 'held' | 'released' | 'refunded';
  createdAt: Date;
  completedAt?: Date;
  refundedAt?: Date;
}

export interface EscrowManager {
  createEscrow: (transaction: Omit<EscrowTransaction, 'id' | 'createdAt' | 'status'>) => EscrowTransaction;
  holdFunds: (transactionId: string) => boolean;
  releaseFunds: (transactionId: string) => boolean;
  refundFunds: (transactionId: string) => boolean;
  getTransactionStatus: (transactionId: string) => EscrowTransaction | null;
}

class EscrowService implements EscrowManager {
  private transactions: Map<string, EscrowTransaction> = new Map();

  createEscrow(transaction: Omit<EscrowTransaction, 'id' | 'createdAt' | 'status'>): EscrowTransaction {
    const escrowTransaction: EscrowTransaction = {
      ...transaction,
      id: `escrow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      status: 'pending',
      createdAt: new Date()
    };

    this.transactions.set(escrowTransaction.id, escrowTransaction);
    console.log(`Escrow created: ${escrowTransaction.id} for amount ${escrowTransaction.totalAmount}`);
    
    return escrowTransaction;
  }

  holdFunds(transactionId: string): boolean {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || transaction.status !== 'pending') {
      return false;
    }

    transaction.status = 'held';
    this.transactions.set(transactionId, transaction);
    console.log(`Funds held in escrow: ${transactionId}`);
    
    return true;
  }

  releaseFunds(transactionId: string): boolean {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || transaction.status !== 'held') {
      return false;
    }

    transaction.status = 'released';
    transaction.completedAt = new Date();
    this.transactions.set(transactionId, transaction);
    
    console.log(`Funds released: ${transactionId}`);
    console.log(`Vendor receives: ₹${transaction.vendorAmount}`);
    console.log(`Platform commission: ₹${transaction.commissionFee}`);
    
    return true;
  }

  refundFunds(transactionId: string): boolean {
    const transaction = this.transactions.get(transactionId);
    if (!transaction || (transaction.status !== 'held' && transaction.status !== 'pending')) {
      return false;
    }

    transaction.status = 'refunded';
    transaction.refundedAt = new Date();
    this.transactions.set(transactionId, transaction);
    
    console.log(`Funds refunded: ${transactionId}`);
    
    return true;
  }

  getTransactionStatus(transactionId: string): EscrowTransaction | null {
    return this.transactions.get(transactionId) || null;
  }

  getAllTransactions(): EscrowTransaction[] {
    return Array.from(this.transactions.values());
  }
}

export const escrowService = new EscrowService();
