import React from "react";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js";

const Payment = () => {
  const location = useLocation();

  const totalAmount = location?.state?.totalAmount || 0;
  const transaction_uuid = location?.state?.newOrderId;
  const product_code = "EPAYTEST";
  const secretKey = "8gBm/:&EnhH.1/q";

  const Message = `total_amount=${totalAmount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hash = CryptoJS.HmacSHA256(Message, secretKey);
  const signature = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md space-y-5"
      >
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-green-600">
            eSewa Payment 💳
          </h1>
          <p className="text-gray-500 text-sm">
            Complete your secure payment
          </p>
        </div>

        {/* Payment Summary */}
        <div className="bg-gray-50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Total Amount</span>
            <span className="font-semibold">Rs. {totalAmount}</span>
          </div>

          <div className="flex justify-between text-sm">
            <span>Transaction ID</span>
            <span className="font-medium text-gray-600 truncate">
              {transaction_uuid}
            </span>
          </div>
        </div>

        {/* Hidden Fields (IMPORTANT) */}
        <input type="hidden" name="amount" value={totalAmount} />
        <input type="hidden" name="tax_amount" value={0} />
        <input type="hidden" name="total_amount" value={totalAmount} />
        <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
        <input type="hidden" name="product_code" value={product_code} />
        <input type="hidden" name="product_service_charge" value={0} />
        <input type="hidden" name="product_delivery_charge" value={0} />
        <input
          type="hidden"
          name="success_url"
          value="http://localhost:9000/api/orders/success"
        />
        <input
          type="hidden"
          name="failure_url"
          value="http://localhost:9000/api/orders/failure"
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={signature} />

        {/* Pay Button */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-600 active:scale-95 transition"
        >
          Pay with eSewa
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-400 text-center">
          You will be redirected to eSewa secure gateway
        </p>
      </form>
    </div>
  );
};

export default Payment;
