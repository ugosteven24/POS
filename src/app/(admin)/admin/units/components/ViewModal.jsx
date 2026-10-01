
"use client";

import { X, FolderTree } from "lucide-react";
import "./viewModel.css";

export default function ViewCategoryModal({
    category,
    title,
    onClose,
}) {
    if (!category) return null;

    return (
        <div className="edit-modal-overlay">

            <div className="edit-modal">

                {/* HEADER */}

                <div className="edit-modal-header">

                    <div className="edit-modal-title-wrapper">

                        <div className="edit-modal-icon">
                            <FolderTree size={20} />
                        </div>

                        <div>

                            <h2 className="edit-modal-title">
                                View {title}
                            </h2>

                            <p className="edit-modal-subtitle">
                                {title} information
                            </p>

                        </div>

                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="edit-modal-close"
                    >
                        <X size={20} />
                    </button>

                </div>


                {/* BODY */}

                <div className="edit-modal-body">

                    {/* CATEGORY NAME */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            {title} Name
                        </label>

                        <div className="view-category-value">
                            {category.name || "No category name"}
                        </div>

                    </div>


                    {/* Short_NAME */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            Short name
                        </label>

                        <div className="view-category-value">
                            {category.short_name || "No category name"}
                        </div>

                    </div>
                    {/* Abbreviation */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            Abbreviattion
                        </label>

                        <div className="view-category-value">
                            {category.abbreviation || "No category name"}
                        </div>

                    </div>
                    {/* DESCRIPTION */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            Description
                        </label>

                        <div className="view-category-description">
                            {category.description || "No description"}
                        </div>

                    </div>


                    {/* STATUS */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            Status
                        </label>

                        <div
                            className={`view-category-status ${category.status?.toLowerCase() === "active"
                                ? "active"
                                : "inactive"
                                }`}
                        >
                            {category.status || "Unknown"}
                        </div>

                    </div>


                    {/* CREATED */}

                    <div className="edit-form-group">

                        <label className="edit-form-label">
                            Created
                        </label>

                        <div className="view-category-value">
                            {category.created_at
                                ? new Date(category.created_at).toLocaleDateString()
                                : "Unknown"}
                        </div>

                    </div>

                </div>


                {/* FOOTER */}

                <div className="edit-modal-footer">

                    <button
                        type="button"
                        onClick={onClose}
                        className="edit-modal-cancel"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    );
}

