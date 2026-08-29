
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  ShieldCheck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import "./logout.css";

export default function LogoutPage() {
  const router = useRouter();

  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      /*
       * ==========================================
       * CLEAR AUTHENTICATION
       * ==========================================
       *
       * If you are using localStorage/sessionStorage,
       * remove the authentication information here.
       *
       * Example:
       *
       * localStorage.removeItem("token");
       * localStorage.removeItem("user");
       * sessionStorage.clear();
       *
       */

      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.clear();

      /*
       * Small delay so the user sees the
       * logout state.
       */
      await new Promise((resolve) =>
        setTimeout(resolve, 600)
      );

      router.replace("/login");

    } catch (error) {
      console.error(
        "Logout failed:",
        error
      );

      setLoggingOut(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="logout-page">

      <div className="logout-card">

        {/* =====================================
            ICON
        ===================================== */}

        <div className="logout-icon">

          {loggingOut ? (
            <Loader2
              size={25}
              className="logout-spinner"
            />
          ) : (
            <LogOut size={25} />
          )}

        </div>


        {/* =====================================
            CONTENT
        ===================================== */}

        <div className="logout-content">

          <div className="logout-label">
            ACCOUNT
          </div>

          <h1>
            Sign out of POS?
          </h1>

          <p>
            Are you sure you want to sign out
            of your POS administrator account?
          </p>

        </div>


        {/* =====================================
            SECURITY MESSAGE
        ===================================== */}

        <div className="logout-security">

          <div className="security-icon">
            <ShieldCheck size={14} />
          </div>

          <div>

            <strong>
              Your session will end
            </strong>

            <span>
              You will need to sign in again
              to access the admin dashboard.
            </span>

          </div>

        </div>


        {/* =====================================
            ACTIONS
        ===================================== */}

        <div className="logout-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={handleCancel}
            disabled={loggingOut}
          >
            <ArrowLeft size={13} />
            Cancel
          </button>

          <button
            type="button"
            className="logout-button"
            onClick={handleLogout}
            disabled={loggingOut}
          >

            {loggingOut ? (
              <>
                <Loader2
                  size={13}
                  className="button-spinner"
                />

                Signing out...
              </>
            ) : (
              <>
                <LogOut size={13} />

                Sign Out
              </>
            )}

          </button>

        </div>

      </div>

    </div>
  );
}

