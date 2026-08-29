
"use client";

import React, { useState } from "react";
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
  Trash2,
} from "lucide-react";

import "./add-product.css";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    productName: "",
    sku: "",
    barcode: "",
    category: "",
    brand: "",
    description: "",
    costPrice: "",
    sellingPrice: "",
    tax: "0",
    stockQuantity: "",
    reorderLevel: "5",
    unit: "Piece",
    supplier: "",
    status: "Active",
  });

  const [productImage, setProductImage] = useState(null);

  const categories = [
    "Smartphones",
    "Laptops",
    "Televisions",
    "Computer Accessories",
    "Accessories",
    "Chargers",
    "Power Banks",
    "Speakers",
    "Other",
  ];

  const units = [
    "Piece",
    "Box",
    "Pack",
    "Carton",
    "Kg",
    "Liter",
    "Meter",
  ];

  const suppliers = [
    "Samsung Nigeria",
    "Apple Distributor",
    "HP Nigeria",
    "Oraimo",
    "Anker Distributor",
    "Logitech Nigeria",
    "JBL Distributor",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setProductImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeImage = () => {
    if (productImage?.preview) {
      URL.revokeObjectURL(productImage.preview);
    }

    setProductImage(null);
  };

  const generateSKU = () => {
    const random = Math.floor(10000 + Math.random() * 90000);

    setFormData((current) => ({
      ...current,
      sku: `SKU-${random}`,
    }));
  };

  const generateBarcode = () => {
    const random = Math.floor(
      100000000000 + Math.random() * 900000000000
    );

    setFormData((current) => ({
      ...current,
      barcode: String(random),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Product Data:", formData);

    alert("Product created successfully.");
  };

  const profit =
    Number(formData.sellingPrice || 0) -
    Number(formData.costPrice || 0);

  const profitMargin =
    Number(formData.sellingPrice) > 0
      ? (profit / Number(formData.sellingPrice)) * 100
      : 0;

  return (
    <div className="add-product-page content-wrapper">

      {/* =========================
          PAGE HEADER
      ========================== */}

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

            <p>
              Create a new product and add it to your inventory.
            </p>

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
          >
            <Save size={17} />
            Save Product
          </button>

        </div>

      </div>


      {/* =========================
          FORM
      ========================== */}

      <form
        id="product-form"
        className="product-form"
        onSubmit={handleSubmit}
      >

        <div className="form-layout">

          {/* =====================
              LEFT SIDE
          ====================== */}

          <div className="form-main">

            {/* PRODUCT INFORMATION */}

            <section className="form-card">

              <div className="section-heading">

                <div className="section-icon blue">
                  <Package size={18} />
                </div>

                <div>
                  <h2>Product Information</h2>
                  <p>
                    Basic information about the product.
                  </p>
                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">

                <div className="form-group full">

                  <label>
                    Product Name
                    <span>*</span>
                  </label>

                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g. Samsung Galaxy A15"
                    required
                  />

                </div>


                <div className="form-group">

                  <label>
                    SKU
                    <span>*</span>
                  </label>

                  <div className="input-with-button">

                    <input
                      type="text"
                      name="sku"
                      value={formData.sku}
                      onChange={handleChange}
                      placeholder="e.g. SKU-10001"
                      required
                    />

                    <button
                      type="button"
                      onClick={generateSKU}
                    >
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
                        value={formData.barcode}
                        onChange={handleChange}
                        placeholder="Scan or enter barcode"
                      />

                    </div>

                    <button
                      type="button"
                      onClick={generateBarcode}
                    >
                      Generate
                    </button>

                  </div>

                </div>


                <div className="form-group">

                  <label>
                    Category
                    <span>*</span>
                  </label>

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select category
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="form-group">

                  <label>Brand</label>

                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. Samsung"
                  />

                </div>


                <div className="form-group full">

                  <label>Description</label>

                  <textarea
                    name="description"
                    value={formData.description}
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
                  <p>
                    Set the buying and selling prices.
                  </p>
                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Cost Price
                    <span>*</span>
                  </label>

                  <div className="currency-input">

                    <span>₦</span>

                    <input
                      type="number"
                      name="costPrice"
                      value={formData.costPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      required
                    />

                  </div>

                  <small>
                    Price you paid for the product.
                  </small>

                </div>


                <div className="form-group">

                  <label>
                    Selling Price
                    <span>*</span>
                  </label>

                  <div className="currency-input">

                    <span>₦</span>

                    <input
                      type="number"
                      name="sellingPrice"
                      value={formData.sellingPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      required
                    />

                  </div>

                  <small>
                    Price customers will pay.
                  </small>

                </div>


                <div className="form-group">

                  <label>Tax</label>

                  <div className="percentage-input">

                    <input
                      type="number"
                      name="tax"
                      value={formData.tax}
                      onChange={handleChange}
                      min="0"
                      max="100"
                      step="0.01"
                    />

                    <span>%</span>

                  </div>

                </div>

              </div>


              <div className="profit-box">

                <div>
                  <span>Estimated Profit</span>
                  <strong>
                    ₦{profit.toLocaleString()}
                  </strong>
                </div>

                <div className="profit-margin">
                  <span>Profit Margin</span>
                  <strong>
                    {profitMargin.toFixed(1)}%
                  </strong>
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
                  <p>
                    Configure stock and inventory settings.
                  </p>
                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">

                <div className="form-group">

                  <label>
                    Initial Stock
                    <span>*</span>
                  </label>

                  <input
                    type="number"
                    name="stockQuantity"
                    value={formData.stockQuantity}
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
                    value={formData.reorderLevel}
                    onChange={handleChange}
                    placeholder="5"
                    min="0"
                  />

                  <small>
                    Alert when stock reaches this level.
                  </small>

                </div>


                <div className="form-group">

                  <label>Unit</label>

                  <select
                    name="unit"
                    value={formData.unit}
                    onChange={handleChange}
                  >

                    {units.map((unit) => (
                      <option key={unit} value={unit}>
                        {unit}
                      </option>
                    ))}

                  </select>

                </div>


                <div className="form-group">

                  <label>Status</label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >

                    <option value="Active">
                      Active
                    </option>

                    <option value="Inactive">
                      Inactive
                    </option>

                  </select>

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
                  <p>
                    Associate this product with a supplier.
                  </p>
                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">

                <div className="form-group full">

                  <label>Supplier</label>

                  <select
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                  >

                    <option value="">
                      Select supplier
                    </option>

                    {suppliers.map((supplier) => (
                      <option
                        key={supplier}
                        value={supplier}
                      >
                        {supplier}
                      </option>
                    ))}

                  </select>

                </div>

              </div>

            </section>

          </div>


          {/* =====================
              RIGHT SIDE
          ====================== */}

          <div className="form-sidebar">

            {/* IMAGE */}

            <section className="form-card image-card">

              <div className="sidebar-heading">

                <h2>Product Image</h2>

                <span>Optional</span>

              </div>


              <div className="image-upload">

                {productImage ? (

                  <div className="uploaded-image">

                    <img
                      src={productImage.preview}
                      alt="Product preview"
                    />

                    <button
                      type="button"
                      onClick={removeImage}
                      className="remove-image"
                    >
                      <X size={16} />
                    </button>

                  </div>

                ) : (

                  <label
                    htmlFor="product-image"
                    className="upload-area"
                  >

                    <div className="upload-icon">
                      <ImagePlus size={24} />
                    </div>

                    <strong>
                      Upload product image
                    </strong>

                    <span>
                      PNG, JPG or WEBP
                    </span>

                    <small>
                      Maximum file size: 2MB
                    </small>

                    <input
                      id="product-image"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                    />

                  </label>

                )}

              </div>

            </section>


            {/* PRODUCT SUMMARY */}

            <section className="form-card summary-card">

              <h2>Product Summary</h2>

              <div className="summary-divider" />


              <div className="summary-row">

                <span>Product</span>

                <strong>
                  {formData.productName ||
                    "Not specified"}
                </strong>

              </div>


              <div className="summary-row">

                <span>Category</span>

                <strong>
                  {formData.category ||
                    "Not specified"}
                </strong>

              </div>


              <div className="summary-row">

                <span>Cost Price</span>

                <strong>
                  ₦
                  {Number(
                    formData.costPrice || 0
                  ).toLocaleString()}
                </strong>

              </div>


              <div className="summary-row">

                <span>Selling Price</span>

                <strong>
                  ₦
                  {Number(
                    formData.sellingPrice || 0
                  ).toLocaleString()}
                </strong>

              </div>


              <div className="summary-row">

                <span>Initial Stock</span>

                <strong>
                  {formData.stockQuantity || "0"}{" "}
                  {formData.unit.toLowerCase()}
                  {Number(formData.stockQuantity) !== 1
                    ? "s"
                    : ""}
                </strong>

              </div>


              <div className="summary-total">

                <span>Expected Profit</span>

                <strong>
                  ₦{profit.toLocaleString()}
                </strong>

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
                  Use a unique SKU and barcode for every
                  product to make sales and inventory
                  tracking easier.
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* MOBILE SAVE AREA */}

        <div className="mobile-form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() => window.history.back()}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-product-button"
          >
            <Save size={17} />
            Save Product
          </button>

        </div>

      </form>

    </div>
  );
}

