import React, { useState } from 'react';
import { ArrowLeft, Lock, CreditCard, ShieldCheck, CheckCircle, Smartphone } from 'lucide-react';

interface PaymentPageProps {
  totalAmount: number;
  passengerName: string;
  onPaymentSuccess: (paymentMethod: string) => void;
  onBackToReview: () => void;
}

export const PaymentPage: React.FC<PaymentPageProps> = ({
  totalAmount,
  passengerName,
  onPaymentSuccess,
  onBackToReview,
}) => {
  const [method, setMethod] = useState<'card' | 'apple' | 'paypal'>('card');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvc, setCardCvc] = useState('321');
  const [cardHolder, setCardHolder] = useState(passengerName || 'J. Smith');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate swift secure transaction
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess(
        method === 'card' ? 'Visa •••• 8892' : method === 'apple' ? 'Apple Pay' : 'PayPal'
      );
    }, 900);
  };

  return (
    <div className="flex-1 w-full max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6 pb-4 border-b border-[#e6e9eb]">
        <button
          type="button"
          onClick={onBackToReview}
          className="flex items-center gap-1.5 text-xs font-bold text-[#0062e3] hover:underline mb-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Review
        </button>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-[#161616] tracking-tight">
            Secure Payment
          </h2>
          <div className="flex items-center gap-1 text-xs font-bold text-[#118850] bg-[#ebfff0] px-3 py-1 rounded-full border border-[#87D0D4]">
            <Lock className="w-3.5 h-3.5" />
            <span>256-bit Encrypted</span>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-[#6e747e] font-medium mt-1">
          Complete your transaction to finalize your flight ticket reservation.
        </p>
      </div>

      <div className="bg-white border border-[#e6e9eb] rounded-2xl p-5 sm:p-7 shadow-xs">
        {/* Method selection tabs */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <button
            type="button"
            onClick={() => setMethod('card')}
            className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              method === 'card'
                ? 'border-[#0062e3] bg-[#e3f0ff]/30 text-[#0062e3]'
                : 'border-[#e6e9eb] text-[#6e747e] hover:border-[#b2d5ff]'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            <span className="text-xs font-bold">Credit/Debit Card</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('apple')}
            className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              method === 'apple'
                ? 'border-[#0062e3] bg-[#e3f0ff]/30 text-[#0062e3]'
                : 'border-[#e6e9eb] text-[#6e747e] hover:border-[#b2d5ff]'
            }`}
          >
            <Smartphone className="w-5 h-5" />
            <span className="text-xs font-bold">Apple Pay / GPay</span>
          </button>

          <button
            type="button"
            onClick={() => setMethod('paypal')}
            className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${
              method === 'paypal'
                ? 'border-[#0062e3] bg-[#e3f0ff]/30 text-[#0062e3]'
                : 'border-[#e6e9eb] text-[#6e747e] hover:border-[#b2d5ff]'
            }`}
          >
            <span className="font-black text-sm italic">PayPal</span>
            <span className="text-xs font-bold">PayPal Checkout</span>
          </button>
        </div>

        {/* Card details form */}
        <form onSubmit={handlePay} className="space-y-4">
          {method === 'card' && (
            <>
              <div>
                <label className="block text-xs font-bold text-[#161616] mb-1">
                  Cardholder Full Name
                </label>
                <input
                  type="text"
                  required
                  value={cardHolder}
                  onChange={(e) => setCardHolder(e.target.value)}
                  className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
                  placeholder="e.g. John Smith"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#161616] mb-1">
                  Card Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3] pr-12"
                    placeholder="4532 0000 0000 0000"
                  />
                  <span className="absolute right-3 top-3 text-[10px] font-black text-white bg-[#075aaa] px-1.5 py-0.5 rounded">
                    VISA
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#161616] mb-1">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    required
                    value={cardExpiry}
                    onChange={(e) => setCardExpiry(e.target.value)}
                    className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
                    placeholder="MM/YY"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#161616] mb-1">
                    Security Code (CVV)
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={cardCvc}
                    onChange={(e) => setCardCvc(e.target.value)}
                    className="w-full p-2.5 border border-[#e6e9eb] rounded-xl text-sm font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-[#0062e3]"
                    placeholder="123"
                  />
                </div>
              </div>
            </>
          )}

          {method === 'apple' && (
            <div className="p-6 bg-[#f9f9fa] rounded-xl text-center space-y-2 border border-[#e6e9eb]">
              <Smartphone className="w-8 h-8 text-[#161616] mx-auto" />
              <h4 className="text-sm font-bold text-[#161616]">Instant One-Touch Payment</h4>
              <p className="text-xs text-[#6e747e]">
                Authorize payment with FaceID / TouchID or Passcode on your device.
              </p>
            </div>
          )}

          {method === 'paypal' && (
            <div className="p-6 bg-[#f9f9fa] rounded-xl text-center space-y-2 border border-[#e6e9eb]">
              <span className="text-xl font-black italic text-[#003087]">PayPal</span>
              <p className="text-xs text-[#6e747e]">
                You will be redirected securely to PayPal to approve the £{totalAmount} payment.
              </p>
            </div>
          )}

          {/* Price & Submit Action */}
          <div className="pt-4 border-t border-[#f2f4f5] mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <span className="text-xs text-[#6e747e] block">Total Amount to Pay</span>
              <span className="text-2xl sm:text-3xl font-black text-[#0062e3]">
                £{totalAmount}
              </span>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full sm:w-auto min-w-[240px] bg-[#0062e3] hover:bg-[#004ebd] active:bg-[#003b8e] disabled:opacity-50 text-white font-extrabold text-base py-3.5 px-8 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <span>Securing Reservation...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay £{totalAmount} & Confirm</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-[#9298a0]">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0fa1a9]" />
            Official Airline Guaranteed
          </span>
          <span>•</span>
          <span>PCI-DSS Level 1 Compliant</span>
        </div>
      </div>
    </div>
  );
};
