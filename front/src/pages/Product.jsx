import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { listCategory, categoryById } from "./api/Category";
import { listProductOfCategory } from "./api/Product";
import userEcomStore from "./store/Ecom-store";

const Product = () => {
	const { id } = useParams();
	const actionAddtoCart = userEcomStore((state) => state.actionAddtoCart);
	const [category, setCategory] = useState({id: 0, Name: "", images: []});
	const [parameters, setParameters] = useState({sizes: [], colors: []});
	const [products, setProducts] = useState([])

	const getProducts = async () => {
		//products = (await listProductOfCategory(id)).data;
		let products = await listProductOfCategory(id)
		setProducts(products)
		//setProducts(res.data)
		

		let sizes = []
		let colors = []
		for (const p of products) {
			if (!(sizes.includes(p.Size)))
				sizes.push(p.Size)
			if (!(colors.includes(p.Color)))
				colors.push(p.Color)
		}

		setParameters({
			sizes: sizes,
			colors: colors,
			selectedSize: 0,
			selectedColor: 0,
			quantity: 1
		})
	}

	const selectSize = (item) => {
		setParameters({
			sizes: parameters.sizes,
			colors: parameters.colors,
			selectedSize: item,
			selectedColor: parameters.selectedColor,
			quantity: parameters.quantity
		})
	}

	const selectColor = (item) => {
		setParameters({
			sizes: parameters.sizes,
			colors: parameters.colors,
			selectedSize: parameters.selectedSize,
			selectedColor: item,
			quantity: parameters.quantity
		})
	}

	const inputQuantity = (e) => {
		setParameters({
			sizes: parameters.sizes,
			colors: parameters.colors,
			selectedSize: parameters.selectedSize,
			selectedColor: parameters.selectedColor,
			quantity: Number(e.target.value)
		})
	}

	const curProduct = () => {
		//const res = await listProductOfCategory(id);
		let product = products.filter((p) => 
			p.Size == parameters.sizes[parameters.selectedSize] &&
			p.Color == parameters.colors[parameters.selectedColor]
		);
		return product[0];
	}

	const addToCart = async () => {
		// const res = await listProductOfCategory(id);
		// let product = res.filter((p) => 
		// 	p.Size == parameters.sizes[parameters.selectedSize] &&
		// 	p.Color == parameters.colors[parameters.selectedColor]
		// )
		actionAddtoCart({...curProduct(), Name: category.Name}, parameters.quantity)
	}
	
	const getCategory = async () => {
		const res = await categoryById(id);
		//setCategory(res.data[0])
		setCategory(res)
	}

	useEffect(() => {
		//getProductOfCategory(id);
		getProducts();
		getCategory();
		
	}, []);

	return (
		<div className="bg-gray-50 p-8">
			<p className="text-2xl font-bold mb-6 text-gray-800">
				{category ? category.Name : ""}
			</p>
			<div className="flex h-screen">
				<div className="w-1/2 aspect-4/3 mr-8">
					{category.images && category.images.length > 0 ? (
					<img
					  src={category.images[0].url}
					  alt={category.Name}
					  className="rounded-md w-full h-32 object-cover hover:scale-110 transition duration-300"
					/>
					) : (
					<div className="w-full h-32 bg-gray-200 rounded-md text-center flex items-center justify-center text-gray-500">
					  No Image
					</div>
					)}
					{/*{item.quantity < 1 && (
					<p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white py-1 px-4 rounded-full text-sm font-bold shadow-lg">
					  สินค้าหมด
					</p>
					)}*/}
				</div>

				<div className="w-1/2 h-fit p-4 bg-white shadow-md ml-8 text-gray-700">
					<p className="block font-semibold mb-2">
						Размер
					</p>
					<div className="flex mb-4">
						{
							parameters.sizes.map((size, item) => 
								<button 
									className={`w-1/4 border-2 ${item==parameters.selectedSize ? "border-blue-500" : "border-gray-500"} rounded-md mr-2`} 
									onClick={() => selectSize(item)}>
									{size}
								</button>
							)
						}
					</div>

					<p className="block font-semibold mb-2">
						Цвет
					</p>
					<div className="flex mb-4">
						{
							parameters.colors.map((color, item) => 
								<button 
									className={`w-1/4 border-2 ${item==parameters.selectedColor ? "border-blue-500" : "border-gray-500"} rounded-md mr-2`} 
									onClick={() => selectColor(item)}>
									{color}
								</button>
							)
						}
					</div>

					<p className="block font-semibold mb-2">
						Количество
					</p>
					<input type="number" className="w-1/4 border-2 border-blue-500 rounded-md px-1 mb-4" onChange={inputQuantity}/>

					<p className="block font-semibold text-xl mb-2">
						Итого {curProduct() ? curProduct().Price * parameters.quantity : 0} ₽
					</p>

					<button className="bg-blue-500 w-1/4 rounded-md text-white p-1 shadow-md hover:bg-blue-700 transition duration-300 mb-4">
						Загрузить макет
					</button>

					<hr/>

					<button className="bg-blue-500 min-w-1/4 rounded-md text-white p-1 shadow-md hover:bg-blue-700 transition duration-300 mt-4" onClick={() => addToCart()}>
						Добавить в корзину
					</button>
				</div>
			</div>
		</div>
	)
}


export default Product;