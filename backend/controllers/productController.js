export const getAllProducts = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "List of products",
    products: [
      { id: 1, name: "Product 1", price: 100 },
      { id: 2, name: "Product 2", price: 200 },
      { id: 3, name: "Product 3", price: 300 },
    ],
  });
}

export const createProduct = async (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      success: false,
      message: "Name and price are required",
    });
  }

  // Simulate product creation
  const newProduct = {
    id: Date.now(),
    name,
    price,
  };

  res.status(201).json({
    success: true,
    message: "Product created successfully",
    product: newProduct,
  });
}