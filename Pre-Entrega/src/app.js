import express from "express";
 import productManager from "./managers/productManager.js";
import router from "./routes/index.js"




const app = express();
const port= 8080

app.use(express.json());
app.use(express.urlencoded({extended: true}));



app.use("/api",router)


// PRUEBAS
app.get("/test", async (req,res)=>{

    const prueba = await productManager.RefreshPropducts()
    res.status(200).json(prueba)
    console.log(prueba)
})


app.listen(port,()=>{
console.log(`Escuchando en el puero ${port}`);
});