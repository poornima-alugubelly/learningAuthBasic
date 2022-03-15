import axios from "axios";
import { useEffect, useState, useContext } from "react";

import { loginSignup } from "../App";
const Cart = () => {
	const { token } = useContext(loginSignup);
	useEffect(() => getCart(token, setProducts), []);
	const [products, setProducts] = useState([]);
	return (
		<ul>
			{products.map((item) => (
				<li>{item.title}</li>
			))}
		</ul>
	);
};

const getCart = async (token, setProducts) => {
	const res = await axios.get(
		"/api/products",
		{},
		{ headers: { "content-type": "text/json", authorization: `${token}` } }
	);
	setProducts(res.data.products);
};

export { Cart };
