
export interface FeeCalculation {
  rentalAmount: number;
  commissionRate: number;
  commissionFee: number;
  vendorAmount: number;
  isLoyaltyDiscount: boolean;
  feeBreakdown: {
    baseCommission: number;
    loyaltyDiscount?: number;
    minimumFeeApplied: boolean;
    maximumFeeCapped: boolean;
  };
}

export interface UserRentalHistory {
  completedRentals: number;
  totalTransactions: number;
  trustScore: number;
}

export const calculateTransactionFee = (
  rentalAmount: number,
  userHistory?: UserRentalHistory
): FeeCalculation => {
  // Determine commission rate based on loyalty
  const isLoyaltyUser = userHistory && userHistory.completedRentals > 10;
  const baseRate = isLoyaltyUser ? 0.03 : 0.05; // 3% for loyal users, 5% for others
  
  // Calculate base commission
  let commissionFee = rentalAmount * baseRate;
  const baseCommission = commissionFee;
  
  // Apply minimum fee rule
  const minimumFeeApplied = commissionFee < 10;
  if (minimumFeeApplied) {
    commissionFee = 10;
  }
  
  // Apply maximum fee cap
  const maximumFeeCapped = commissionFee > 100;
  if (maximumFeeCapped) {
    commissionFee = 100;
  }
  
  // Calculate vendor amount (rental amount minus commission)
  const vendorAmount = rentalAmount - commissionFee;
  
  // Calculate loyalty discount amount if applicable
  const loyaltyDiscount = isLoyaltyUser ? (rentalAmount * 0.05) - (rentalAmount * 0.03) : undefined;
  
  return {
    rentalAmount,
    commissionRate: baseRate,
    commissionFee,
    vendorAmount,
    isLoyaltyDiscount: !!isLoyaltyUser,
    feeBreakdown: {
      baseCommission,
      loyaltyDiscount,
      minimumFeeApplied,
      maximumFeeCapped
    }
  };
};

export const formatCurrency = (amount: number): string => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const validateTransactionAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 1000000; // Max 10 lakh
};
