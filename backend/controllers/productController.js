import {sql} from "../config/db.js";

export const getProducts = async (req, res) => {
  try {
    const produccts = await sql`
      SELECT * FROM products
      ORDER BY created_at DESC
    `

    console.log("fetched products", produccts)
    return res.status(200).json({success: true, data: produccts})
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({success: false, message: "Internal Server Error"})
  }
  
}

export const getProduct = async (req, res) => {
  const { id } = req.params;

  try{
    const product = await sql`
      SELECT * FROM products
      WHERE id = ${id}
    `;

    if (product.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: product[0], 
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;
  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and image are required",
    });
  }
  
  try {
    const newProduct = await sql`
      INSERT INTO products (name, image, price)
      VALUES (${name}, ${image}, ${price})
      RETURNING *
    `;
    console.log("new product", newProduct);
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct[0], // Assuming the returned value is an array
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Name, price, and image are required",
    });
  }
  try {
    const updatedProduct = await sql`
      UPDATE products
      SET name = ${name}, image = ${image}, price = ${price}
      WHERE id = ${id}
      RETURNING *
    `;

    if (updatedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct[0], 
    });

  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

}
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *
    `;

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct[0], 
    });

  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }


}
