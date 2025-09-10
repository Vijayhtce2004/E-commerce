export const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      return data.products;
    } else {
      console.log("Error with getting products");
    }
  } catch (error) {
    console.log("Error :", error);
  }
};
export const fetchProductById = async (slug) => {
  try {
    const res = await fetch(`${API_URL}/product?slug=${slug}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (data.success) {
      return data.product;
    } else {
      console.log("Error with getting product");
    }
  } catch (error) {
    console.log("Error :", error);
  }
};
