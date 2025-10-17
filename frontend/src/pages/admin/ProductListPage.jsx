import { useContext, useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import toast from "react-hot-toast";

const ProductList = () => {  

    useDocumentTitle('Products | Admin');
    const {booksData,fetchBooksData,axios} = useContext(AppContext); 

    

    const handleDelete = async (productId) => {
        try {
            const {data} = await axios.delete(`/book/delete-book/${productId}`);
            // console.log("Product Id",productId);
            if(data?.success){
                toast.success("Book deleted successfully");
                fetchBooksData();
            }else{
                toast.error(data.message || "Failed to delete the book");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
  } 

  return (
      <div className="flex-1 py-10 flex flex-col justify-between">
          <div className="w-full md:p-10 p-4">
              <h2 className="pb-4 text-lg font-medium">All Products</h2>
              <div className="adminProductLists flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                  <table className="md:table-auto table-fixed w-full overflow-hidden">
                      <thead className="text-gray-900 text-sm text-left">
                          <tr>
                              <th className="px-4 py-3 font-semibold truncate">Product</th>
                              <th className="px-4 py-3 font-semibold truncate">Category</th>
                              <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                              <th className="px-4 py-3 font-semibold truncate text-center">Actions</th>
                              
                          </tr>
                      </thead>
                      <tbody className="text-sm text-gray-500">
                          {booksData.map((product) => (
                              <tr key={product._id} className="border-t border-gray-500/20">
                                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                      <div className="border border-gray-300 rounded overflow-hidden">
                                          <img src={`${product.image}`} alt="Product" className="w-16" />
                                      </div>
                                      <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                  </td>
                                  <td className="px-4 py-3">{product.category}</td>
                                  <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                                  <td><span onClick={() => handleDelete(product._id)} className="cursor-pointer hover:underline text-red-700">delete</span></td>
                                  
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  );
};

export default ProductList