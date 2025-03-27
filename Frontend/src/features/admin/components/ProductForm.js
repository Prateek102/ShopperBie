import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";

import {
  selectBrands,
  selectCategories,
  createProductAsync,
  fetchProductByIdAsync,
  selectedProduct,
  updateProductAsync,
  clearSelectedProduct,
} from "../../product-list/productSlice";
import { useEffect } from "react";
import AdminProductList from "./AdminProductList";
function ProductForm() {
  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();
  const selectProduct = useSelector(selectedProduct);
  //used to get parameter passed in url after :
  const params = useParams();

  //even though we may have info already stored in product in redux
  //but again call made so that info fetched again since
  //in big projects we might send only selected info to product
  //so its better to call function separately again
  useEffect(() => {
    if (params.id) {
      dispatch(fetchProductByIdAsync(params.id));
    } else dispatch(clearSelectedProduct());
  }, [params.id, dispatch]);

  useEffect(() => {
    if (selectProduct && params.id) {
      setValue("title", selectProduct.title);
      setValue("description", selectProduct.description);
      setValue("discountpercentage", selectProduct.discountPercentage);
      setValue("price", selectProduct.price);
      setValue("stock", selectProduct.stock);
      setValue("thumbnail", selectProduct.thumbnail);
      setValue("image1", selectProduct.images[0]);
      setValue("image2", selectProduct.images[1]);
      setValue("image3", selectProduct.images[2]);
      setValue("brands", selectProduct.brand);
      setValue("categories", selectProduct.category);
    }
  }, [setValue, selectProduct, params.id]);

  const handleDelete = () => {
    const product = { ...selectProduct };
    product.deleted = true;

    //bcz not exactly deleting the product. Since in many big org
    //product info is still kept so we set deleted property true
    dispatch(updateProductAsync(product));
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          const product = { ...data };
          //want all images in single array to be stored in db
          product.images = [
            product.image1,
            product.image2,
            product.image3,
            product.thumbnail,
          ];

          //deleting each img from product since already put in array
          delete product["image1"];
          delete product["image2"];
          delete product["image3"];
          dispatch(createProductAsync());

          if (params.id) {
            product.id = params.id;
            product.rating = selectProduct.rating || 0;
            dispatch(updateProductAsync(product));
            reset();
          } else {
            product.rating = 0;
            dispatch(createProductAsync(product));
          }
        })}
      >
        <div className="text-left space-y-12 bg-white p-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Add Product
            </h2>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="title"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Product Name
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      id="title"
                      {...register("title", {
                        required: "Title is required",
                      })}
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    id="description"
                    {...register("description", {
                      required: "Description is required",
                    })}
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="price"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Price
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("price", {
                        required: "Price is required",
                      })}
                      id="price"
                      autoComplete="price"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="discountpercentage"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Discount Percentage
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("discountpercentage", {
                        required: "Discount percentage is required",
                        min: 0,
                        max: 100,
                      })}
                      id="discountpercentage"
                      autoComplete="discountpercentage"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="stock"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Stock
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="number"
                      {...register("stock", {
                        required: "stock is required",
                        min: 0,
                      })}
                      id="stock"
                      autoComplete="stock"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Thumbnail
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  {...register("thumbnail", {
                    required: "thumbnail is required",
                  })}
                  id="thumbnail"
                  autoComplete="thumbnail"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="image1"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 1
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  {...register("image1", {
                    required: "image is required",
                  })}
                  id="image1"
                  autoComplete="image1"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4">
            <label
              htmlFor="image2"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 2
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  {...register("image2", {
                    required: "image is required",
                  })}
                  id="image2"
                  autoComplete="image2"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-4">
            <label
              htmlFor="image3"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Image 3
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  type="text"
                  {...register("image3", {
                    required: "image is required",
                  })}
                  id="image3"
                  autoComplete="image3"
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="col-span-full">
            <label
              htmlFor="brands"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Brands
            </label>

            <div className="mt-2">
              <select
                {...register("brands", {
                  required: "brands is required",
                })}
              >
                <option value="">--choose brand--</option>
                {brands.map((brands) => (
                  <option key={categories.value} value={brands.value}>
                    {brands.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col-span-full">
            <label
              htmlFor="categories"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Categories
            </label>

            {/* <div className="mt-2">
              <select
              // {...register("categories", {
              //   required: "categories is required",
              // })}
              >
                <option value="">--choose categories--</option>
                {categories.map((categories) => (
                  <option key={categories.value} value={categories.value}>
                    {categories.label}
                  </option>
                ))}
              </select>
            </div> */}
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Extra
            </h2>

            <div className="mt-10 space-y-10">
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  By Email
                </legend>
                <div className="mt-6 space-y-6">
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="comments"
                        name="comments"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="comments"
                        className="font-medium text-gray-900"
                      >
                        Comments
                      </label>
                      <p className="text-gray-500">
                        Get notified when someones posts a comment on a posting.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="candidates"
                        name="candidates"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="candidates"
                        className="font-medium text-gray-900"
                      >
                        Candidates
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate applies for a job.
                      </p>
                    </div>
                  </div>
                  <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                      <input
                        id="offers"
                        name="offers"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                    </div>
                    <div className="text-sm leading-6">
                      <label
                        htmlFor="offers"
                        className="font-medium text-gray-900"
                      >
                        Offers
                      </label>
                      <p className="text-gray-500">
                        Get notified when a candidate accepts or rejects an
                        offer.
                      </p>
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to={`/admin`}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </Link>

          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>

          {selectProduct && (
            <button
              onClick={handleDelete}
              className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </>
  );
}

export default ProductForm;
