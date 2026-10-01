"use client";

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import "./ConfirmModal.css";

export default function ConfirmModal({
  isOpen,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay">

      <div className="confirm-modal">

        {/* Close */}
        <button
          type="button"
          className="confirm-modal-close"
          onClick={onCancel}
          disabled={loading}
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="confirm-modal-icon">
          <AlertTriangle size={24} />
        </div>

        {/* Content */}
        <div className="confirm-modal-content">

          <h3>{title}</h3>

          <p>{message}</p>

        </div>

        {/* Buttons */}
        <div className="confirm-modal-actions">

          <button
            type="button"
            className="confirm-modal-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>

          <button
            type="button"
            className="confirm-modal-confirm"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Processing..." : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}