import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";
import AdminMenu from "./AdminMenu";
import { useSelector } from "react-redux"; // For accessing the user state

const AllProducts = () => {
  const { userInfo } = useSelector((state) => state.auth); // Assuming user info is stored here

  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  // Filter products based on the user's role
  const visibleProducts = userInfo?.isAdmin
    ? products // Admin sees all products
    : products.filter((product) => product.uploadedBy === userInfo._id); // Seller sees only their products

  return (
    <>
      <div className="container mx-[9rem]">
        <div className="flex flex-col md:flex-row">
          <div className="p-3">
            <div className="ml-[2rem] text-xl font-bold h-12">
              {userInfo?.isAdmin ? "All Products" : "My Products"} (
              {visibleProducts.length})
            </div>
            <div className="flex flex-wrap justify-around items-center">
              {visibleProducts.map((product) => (
                <Link
                  key={product._id}
                  to={`/admin/product/update/${product._id}`}
                  className="block mb-4 overflow-hidden"
                >
                  <div className="flex border border-gray-300">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-[10rem] h-[10rem] object-cover"
                    />
                    <div className="p-4 flex flex-col justify-around">
                      <div className="flex justify-between">
                        <h5 className="text-xl font-semibold mb-2">
                          {product?.name}
                        </h5>

                        <p className="text-gray-400 text-xs">
                          {moment(product.createdAt).format("MMMM Do YYYY")}
                        </p>
                      </div>

                      <p className="text-gray-400 xl:w-[30rem] lg:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4">
                        {product?.description?.substring(0, 160)}...
                      </p>

                      <div className="flex justify-between">
                        <Link
                          to={`/admin/product/update/${product._id}`}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
                        >
                          Update Product
                          <svg
                            className="w-3.5 h-3.5 ml-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M1 5h12m0 0L9 1m4 4L9 9"
                            />
                          </svg>
                        </Link>
                        <div className="flex justify-between items-center">
                          {/* Display Discounted Price if Discount is Available */}
                          <div className="flex items-center">
                            {product?.discount ? (
                              <>
                                <p className="text-xl font-semibold text-gray-800 line-through mr-2">
                                  ${product?.price}
                                </p>
                                <p className="text-xl font-semibold text-red-600">
                                  $
                                  {(
                                    product?.price -
                                    (product?.price * product?.discount) / 100
                                  ).toFixed(2)}
                                </p>
                              </>
                            ) : (
                              <p className="text-xl font-semibold text-gray-800">
                                ${product?.price}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="md:w-1/4 p-3 mt-2">
            <AdminMenu />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
