"use client";

import { useEffect, useRef, useState, useActionState } from "react";
import {
  ArrowLeft,
  Save,
  Package,
  Barcode,
  Tag,
  Layers3,
  Truck,
  ImagePlus,
  X,
  Plus,
} from "lucide-react";

import "./add-product.css";
import Swal from "sweetalert2";
import { createProduct } from "@/services/products/create";
import { getCategories } from "@/services/categories/get";
import { getBrands } from "@/services/brands/get";
import { getTaxes } from "@/services/taxes/get";
import { getUnits } from "@/services/units/get";
import getSuppliers from "@/services/suppliers/get";
import {getbranches} from "@/services/branch/branchService"

const initialState = { success: false, message: "" };

const initialFormValues = {
  productName: "",
  sku: "",
  barcode: "",
  category: "",
  branch: "",
  brand: "",
  unit: "",
  tax: "",
  supplier: "",
  description: "",
  costPrice: "",
  sellingPrice: "",
  stockQuantity: "",
  reorderLevel: "",
  status: "active",
  trackInventory: true,
};

const toArray = (value) =>
  Array.isArray(value) ? value : Array.isArray(value?.data) ? value.data : [];

export default function AddProduct() {


  // ========================================
  // SERVER ACTION
  // ========================================

  const [state, formAction, saving] = useActionState(
    createProduct,
    initialState
  );

  // ========================================
  // STATE
  // ========================================

  const [formValues, setFormValues] = useState(initialFormValues);
  const [productImage, setProductImage] = useState(null);
  const imageInputRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [branch, setBranch] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // ========================================
  // INPUT CHANGE
  // ========================================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ========================================
  // LOAD DROPDOWN DATA
  // ========================================

  useEffect(() => {
    async function loadData() {
      try {
        setLoadingData(true);

        const [categoriesData, brandsData, taxesData, unitsData, suppliersData,branchData] =
          await Promise.all([
            getCategories(),
            getBrands(),
            getTaxes(),
            getUnits(),
            getSuppliers(),
            getbranches(),
          ]);

        setCategories(toArray(categoriesData));
        setBrands(toArray(brandsData));
        setTaxes(toArray(taxesData));
        setUnits(toArray(unitsData));
        setSuppliers(toArray(suppliersData));
        setBranch(toArray(branchData));
      } catch (error) {
        console.error("Failed to load product data:", error);
     
        
      } finally {
        setLoadingData(false);
      }
    }

    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ========================================
  // SERVER ACTION RESPONSE
  // ========================================

 // ========================================
  // SERVER ACTION RESPONSE
  // ========================================

  useEffect(() => {
    if (!state?.message) return;

    if (state.success) {
      Swal.fire({
        icon: "success",
        title: "Product created",
        text: state.message,
        confirmButtonText: "OK",
        confirmButtonColor: "#356bd8",
      });
      resetForm();
    } else {
      Swal.fire({
        icon: "error",
        title: "Could not save product",
        text: state.message,
        confirmButtonText: "Try again",
        confirmButtonColor: "#356bd8",
      });

      // React clears uncontrolled inputs after an action. Put the chosen
      // image back so the user doesn't have to pick it again.
      if (productImage?.file && imageInputRef.current) {
        const transfer = new DataTransfer();
        transfer.items.add(productImage.file);
        imageInputRef.current.files = transfer.files;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Free the preview URL when leaving the page.
  useEffect(() => {
    return () => {
      if (productImage?.preview) URL.revokeObjectURL(productImage.preview);
    };
  }, [productImage]);

  // ========================================
  // IMAGE
  // ========================================

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({
        icon: "error",
        title: "Image size too large",
        text: "Image size must not exceed 2MB.",
        confirmButtonText: "OK",
        confirmButtonColor: "#356bd8",
      });
      e.target.value = "";
      return;
    }

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      Swal.fire({
        icon: "error",
        title: "Invalid image type",
        text: "Please select a PNG, JPG or WEBP image.",
        confirmButtonText: "OK",
        confirmButtonColor: "#356bd8",
      });
      e.target.value = "";
      return;
    }

    setProductImage({ file, preview: URL.createObjectURL(file) });
  };

  const removeImage = () => {
    setProductImage(null);
    if (imageInputRef.current) imageInputRef.current.value = "";
  };

  // ========================================
  // RESET
  // ========================================

  const resetForm = () => {
    setFormValues(initialFormValues);
    removeImage();
  };

  // ========================================
  // GENERATORS
  // ========================================

  const generateSKU = () => {
    const random = Math.floor(10000 + Math.random() * 90000);
    setFormValues((current) => ({ ...current, sku: `SKU-${random}` }));
  };

  const generateBarcode = () => {
    const random = Math.floor(100000000000 + Math.random() * 900000000000);
    setFormValues((current) => ({ ...current, barcode: String(random) }));
  };

  // ========================================
  // DERIVED VALUES
  // ========================================

  const costPrice = Number(formValues.costPrice || 0);
  const sellingPrice = Number(formValues.sellingPrice || 0);
  const profit = sellingPrice - costPrice;
  const profitMargin = sellingPrice > 0 ? (profit / sellingPrice) * 100 : 0;

  const selectedCategory = categories.find(
    (category) => String(category.id) === String(formValues.category)
  );

  const selectedUnit = units.find(
    (unit) => String(unit.id) === String(formValues.unit)
  );

  const loadingLabel = (label, loadingText) =>
    loadingData ? loadingText : label;

  // ========================================
  // RENDER
  // ========================================

  return (
    <div className="add-product-page content-wrapper">
      {/* ========================================
          PAGE HEADER
      ======================================== */}
      <div className="add-product-header">
        <div className="header-title-area">
          <button
            className="back-button"
            type="button"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="add-product-breadcrumb">
              <span>Products</span>
              <span>/</span>
              <strong>Add Product</strong>
            </div>

            <h1>Add New Product</h1>
            <p>Create a new product and add it to your inventory.</p>
          </div>
        </div>

        <div className="header-buttons">
          <button
            type="button"
            className="cancel-button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            form="product-form"
            className="save-product-button"
            disabled={saving}
          >
            <Save size={17} />
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </div>

      {/* ========================================
          FORM
      ======================================== */}
      <form id="product-form" className="product-form" action={formAction}>
        <div className="form-layout">
          {/* ======================================
              LEFT SIDE
          ====================================== */}
          <div className="form-main">
            {/* PRODUCT INFORMATION */}
            <section className="form-card">
              <div className="section-heading">
                <div className="section-icon blue">
                  <Package size={18} />
                </div>
                <div>
                  <h2>Product Information</h2>
                  <p>Basic information about the product.</p>
                </div>
              </div>

              <div className="form-divider" />

              <div className="form-grid">
                <div className="form-group full">
                  <label>
                    Product Name<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="productName"
                    value={formValues.productName}
                    onChange={handleChange}
                    placeholder="e.g. Samsung Galaxy A15"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>
                    SKU<span>*</span>
                  </label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      name="sku"
                      value={formValues.sku}
                      onChange={handleChange}
                      placeholder="e.g. SKU-10001"
                      required
                    />
                    <button type="button" onClick={generateSKU}>
                      Generate
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>Barcode</label>
                  <div className="input-with-button">
                    <div className="input-icon">
                      <Barcode size={17} />
                      <input
                        type="text"
                        name="barcode"
                        value={formValues.barcode}
                        onChange={handleChange}
                        placeholder="Scan or enter barcode"
                      />
                    </div>
                    <button type="button" onClick={generateBarcode}>
                      Generate
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    Category<span>*</span>
                  </label>
                  <select
                    name="category"
                    value={formValues.category}
                    onChange={handleChange}
                    required
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select category", "Loading categories...")}
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Brand</label>
                  <select
                    name="brand"
                    value={formValues.brand}
                    onChange={handleChange}
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select brand", "Loading brands...")}
                    </option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formValues.description}
                    onChange={handleChange}
                    placeholder="Enter a short description of this product..."
                    rows="4"
                  />
                </div>
              </div>
            </section>

            {/* PRICING */}
            <section className="form-card">
              <div className="section-heading">
                <div className="section-icon green">
                  <Tag size={18} />
                </div>
                <div>
                  <h2>Pricing</h2>
                  <p>Set the buying and selling prices.</p>
                </div>
              </div>

              <div className="form-divider" />

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Cost Price<span>*</span>
                  </label>
                  <div className="currency-input">
                    <span>₦</span>
                    <input
                      type="number"
                      name="costPrice"
                      value={formValues.costPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <small>Price you paid for the product.</small>
                </div>

                <div className="form-group">
                  <label>
                    Selling Price<span>*</span>
                  </label>
                  <div className="currency-input">
                    <span>₦</span>
                    <input
                      type="number"
                      name="sellingPrice"
                      value={formValues.sellingPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <small>Price customers will pay.</small>
                </div>

                <div className="form-group">
                  <label>Tax</label>
                  <select
                    name="tax"
                    value={formValues.tax}
                    onChange={handleChange}
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select tax", "Loading taxes...")}
                    </option>
                    {taxes.map((tax) => (
                      <option key={tax.id} value={tax.id}>
                        {tax.name} ({Number(tax.rate).toFixed(2)}%)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Branch</label>
                  <select
                    name="branch"
                    value={formValues.branch}
                    onChange={handleChange}
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select branch", "Loading branches...")}
                    </option>
                    {branch.map((branch) => (
                      <option key={branch.id} value={branch.id}>
                        {branch.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="profit-box">
                <div>
                  <span>Estimated Profit</span>
                  <strong>₦{profit.toLocaleString()}</strong>
                </div>

                <div className="profit-margin">
                  <span>Profit Margin</span>
                  <strong>{profitMargin.toFixed(1)}%</strong>
                </div>
              </div>
            </section>

            {/* INVENTORY */}
            <section className="form-card">
              <div className="section-heading">
                <div className="section-icon orange">
                  <Layers3 size={18} />
                </div>
                <div>
                  <h2>Inventory</h2>
                  <p>Configure stock and inventory settings.</p>
                </div>
              </div>

              <div className="form-divider" />

              <div className="form-grid">
                <div className="form-group">
                  <label>
                    Initial Stock<span>*</span>
                  </label>
                  <input
                    type="number"
                    name="stockQuantity"
                    value={formValues.stockQuantity}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Reorder Level</label>
                  <input
                    type="number"
                    name="reorderLevel"
                    value={formValues.reorderLevel}
                    onChange={handleChange}
                    placeholder="5"
                    min="0"
                  />
                  <small>Alert when stock reaches this level.</small>
                </div>

                <div className="form-group">
                  <label>
                    Unit<span>*</span>
                  </label>
                  <select
                    name="unit"
                    value={formValues.unit}
                    onChange={handleChange}
                    required
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select unit", "Loading units...")}
                    </option>
                    {units.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div className="form-group full">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="trackInventory"
                      checked={formValues.trackInventory}
                      onChange={handleChange}
                    />
                    <span>Track inventory for this product</span>
                  </label>
                </div>
              </div>
            </section>

            {/* SUPPLIER */}
            <section className="form-card">
              <div className="section-heading">
                <div className="section-icon purple">
                  <Truck size={18} />
                </div>
                <div>
                  <h2>Supplier</h2>
                  <p>Associate this product with a supplier.</p>
                </div>
              </div>

              <div className="form-divider" />

              <div className="form-grid">
                <div className="form-group full">
                  <label>Supplier</label>
                  <select
                    name="supplier"
                    value={formValues.supplier}
                    onChange={handleChange}
                    disabled={loadingData}
                  >
                    <option value="">
                      {loadingLabel("Select supplier", "Loading suppliers...")}
                    </option>
                    {suppliers.map((supplier) => (
                      <option key={supplier.id} value={supplier.id}>
                        {supplier.supplier_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>
          </div>

          {/* ======================================
              RIGHT SIDEBAR
          ====================================== */}
          <div className="form-sidebar">
            {/* IMAGE */}
            <section className="form-card image-card">
              <div className="sidebar-heading">
                <h2>Product Image</h2>
                <span>Optional</span>
              </div>

              <div className="image-upload">
                {productImage && (
                  <div className="uploaded-image">
                    <img src={productImage.preview} alt="Product preview" />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="remove-image"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                {/* The input stays mounted (even when hidden) so the file
                    is still part of the form data on submit. */}
                <label
                  htmlFor="product-image"
                  className="upload-area"
                  style={productImage ? { display: "none" } : undefined}
                >
                  <div className="upload-icon">
                    <ImagePlus size={24} />
                  </div>

                  <strong>Upload product image</strong>
                  <span>PNG, JPG or WEBP</span>
                  <small>Maximum file size: 2MB</small>

                  <input
                    ref={imageInputRef}
                    id="product-image"
                    name="image"
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </section>

            {/* SUMMARY */}
            <section className="form-card summary-card">
              <h2>Product Summary</h2>

              <div className="summary-divider" />

              <div className="summary-row">
                <span>Product</span>
                <strong>{formValues.productName || "Not specified"}</strong>
              </div>

              <div className="summary-row">
                <span>Category</span>
                <strong>{selectedCategory?.name || "Not specified"}</strong>
              </div>

              <div className="summary-row">
                <span>Cost Price</span>
                <strong>₦{costPrice.toLocaleString()}</strong>
              </div>

              <div className="summary-row">
                <span>Selling Price</span>
                <strong>₦{sellingPrice.toLocaleString()}</strong>
              </div>

              <div className="summary-row">
                <span>Initial Stock</span>
                <strong>
                  {formValues.stockQuantity || "0"} {selectedUnit?.name || "unit"}
                </strong>
              </div>

              <div className="summary-total">
                <span>Expected Profit</span>
                <strong>₦{profit.toLocaleString()}</strong>
              </div>
            </section>

            {/* HELP */}
            <div className="product-tip">
              <div className="tip-icon">
                <Plus size={17} />
              </div>
              <div>
                <strong>Quick tip</strong>
                <p>
                  Use a unique SKU and barcode for every product to make sales
                  and inventory tracking easier.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================
            MOBILE ACTIONS
        ====================================== */}
        <div className="mobile-form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button type="submit" className="save-product-button" disabled={saving}>
            <Save size={17} />
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}