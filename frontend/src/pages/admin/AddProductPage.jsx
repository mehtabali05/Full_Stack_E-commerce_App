import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import toast from 'react-hot-toast';
import { assets, categories } from '../../assets/assets';
import useDocumentTitle from '../../hooks/useDocumentTitle';


const AddProduct = () => {
    useDocumentTitle('Add Product | Admin');
  const {navigate,axios,fetchBooksData} = useContext(AppContext);
  const [file,setFile] = useState(false);
  const [bookData,setBookData] = useState({
    title: "",
    author: "",
    price: "",
    offerPrice: "",
    rating: "",
    reviews: "",
    description: "",
    category: "",
    image: null
  }); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const formData = new FormData();
        formData.append("image",file);
        formData.append("title",bookData.title);
        formData.append("author",bookData.author);
        formData.append("price",bookData.price);
        formData.append("offerPrice",bookData.offerPrice);
        formData.append("rating",bookData.rating);
        formData.append("reviews",bookData.reviews);
        formData.append("description",bookData.description);
        formData.append("category",bookData.category);

        const {data} = await axios.post("/book/add",formData,{
            headers: { "Content-Type": "multipart/form-data" }
        });
        if(data.success){
            toast.success(data.message);
            fetchBooksData();
            navigate("/admin");
            window.scrollTo({top:0,behavior:"smooth"})
        }else{
            toast.error(data.message);
        }
    } catch (error) {
        toast.error(error.response?.data?.message || error.message);
    }
  }
  return (
    <div className="py-10 flex flex-col justify-between bg-white">
            <form onSubmit={handleSubmit}  className="md:p-10 p-4 space-y-5 max-w-lg">
                <div>
                    <p className="text-base font-medium">Product Image</p>
                    <div className="flex items-center gap-3 mt-2">
                        <label htmlFor="image">
                          <input type="file" accept='image/*'
                          onChange={(e) => setFile(e.target.files[0])} 
                          id='image'
                          name='image' 
                          hidden />
                          <img 
                          className='max-w-24 cursor-pointer'
                          src={file ? URL.createObjectURL(file) : assets.upload_area} 
                          alt="uploadArea"
                          height={100}
                          width={100} />

                        </label>
                    </div>
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Book Name</label>
                    <input value={bookData.title} name='title' autoComplete='title'
                    onChange={(e) => setBookData({...bookData,title: e.target.value})}
                    id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-name">Book Author</label>
                    <input value={bookData.author} name='author' autoComplete='author'
                    onChange={(e) => setBookData({...bookData,author: e.target.value})}
                    id="product-name" type="text" placeholder="Type here" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                </div>
                <div className="flex flex-col gap-1 max-w-md">
                    <label className="text-base font-medium" htmlFor="product-description">Book Description</label>
                    <textarea value={bookData.description} name='description' autoComplete='description'
                    onChange={(e) => setBookData({...bookData,description: e.target.value})} 
                    id="product-description" rows={4} className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none" placeholder="Type here" required></textarea>
                </div>
                <div className="w-full flex flex-col gap-1">
                    <label className="text-base font-medium" htmlFor="category">Category</label>
                    <select value={bookData.category} name='category'
                    onChange={(e) => setBookData({...bookData,category: e.target.value})} autoComplete='category'
                    id="category" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required>
                        <option value="">Select Category</option>
                        {categories.map((item, index) => (
                            <option key={index} value={item.name}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="product-price">Book Price</label>
                        <input 
                        value={bookData.price} name='price' autoComplete='price'
                        onChange={(e) => setBookData({...bookData,price: e.target.value})} 
                        id="product-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Offer Price</label>
                        <input value={bookData.offerPrice} name='offerPrice' autoComplete='offerPrice'
                          onChange={(e) => setBookData({...bookData,offerPrice: e.target.value})} 
                          id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Rating</label>
                        <input value={bookData.rating} name='rating' autoComplete='rating'
                          onChange={(e) => setBookData({...bookData,rating: e.target.value})} 
                          id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    <div className="flex-1 flex flex-col gap-1 w-32">
                        <label className="text-base font-medium" htmlFor="offer-price">Reviews</label>
                        <input value={bookData.reviews} name='reviews' autoComplete='reviews'
                          onChange={(e) => setBookData({...bookData,reviews: e.target.value})} 
                          id="offer-price" type="number" placeholder="0" className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40" required />
                    </div>
                    
                </div>
                <button className="px-8 py-2.5 cursor-pointer bg-primary text-white font-medium rounded">ADD</button>
            </form>
    </div>
  )
}

export default AddProduct