const token = JSON.parse(localStorage.getItem("token"));
export const fetchMyOrders = async () => {
  try {
    const res = await fetch(`${API_URL}/get-myorders`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.success) {
      return data.orders;
    } else {
      console.log("Error with getting orders");
    }
  } catch (error) {
    console.log("Error :", error);
  }
};
export const fetchOrderById = async (orderId) => {
  try {
    const res = await fetch(`${API_URL}/get-order-id/${orderId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (data.success) {
      return data.order;
    } else {
      console.log("Error with getting order");
    }
  } catch (error) {
    console.log("Error :", error);
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    // const res = await fetch(`${API_URL}/order-id/${orderId}`, {
    const res = await fetch(`${API_URL}/order-id`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ orderId }),
    });
    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Error :", error);
  }
};
