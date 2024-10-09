import axios from "axios";
import { Product } from "./definitions";

const URL = "https://fakerapi.it/api/v2/products";

export async function getProducts() {
    try {
        const resp = await axios.get(URL, {
            params: {
                _quantity: 1000,
                _taxes: 10,
                _category_type: "uuid",
            }
        })
        return resp.data.data as Product[];
    } catch (error) {
        throw error;
    }
}

export async function putProduct(product: Product) {
    try {
        const resp = await axios.put(`${URL}/${product.id}`, product);
        return resp;
    } catch (error) {
        throw error;
    }
}

export async function postProduct(product: Product) {
    try {
        const resp = await axios.post(URL, product)
        return resp;
    } catch (error) {
        throw error;
    }
}

export async function deleteProduct(id: number) {
    try {
        const resp = await axios.delete(`${URL}/${id}`);
        return resp;
    } catch (error) {
        throw error;
    }
}