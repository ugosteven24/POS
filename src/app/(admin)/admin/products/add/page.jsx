"use client";

import {
  useEffect,
  useState,
  useActionState,
} from "react";

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

import { useToast } from "@/components/Toast";

import { createProduct } from "@/services/products/create";
import { getCategories } from "@/services/categories/get";
import { getBrands } from "@/services/brands/get";
import { getTaxes } from "@/services/taxes/get";
import { getUnits } from "@/services/units/get";
import  getSuppliers  from "@/services/suppliers/get";


const initialState = {
  success: false,
  message: "",
};


const initialFormValues = {
  productName: "",
  sku: "",
  barcode: "",
  category: "",
  brand: "",
  unit:"",
  tax:"",
  supplier:"",
  description: "",
  costPrice: "",
  sellingPrice: "",
  stockQuantity: "",
  reorderLevel: "",
  unit: "",
  status: "active",
  productImage:"",
  trackInventory: true,
};


export default function AddProduct() {

  const toast = useToast();

  // ========================================
  // SERVER ACTION
  // ========================================

  const [state, formAction, saving] = useActionState(createProduct,initialState);


  // ========================================
  // FORM STATE
  // ========================================

  const [formValues, setFormValues] = useState(initialFormValues);


  // ========================================
  // DROPDOWN DATA
  // ========================================

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [units, setUnits] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);


  // ========================================
  // PRODUCT IMAGE
  // ========================================

  const [productImage, setProductImage] = useState(null);


  // ========================================
  // HANDLE INPUT CHANGE
  // ========================================

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setFormValues((current) => ({
      ...current,
      [name]: type === "checkbox"
        ? checked
        : value,
    }));

  };


  // ========================================
  // LOAD DROPDOWN DATA
  // ========================================

  useEffect(() => {

    async function loadData() {

      try {

        setLoadingData(true);

        const [
          categoriesData,
          brandsData,
          taxesData,
          unitsData,
          suppliersData,
        ] = await Promise.all([
          getCategories(),
          getBrands(),
          getTaxes(),
          getUnits(),
          getSuppliers(),
        ]);


        setCategories(categoriesData || []);
        setBrands(brandsData || []);
        setTaxes(taxesData || []);
        setUnits(unitsData || []);
        setSuppliers(suppliersData || []);

      } catch (error) {

        console.error(
          "Failed to load product data:",
          error
        );

        toast.error(
          "Failed to load product information."
        );

      } finally {

        setLoadingData(false);

      }

    }


    loadData();

  }, []);


  // ========================================
  // SERVER ACTION RESPONSE
  // ========================================

  useEffect(() => {

    if (!state?.message) return;


    if (state.success) {

      toast.success(state.message);

    } else {

      toast.error(state.message);

    }

  }, [state]);


  // ========================================
  // IMAGE CHANGE
  // ========================================

  const handleImageChange = (e) => {

    const file = e.target.files?.[0];

    if (!file) return;


    // Maximum 2MB

    if (file.size > 2 * 1024 * 1024) {

      toast.error(
        "Image size must not exceed 2MB."
      );

      e.target.value = "";

      return;
    }


    // Make sure it is an image

    if (!file.type.startsWith("image/")) {

      toast.error(
        "Please select a valid image."
      );

      e.target.value = "";

      return;
    }


    // Remove previous preview

    if (productImage?.preview) {

      URL.revokeObjectURL(
        productImage.preview
      );

    }


    setProductImage({

      file,

      preview: URL.createObjectURL(file),

    });

  };


  // ========================================
  // REMOVE IMAGE
  // ========================================

  const removeImage = () => {

    if (productImage?.preview) {

      URL.revokeObjectURL(
        productImage.preview
      );

    }

    setProductImage(null);

  };


  // ========================================
  // GENERATE SKU
  // ========================================

  const generateSKU = () => {

    const random = Math.floor(
      10000 + Math.random() * 90000
    );


    setFormValues((current) => ({
      ...current,
      sku: `SKU-${random}`,
    }));

  };


  // ========================================
  // GENERATE BARCODE
  // ========================================

  const generateBarcode = () => {

    const random = Math.floor(
      100000000000 +
      Math.random() * 900000000000
    );


    setFormValues((current) => ({
      ...current,
      barcode: String(random),
    }));

  };


  // ========================================
  // PROFIT
  // ========================================

  const costPrice =
    Number(formValues.costPrice || 0);

  const sellingPrice =
    Number(formValues.sellingPrice || 0);


  const profit =
    sellingPrice - costPrice;


  // ========================================
  // PROFIT MARGIN
  // ========================================

  const profitMargin =
    sellingPrice > 0
      ? (profit / sellingPrice) * 100
      : 0;


  // ========================================
  // FIND SELECTED CATEGORY
  // ========================================

  const selectedCategory =
    categories.find(
      (category) =>
        String(category.id) ===
        String(formValues.category)
    );


  // ========================================
  // FIND SELECTED UNIT
  // ========================================

  const selectedUnit =
    units.find(
      (unit) =>
        String(unit.id) ===
        String(formValues.unit)
    );


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

              <span>
                Products
              </span>

              <span>
                /
              </span>

              <strong>
                Add Product
              </strong>

            </div>


            <h1>
              Add New Product
            </h1>


            <p>
              Create a new product and add it
              to your inventory.
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
            disabled={saving}
          >

            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Product"}

          </button>

        </div>

      </div>



      {/* ========================================
          FORM
      ======================================== */}

      <form
        id="product-form"
        className="product-form"
        action={formAction}
      >

        <div className="form-layout">


          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <div className="form-main">


            {/* ====================================
                PRODUCT INFORMATION
            ==================================== */}

            <section className="form-card">

              <div className="section-heading">

                <div className="section-icon blue">

                  <Package size={18} />

                </div>


                <div>

                  <h2>
                    Product Information
                  </h2>

                  <p>
                    Basic information about
                    the product.
                  </p>

                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">


                {/* PRODUCT NAME */}

                <div className="form-group full">

                  <label>
                    Product Name
                    <span>*</span>
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



                {/* SKU */}

                <div className="form-group">

                  <label>
                    SKU
                    <span>*</span>
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


                    <button
                      type="button"
                      onClick={generateSKU}
                    >
                      Generate
                    </button>

                  </div>

                </div>



                {/* BARCODE */}

                <div className="form-group">

                  <label>
                    Barcode
                  </label>


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


                    <button
                      type="button"
                      onClick={generateBarcode}
                    >
                      Generate
                    </button>

                  </div>

                </div>



                {/* CATEGORY */}

                <div className="form-group">

                  <label>
                    Category
                    <span>*</span>
                  </label>


                  <select
                    name="category"
                    value={formValues.category}
                    onChange={handleChange}
                    required
                    disabled={loadingData}
                  >

                    <option value="">
                      {loadingData
                        ? "Loading categories..."
                        : "Select category"}
                    </option>


                    {categories.map((category) => (

                      <option
                        key={category.id}
                        value={category.id}
                      >
                        {category.name}
                      </option>

                    ))}

                  </select>

                </div>



                {/* BRAND */}

                <div className="form-group">

                  <label>
                    Brand
                  </label>


                  <select
                    name="brand"
                    value={formValues.brand}
                    onChange={handleChange}
                    disabled={loadingData}
                  >

                    <option value="">
                      {loadingData
                        ? "Loading brands..."
                        : "Select brand"}
                    </option>


                    {brands.map((brand) => (

                      <option
                        key={brand.id}
                        value={brand.id}
                      >
                        {brand.name}
                      </option>

                    ))}

                  </select>

                </div>



                {/* DESCRIPTION */}

                <div className="form-group full">

                  <label>
                    Description
                  </label>


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



            {/* ====================================
                PRICING
            ==================================== */}

            <section className="form-card">

              <div className="section-heading">

                <div className="section-icon green">

                  <Tag size={18} />

                </div>


                <div>

                  <h2>
                    Pricing
                  </h2>

                  <p>
                    Set the buying and selling prices.
                  </p>

                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">


                {/* COST */}

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
                      value={formValues.costPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />

                  </div>


                  <small>
                    Price you paid for the product.
                  </small>

                </div>



                {/* SELLING */}

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
                      value={formValues.sellingPrice}
                      onChange={handleChange}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      required
                    />

                  </div>


                  <small>
                    Price customers will pay.
                  </small>

                </div>



                {/* TAX */}

                <div className="form-group">

                  <label>
                    Tax
                  </label>


                  <select
                    name="tax"
                    value={formValues.tax}
                    onChange={handleChange}
                    disabled={loadingData}
                  >

                    <option value="">
                      {loadingData
                        ? "Loading taxes..."
                        : "Select tax"}
                    </option>


                    {taxes.map((tax) => (

                      <option
                        key={tax.id}
                        value={tax.id}
                      >
                        {tax.name} (
                        {Number(tax.rate).toFixed(2)}
                        %)
                      </option>

                    ))}

                  </select>

                </div>

              </div>



              {/* PROFIT */}

              <div className="profit-box">

                <div>

                  <span>
                    Estimated Profit
                  </span>

                  <strong>
                    ₦{profit.toLocaleString()}
                  </strong>

                </div>


                <div className="profit-margin">

                  <span>
                    Profit Margin
                  </span>

                  <strong>
                    {profitMargin.toFixed(1)}%
                  </strong>

                </div>

              </div>

            </section>



            {/* ====================================
                INVENTORY
            ==================================== */}

            <section className="form-card">

              <div className="section-heading">

                <div className="section-icon orange">

                  <Layers3 size={18} />

                </div>


                <div>

                  <h2>
                    Inventory
                  </h2>

                  <p>
                    Configure stock and inventory settings.
                  </p>

                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">


                {/* INITIAL STOCK */}

                <div className="form-group">

                  <label>
                    Initial Stock
                    <span>*</span>
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



                {/* REORDER */}

                <div className="form-group">

                  <label>
                    Reorder Level
                  </label>


                  <input
                    type="number"
                    name="reorderLevel"
                    value={formValues.reorderLevel}
                    onChange={handleChange}
                    placeholder="5"
                    min="0"
                  />


                  <small>
                    Alert when stock reaches this level.
                  </small>

                </div>



                {/* UNIT */}

                <div className="form-group">

                  <label>
                    Unit
                    <span>*</span>
                  </label>


                  <select
                    name="unit"
                    value={formValues.unit}
                    onChange={handleChange}
                    required
                    disabled={loadingData}
                  >

                    <option value="">
                      {loadingData
                        ? "Loading units..."
                        : "Select unit"}
                    </option>


                    {units.map((unit) => (

                      <option
                        key={unit.id}
                        value={unit.id}
                      >
                        {unit.name}
                      </option>

                    ))}

                  </select>

                </div>



                {/* STATUS */}

                <div className="form-group">

                  <label>
                    Status
                  </label>


                  <select
                    name="status"
                    value={formValues.status}
                    onChange={handleChange}
                  >

                    <option value="active">
                      Active
                    </option>

                    <option value="inactive">
                      Inactive
                    </option>

                  </select>

                </div>



                {/* TRACK INVENTORY */}

                <div className="form-group full">

                  <label className="checkbox-label">

                    <input
                      type="checkbox"
                      name="trackInventory"
                      checked={formValues.trackInventory}
                      onChange={handleChange}
                    />

                    <span>
                      Track inventory for this product
                    </span>

                  </label>

                </div>

              </div>

            </section>



            {/* ====================================
                SUPPLIER
            ==================================== */}

            <section className="form-card">

              <div className="section-heading">

                <div className="section-icon purple">

                  <Truck size={18} />

                </div>


                <div>

                  <h2>
                    Supplier
                  </h2>

                  <p>
                    Associate this product with a supplier.
                  </p>

                </div>

              </div>


              <div className="form-divider" />


              <div className="form-grid">

                <div className="form-group full">

                  <label>
                    Supplier
                  </label>


                  <select
                    name="supplier"
                    value={formValues.supplier}
                    onChange={handleChange}
                    disabled={loadingData}
                  >

                    <option value="">
                      {loadingData
                        ? "Loading suppliers..."
                        : "Select supplier"}
                    </option>


                    {suppliers.map((supplier) => (

                      <option
                        key={supplier.id}
                        value={supplier.id}
                      >
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

                <h2>
                  Product Image
                </h2>

                <span>
                  Optional
                </span>

              </div>


              <div className="image-upload">

                {productImage ? (

                  <div className="uploaded-image">

                    <img
                      src={productImage.preview}
                      name="image"
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
                      name="productImage"
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                    />

                  </label>

                )}

              </div>

            </section>



            {/* SUMMARY */}

            <section className="form-card summary-card">

              <h2>
                Product Summary
              </h2>


              <div className="summary-divider" />


              <div className="summary-row">

                <span>
                  Product
                </span>

                <strong>
                  {formValues.productName ||
                    "Not specified"}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Category
                </span>

                <strong>
                  {selectedCategory?.name ||
                    "Not specified"}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Cost Price
                </span>

                <strong>
                  ₦
                  {costPrice.toLocaleString()}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Selling Price
                </span>

                <strong>
                  ₦
                  {sellingPrice.toLocaleString()}
                </strong>

              </div>


              <div className="summary-row">

                <span>
                  Initial Stock
                </span>

                <strong>

                  {formValues.stockQuantity || "0"}

                  {" "}

                  {selectedUnit?.name || "unit"}

                </strong>

              </div>


              <div className="summary-total">

                <span>
                  Expected Profit
                </span>

                <strong>
                  ₦
                  {profit.toLocaleString()}
                </strong>

              </div>

            </section>



            {/* HELP */}

            <div className="product-tip">

              <div className="tip-icon">

                <Plus size={17} />

              </div>


              <div>

                <strong>
                  Quick tip
                </strong>

                <p>
                  Use a unique SKU and barcode
                  for every product to make sales
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


          <button
            type="submit"
            className="save-product-button"
            disabled={saving}
          >

            <Save size={17} />

            {saving
              ? "Saving..."
              : "Save Product"}

          </button>

        </div>

      </form>

    </div>

  );

}