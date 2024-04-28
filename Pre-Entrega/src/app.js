import express from "express";
import productManager from "./productManager.js";

const app = express();
const port= 8080

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// Obtengo todos los productos, puedo agregar un limite
app.get("/products", async (req, res) => {
  try {
    const { limit } = req.query;
    const products = await productManager.getProducts(limit);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});


// Obtengo producto por ID
app.get("/products/:pid", async (req, res) => {
  try {
    const { pid } = req.params; // Todos los parámetros siempre vienen en formato string

    const product = await productManager.getProductById(parseInt(pid));

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
});





// Agrego Producto 
app.post('/products', async (req, res) => {
  try {
      await productManager.addProduct(req.body);
      res.status(201).send('Producto creado con éxito');
  } catch (error) {
      res.status(500).send('Error al crear el producto: ' + error.message);
  }
});




app.listen(port, () => {
  console.log("Escuchando el servidor en el puerto ", port);
});
