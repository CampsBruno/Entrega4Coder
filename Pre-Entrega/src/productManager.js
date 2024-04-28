import fs from "fs";

let products = [];
let pathFile = "./src/data/products.json";



// Obtiene todos los productos, con la opción de asignar un límite
const getProducts = async (limit) => {
  try {
    // Leer el archivo JSON de productos
    const productsJson = await fs.promises.readFile(pathFile, "utf8");
    
    // Parsear el JSON a un array de productos
    const products = JSON.parse(productsJson) || [];

    // Verificar si se ha especificado un límite
    if (!limit) {
      // Si no hay límite, retornar todos los productos
      return products;
    } else {
      // Si se especificó un límite, retornar una porción de los productos
      return products.slice(0, limit);
    }
  } catch (er) {
    // Manejar cualquier error que ocurra durante el proceso
    console.error('Error al obtener los productos:', er);
    throw er; // Re-lanzar el error para que sea manejado externamente si es necesario
  }
};




// busca dentro de los productos hasta encontrar el  que se indica
const getProductById = async (id) => {
  try {
    const productos = await getProducts();  // obtengo los productosd
    console.log(productos);
    const productId = parseInt(id); // Convertir el ID a un número
    const product = productos.find((producto) => producto.id === productId);  // busco si se encuentra el producto solicitado
    if (!product) {
      console.log(`No se encontró el producto con el id ${id}`); 
      return;
    }

    console.log(product);
    return product;
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
  }
};



//Agrego productos
const addProduct = async (product) => {
  const { title, description, price, thumbnail, code, stock } = product;
  await getProducts();
  const newProduct = {
    id: products.length + 1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
  };

  if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
  }

  const productExists = products.find((product) => product.code === code);
  if (productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe`);
    return;
  }

  products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
};










export default {
  addProduct,
  getProductById,
  getProducts,
};
