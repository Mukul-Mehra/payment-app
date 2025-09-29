import { useState } from "react";
import { useSearchParams } from "react-router-dom";
type SendMoneyModalProps = {
  user: { _id: string; firstName: string; lastName: string };
  onClose: () => void;
};


export default function SendMoneyModal({user,onClose}  : SendMoneyModalProps) {
  const [searchParams] = useSearchParams();
  const firstName = searchParams.get("firstName") || "User";
  const lastName = searchParams.get("lastName") || "";

  const [amount, setAmount] = useState("");
  

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`₹${amount} sent to ${firstName} ${lastName}`);
    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50">
      {/* Overlay (click to close) */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      <form
        onSubmit={handleSend}
        onClick={(e) => e.stopPropagation()} // prevent overlay close
        className="relative bg-neutral-900 text-white rounded-xl shadow-xl p-6 w-full max-w-sm space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Send Money</h2>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            {firstName[0].toUpperCase()}
          </div>
          <span className="font-medium">
            {firstName} {lastName}
          </span>
        </div>

        <div>
          <label className="block text-sm text-gray-300 mb-1">Amount (₹)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-gray-700 bg-neutral-800 p-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium"
        >
          Initiate Transfer
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-gray-300 text-sm"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
