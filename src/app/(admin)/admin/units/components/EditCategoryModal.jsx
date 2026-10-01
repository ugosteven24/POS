
"use client";

import { X, FolderTree } from "lucide-react";
import "./editModel.css";

export default function EditCategoryModal({
  category,
  onClose,
  onSave,

  editName,
  setEditName,

  editShortName,
  setEditShortName,

  // editabbreviation,
  // setEditAbbreviation,

  editDescription,
  setEditDescription,

  title,


  editStatus,
  setEditStatus,

  saving,
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
                Edit {title}
              </h2>

              <p className="edit-modal-subtitle">
                Edit {editName} information
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

            <input
              type="text"
              value={editName}
              onChange={(e) =>
                setEditName(e.target.value)
              }
              className="edit-form-input"
              placeholder="Enter category name"
            />

          </div>

          {/* CATEGORY SHORTNAME */}

          <div className="edit-form-group">

            <label className="edit-form-label">
              {title} short name
            </label>

            <input
              type="text"
              value={editShortName}
              onChange={(e) =>
                setEditShortName(e.target.value)
              }
              className="edit-form-input"
              placeholder="Enter category name"
            />

          </div>


           {/* CATEGORY Abbreviation */}

          {/* <div className="edit-form-group">

            <label className="edit-form-label">
              {title} Abbreviation
            </label>

            <input
              type="text"
              value={editabbreviation}
              onChange={(e) =>
                setEditAbbreviation(e.target.value)
              }
              className="edit-form-input"
              placeholder="Enter unit name"
            />

          </div> */}


          {/* DESCRIPTION */}

          <div className="edit-form-group">

            <label className="edit-form-label">
              Description
            </label>

            <textarea
              value={editDescription}
              onChange={(e) =>
                setEditDescription(e.target.value)
              }
              rows={4}
              className="edit-form-textarea"
              placeholder="Enter category description"
            />

          </div>


          {/* STATUS */}

          <div className="edit-form-group">

            <label className="edit-form-label">
              Status
            </label>

            <select
              value={editStatus}
              onChange={(e) =>
                setEditStatus(e.target.value)
              }
              className="edit-form-select"
            >

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>

            </select>

          </div>

        </div>


        {/* FOOTER */}

        <div className="edit-modal-footer">

          <button
            type="button"
            onClick={onClose}
            className="edit-modal-cancel"
            disabled={saving}
          >
            Cancel
          </button>


          <button
            type="button"
            className="edit-modal-save"
            onClick={onSave}
            disabled={saving}
          >

            {saving
              ? "Saving..."
              : "Save Changes"}

          </button>

        </div>

      </div>

    </div>

  );
}

