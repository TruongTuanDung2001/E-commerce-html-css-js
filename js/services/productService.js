const API_URL = "http://localhost:3000/products";

async function getProducts(){
    try {
        const response = await fetch(API_URL);

        if(!response.ok){ 
            throw new Error("Failed to fetch product");
        }

        const products = await response.json();

        console.log(products);
        
        return products;
    } catch (error) {
        console.log("Error: ", error);
        return [];
    }
}

getProducts();