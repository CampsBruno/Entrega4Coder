import Router from "express";
import productManager from "../managers/productManager.js" 

const router= Router();


// Obtener todos los prodyuctos
router.get("/", async (req,res)=>{
    try{
      
        const {limit} = req.query; // desesctructuramos la query que viene con el vcalor de limit
        const products = await productManager.getProducts();
        res.status(200).json(products);

    }catch(error){
        console.log(error);
}});


//   Pedir productos por ID
router.get("/:pid", async (req,res)=>{
    try{
        const {pid} = req.params; // obrengo los parametros de la ruta, en este caso el /products/:PID el pid
        const products =await productManager.getProductById(pid)  // await clave para que lo devuelva
        res.status(200).json(products)
    }catch(error){

    };
})

//Agregar Producto
router.post("/", async (req,res)=>{
    try{
        const producto = req.body
        
       const validador = await productManager.addProduct(producto)
       
      if(validador) { res.status(200).json(producto)
      } else {
        res.status(401).json({message: "Todos los campos del producto son obligatorios o Ya existe el codigo del producto"})
        }

    }catch (error){
        console.log(error)
    }
})


//Borrar produrcto
router.delete("/:pid", async (req,res)=>{
    try{
        const {pid} = req.params
        const deleteProduct = productManager.deleteProduct(pid)
        res.status(202).json({message: `Producto ${pid} Eliminado Correctamente`})

    }catch(error){
        console.log(error)
    }
});


// Actualizar Producto
router.put("/:pid", async (req,res)=>{
    try{
    const {pid} = req.params
    const producto = req.body;
    const updateProduct =  await productManager.updateproduct(pid, producto)
    
    res.status(201).json({message: `Producto n° ${pid} Actualizado`})
    }catch(error){
        console.log(error)
    }

});









export default router;


