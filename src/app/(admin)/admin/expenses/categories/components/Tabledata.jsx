"use client";

import { useEffect, useState } from "react";

import {
    Plus,
    Search,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    X,
    Receipt,
    FolderOpen,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import {
    fetchExpenseCategories,
    createExpenseCategory,
    deleteExpenseCategory,
    updateExpenseCategory

} from "@/services/expenses/expenseService";
import "./modal.css"

// ======================================================
// CURRENCY
// ======================================================

const formatCurrency = (value) => {
    return `₦${Number(value || 0).toLocaleString("en-NG")}`;
};


// ======================================================
// PAGE
// ======================================================

export default function Tabledata() {

    const [categories, setCategories] = useState([]);

    const [search, setSearch] = useState("");

    const [status, setStatus] = useState("All");

    const [openMenu, setOpenMenu] = useState(null);

    const [showModal, setShowModal] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [categoryToDelete, setCategoryToDelete] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    const [totalExpenses, setTotalExpenses] = useState(0);

    const [loading, setLoading] = useState(false);

    const ITEMS_PER_PAGE = 6;

    const [showViewModal, setShowViewModal] = useState(false);

    const [viewingCategory, setViewingCategory] = useState(null);
    // ======================================================
    // LOAD DATA
    // ======================================================

    const loadExpenseCategories = async () => {

        try {

            setLoading(true);

            const result = await fetchExpenseCategories({
                page: currentPage,
                limit: ITEMS_PER_PAGE,
                search,
                status,
            });

            if (result.success) {

                setCategories(result.data || []);

                setTotalExpenses(
                    result.pagination?.total || 0
                );

                setTotalPages(
                    result.pagination?.totalPages || 0
                );

            } else {

                setCategories([]);

                setTotalExpenses(0);

                setTotalPages(0);

            }

        } catch (error) {

            console.error(
                "Load expense categories error:",
                error
            );

            setCategories([]);

            setTotalExpenses(0);

            setTotalPages(0);

        } finally {

            setLoading(false);

        }
    };


    // ======================================================
    // LOAD WHEN PAGE / SEARCH / STATUS CHANGES
    // ======================================================

    useEffect(() => {

        loadExpenseCategories();

    }, [
        currentPage,
        search,
        status,
    ]);


    // ======================================================
    // SEARCH
    // ======================================================

    const handleSearch = (value) => {

        setSearch(value);

        setCurrentPage(1);

    };


    // ======================================================
    // STATUS
    // ======================================================

    const handleStatusChange = (value) => {

        setStatus(value);

        setCurrentPage(1);

    };


    // ======================================================
    // OPEN ADD
    // ======================================================

    const handleAdd = () => {

        setEditingCategory(null);

        setShowModal(true);

    };


    // ======================================================
    // OPEN EDIT
    // ======================================================

    const handleEdit = (category) => {

        setEditingCategory(category);

        setOpenMenu(null);

        setShowModal(true);

    };


    // ======================================================
    // DELETE
    // ======================================================

    const handleDelete = async () => {

        if (!categoryToDelete) return;

        try {

            const result = await deleteExpenseCategory(
                categoryToDelete.id
            );

            if (!result.success) {

                console.error(result.message);

                return;

            }

            setShowDeleteModal(false);

            setCategoryToDelete(null);

            setOpenMenu(null);

            await loadExpenseCategories();

        } catch (error) {

            console.error(
                "Delete category error:",
                error
            );

        }

    };


    // ======================================================
    // SAVE
    // ======================================================

    const handleSave = async (formData) => {
        try {
            let result;

            if (editingCategory) {

                // UPDATE
                result = await updateExpenseCategory({
                    id: editingCategory.id,
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                });

            } else {

                // CREATE
                result = await createExpenseCategory({
                    name: formData.name,
                    description: formData.description,
                    status: formData.status,
                });

            }

            if (!result.success) {
                console.error(result.message);
                return;
            }

            setShowModal(false);
            setEditingCategory(null);

            await loadExpenseCategories();

        } catch (error) {

            console.error(
                "Save expense category error:",
                error
            );

        }
    };


    const handleView = (category) => {
        setViewingCategory(category);
        setOpenMenu(null);
        setShowViewModal(true);
    };

    // ======================================================
    // PAGINATION
    // ======================================================

    const handlePreviousPage = () => {

        if (currentPage > 1) {

            setCurrentPage((page) => page - 1);

        }

    };


    const handleNextPage = () => {

        if (currentPage < totalPages) {

            setCurrentPage((page) => page + 1);

        }

    };


    // ======================================================
    // RETURN
    // ======================================================

    return (
        <>
            <div className="expense-categories-header">

                <div className="expense-categories-title">





                </div>


                <button
                    className="add-expense-category-btn"
                    onClick={handleAdd}
                >
                    <Plus size={15} />

                    Add Category
                </button>

            </div>
            {/* ==================================================
                TABLE CARD
            ================================================== */}

            <div className="expense-categories-table-card">


                {/* ==================================================
                    TOOLBAR
                ================================================== */}

                <div className="expense-categories-toolbar">

                    <div className="expense-toolbar-left">


                        {/* SEARCH */}

                        <div className="expense-category-search">

                            <Search size={14} />

                            <input
                                type="text"
                                placeholder="Search categories..."
                                value={search}
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                            />

                            {search && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleSearch("")
                                    }
                                >
                                    <X size={13} />
                                </button>

                            )}

                        </div>


                        {/* STATUS */}

                        <div className="expense-status-filter">

                            <select
                                value={status}
                                onChange={(e) =>
                                    handleStatusChange(
                                        e.target.value
                                    )
                                }
                            >

                                <option value="All">
                                    All Status
                                </option>

                                <option value="Active">
                                    Active
                                </option>

                                <option value="Inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    {/* RESULT COUNT */}

                    <div className="expense-result-count">

                        Showing{" "}

                        <strong>
                            {totalExpenses}
                        </strong>

                        {" "}categories

                    </div>

                </div>


                {/* ==================================================
                    TABLE
                ================================================== */}

                <div className="expense-categories-table-wrapper">

                    <table className="expense-categories-table">

                        <thead>

                            <tr>

                                <th>
                                    CATEGORY
                                </th>

                                <th>
                                    DESCRIPTION
                                </th>

                                <th>
                                    EXPENSES
                                </th>

                                <th>
                                    TOTAL AMOUNT
                                </th>

                                <th>
                                    STATUS
                                </th>

                                <th>
                                    CREATED
                                </th>

                                <th>
                                    ACTIONS
                                </th>

                            </tr>

                        </thead>


                        <tbody>


                            {/* LOADING */}

                            {loading ? (

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="expense-empty-table"
                                    >

                                        Loading categories...

                                    </td>

                                </tr>

                            ) : categories.length === 0 ? (

                                /* EMPTY */

                                <tr>

                                    <td
                                        colSpan="7"
                                        className="expense-empty-table"
                                    >

                                        <div className="expense-empty-icon">

                                            <FolderOpen size={22} />

                                        </div>

                                        <strong>
                                            No expense categories found
                                        </strong>

                                        <span>
                                            Try changing your search
                                            or filter.
                                        </span>

                                    </td>

                                </tr>

                            ) : (

                                /* DATA */

                                categories.map((category) => (

                                    <tr key={category.id}>


                                        {/* CATEGORY */}

                                        <td>

                                            <div className="expense-category-profile">

                                                <div className="expense-category-avatar">

                                                    <Receipt size={14} />

                                                </div>

                                                <div>

                                                    <strong>
                                                        {category.name}
                                                    </strong>

                                                    <span>
                                                        #{category.id}
                                                    </span>

                                                </div>

                                            </div>

                                        </td>


                                        {/* DESCRIPTION */}

                                        <td>

                                            <span className="expense-category-description">

                                                {category.description ||
                                                    "—"}

                                            </span>

                                        </td>


                                        {/* EXPENSE COUNT */}

                                        <td>

                                            <strong className="expense-count">

                                                {category.expenses || 0}

                                            </strong>

                                        </td>


                                        {/* TOTAL */}

                                        <td>

                                            <strong className="expense-total">

                                                {formatCurrency(
                                                    category.totalAmount
                                                )}

                                            </strong>

                                        </td>


                                        {/* STATUS */}

                                        <td>

                                            <span
                                                className={`expense-category-status ${category.status?.toLowerCase()
                                                    }`}
                                            >

                                                <i />

                                                {category.status}

                                            </span>

                                        </td>


                                        {/* CREATED */}

                                        <td>

                                            <span className="expense-created-date">

                                                {category.created_at
                                                    ? new Date(
                                                        category.created_at
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )
                                                    : "—"}

                                            </span>

                                        </td>


                                        {/* ACTIONS */}

                                        <td>

                                            <div className="expense-category-actions">


                                                <button
                                                    type="button"
                                                    className="expense-more-action"
                                                    onClick={() =>
                                                        setOpenMenu(
                                                            openMenu ===
                                                                category.id
                                                                ? null
                                                                : category.id
                                                        )
                                                    }
                                                >

                                                    <MoreVertical size={15} />

                                                </button>


                                                {openMenu ===
                                                    category.id && (

                                                        <div className="expense-action-menu">


                                                            {/* VIEW */}

                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    handleView(category)
                                                                    setOpenMenu(
                                                                        null
                                                                    );

                                                                    // Add view logic here

                                                                }}
                                                            >

                                                                <Eye size={13} />

                                                                View

                                                            </button>


                                                            {/* EDIT */}

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleEdit(
                                                                        category
                                                                    )
                                                                }
                                                            >

                                                                <Pencil size={13} />

                                                                Edit

                                                            </button>


                                                            <div />


                                                            {/* DELETE */}

                                                            <button
                                                                type="button"
                                                                className="delete-menu"
                                                                onClick={() => {

                                                                    setCategoryToDelete(
                                                                        category
                                                                    );

                                                                    setOpenMenu(
                                                                        null
                                                                    );

                                                                    setShowDeleteModal(
                                                                        true
                                                                    );

                                                                }}
                                                            >

                                                                <Trash2 size={13} />

                                                                Delete

                                                            </button>

                                                        </div>

                                                    )}

                                            </div>

                                        </td>

                                    </tr>

                                ))

                            )}

                        </tbody>

                    </table>

                </div>


                {/* ==================================================
                    PAGINATION
                ================================================== */}

                {totalPages > 0 && (

                    <div className="expense-category-pagination">

                        <div className="expense-category-pagination-info">

                            Page{" "}

                            <strong>
                                {currentPage}
                            </strong>

                            {" "}of{" "}

                            <strong>
                                {totalPages}
                            </strong>

                        </div>


                        <div className="expense-category-pagination-buttons">

                            <button
                                type="button"
                                className="expense-category-page-btn"
                                disabled={currentPage === 1}
                                onClick={handlePreviousPage}
                            >

                                <ChevronLeft size={15} />

                            </button>


                            <button
                                type="button"
                                className="expense-category-page-btn"
                                disabled={
                                    currentPage === totalPages
                                }
                                onClick={handleNextPage}
                            >

                                <ChevronRight size={15} />

                            </button>

                        </div>

                    </div>

                )}

            </div>
            {showViewModal && viewingCategory && (

                <ExpenseCategoryViewModal
                    category={viewingCategory}
                    onClose={() => {
                        setShowViewModal(false);
                        setViewingCategory(null);
                    }}
                />

            )}

            {/* ==================================================
                ADD / EDIT MODAL
            ================================================== */}

            {showModal && (

                <CategoryModal
                    category={editingCategory}
                    onClose={() => {

                        setShowModal(false);

                        setEditingCategory(null);

                    }}
                    onSave={handleSave}
                />

            )}


            {/* ==================================================
                DELETE MODAL
            ================================================== */}

            {showDeleteModal && (

                <div className="expense-modal-overlay">

                    <div className="expense-delete-modal">

                        <div className="expense-delete-icon">

                            <Trash2 size={20} />

                        </div>


                        <h2>
                            Delete Category?
                        </h2>


                        <p>

                            Are you sure you want to delete{" "}

                            <strong>
                                {categoryToDelete?.name}
                            </strong>

                            ?

                        </p>


                        <div className="expense-delete-actions">

                            <button
                                type="button"
                                onClick={() => {

                                    setShowDeleteModal(false);

                                    setCategoryToDelete(null);

                                }}
                            >
                                Cancel
                            </button>


                            <button
                                type="button"
                                className="confirm-delete"
                                onClick={handleDelete}
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </>
    );
}


// ======================================================
// CATEGORY MODAL
// ======================================================

function CategoryModal({
    category,
    onClose,
    onSave,
}) {

    const [form, setForm] = useState({

        name: category?.name || "",

        description: category?.description || "",

        status: category?.status || "Active",

    });


    const [saving, setSaving] = useState(false);


    // ======================================================
    // FORM SUBMIT
    // ======================================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!form.name.trim()) return;

        try {

            setSaving(true);

            await onSave(form);

        } finally {

            setSaving(false);

        }

    };


    // ======================================================
    // RETURN
    // ======================================================

    return (

        <div className="expense-modal-overlay">

            <div className="expense-category-modal">


                {/* HEADER */}

                <div className="expense-modal-header">

                    <div>

                        <h2>

                            {category
                                ? "Edit Expense Category"
                                : "Add Expense Category"}

                        </h2>


                        <span>

                            {category
                                ? "Update this expense category"
                                : "Create a new expense category"}

                        </span>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                    >

                        <X size={16} />

                    </button>

                </div>


                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="expense-category-form"
                >


                    {/* NAME */}

                    <div className="expense-form-group">

                        <label>
                            Category Name
                        </label>

                        <input
                            type="text"
                            placeholder="e.g. Electricity"
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                        />

                    </div>


                    {/* DESCRIPTION */}

                    <div className="expense-form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            placeholder="Describe this expense category..."
                            value={form.description}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    description:
                                        e.target.value,
                                })
                            }
                        />

                    </div>


                    {/* STATUS */}

                    <div className="expense-form-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={form.status}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    status: e.target.value,
                                })
                            }
                        >

                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    {/* FOOTER */}

                    <div className="expense-modal-footer">

                        <button
                            type="button"
                            className="expense-modal-close"
                            onClick={onClose}
                            disabled={saving}
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            className="expense-modal-save"
                            disabled={saving}
                        >

                            {saving
                                ? "Saving..."
                                : category
                                    ? "Update Category"
                                    : "Add Category"}

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

function ExpenseCategoryViewModal({
    category,
    onClose,
}) {

    const formatDate = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleDateString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
            }
        );
    };


    const formatDateTime = (date) => {

        if (!date) return "—";

        return new Date(date).toLocaleString(
            "en-US",
            {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
            }
        );
    };


    return (

        <div className="expense-modal-overlay">

            <div className="expense-category-view-modal">


                {/* ==================================================
                    HEADER
                ================================================== */}

                <div className="expense-modal-header">

                    <div>

                        <div className="expense-view-title-row">

                            <div className="expense-category-view-avatar">

                                <Receipt size={18} />

                            </div>

                            <div>

                                <h2>
                                    {category.name}
                                </h2>

                                <span>
                                    Expense Category #{category.id}
                                </span>

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                    >

                        <X size={16} />

                    </button>

                </div>


                {/* ==================================================
                    CONTENT
                ================================================== */}

                <div className="expense-category-view-content">


                    {/* STATUS */}

                    <div className="expense-view-status-row">

                        <span className="expense-view-label">
                            Status
                        </span>

                        <span
                            className={`expense-category-status ${
                                category.status?.toLowerCase()
                            }`}
                        >

                            <i />

                            {category.status}

                        </span>

                    </div>


                    {/* DESCRIPTION */}

                    <div className="expense-view-section">

                        <span className="expense-view-label">
                            Description
                        </span>

                        <div className="expense-view-description">

                            {category.description ||
                                "No description provided."}

                        </div>

                    </div>


                    {/* STATISTICS */}

                    <div className="expense-view-section">

                        <span className="expense-view-section-title">
                            Category Statistics
                        </span>


                        <div className="expense-view-stats">


                            <div className="expense-view-stat">

                                <span>
                                    Total Expenses
                                </span>

                                <strong>
                                    {category.expenses || 0}
                                </strong>

                            </div>


                            <div className="expense-view-stat">

                                <span>
                                    Total Amount
                                </span>

                                <strong>
                                    {formatCurrency(
                                        category.totalAmount
                                    )}
                                </strong>

                            </div>

                        </div>

                    </div>


                    {/* DATES */}

                    <div className="expense-view-section">

                        <span className="expense-view-section-title">
                            Information
                        </span>


                        <div className="expense-view-info-grid">


                            <div>

                                <span>
                                    Category ID
                                </span>

                                <strong>
                                    #{category.id}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Created
                                </span>

                                <strong>
                                    {formatDate(
                                        category.created_at
                                    )}
                                </strong>

                            </div>


                            <div>

                                <span>
                                    Last Updated
                                </span>

                                <strong>
                                    {formatDateTime(
                                        category.updated_at
                                    )}
                                </strong>

                            </div>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    FOOTER
                ================================================== */}

                <div className="expense-modal-footer">

                    <button
                        type="button"
                        className="expense-modal-close"
                        onClick={onClose}
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>

    );
}