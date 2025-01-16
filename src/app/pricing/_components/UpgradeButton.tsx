"use client"

import { useState } from "react"; // To handle loading state
import { upgradeToPro } from "../../../../convex/users"; // Import the mutation function
import { Zap } from "lucide-react"; // Icon component

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpgrade = async () => {
    setLoading(true);
    setError(null); // Reset any previous errors

    try {
      const userId = "user_id_here"; // Retrieve the user ID from session or context
       // @ts-expect-error: 'setValue' is not recognized due to missing type definition in 'monaco-editor'
      const result = await upgradeToPro({ userId });

      if (result.success) {
        // Handle success, e.g., show a success message or redirect
        console.log("User upgraded to Pro successfully");
      }
    } catch (err) {
      setError("Upgrade failed. Please try again.");
      console.error("Upgrade failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
    >
      <Zap className="w-5 h-5" />
      {loading ? "Upgrading..." : "Upgrade to Pro"}
    </button>
  );
}
