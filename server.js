import express from "express"
import { PrismaClient } from "@prisma/client"

const app= express()
const prisma = new PrismaClient()

app.use(express.json())
app.use(express.static("public"))


app.get("/", (req, res)=>{
     res.send("Loja perfumaria")
})

/*nessa rota eu estou buscando todos os meus produtos no banco de dados   */
app.get("/produtos", async (req, res)=>{
  const produtos= await prisma.produto.findMany()

   res.status(200).json(produtos)
})


/*nessa rota eu estou criando produtos novos no banco de dados */

app.post("/produtos" , async (req, res)=>{
    const {name , image, price, description}=req.body

  const criacaoDeProdutos= await prisma.produto.create(
        {
          data: {
            name, 
            image, 
            price, 
            description,
          }  
        }
    )
    res.status(201).json(criacaoDeProdutos)
})


/* nessa rota eu estou editado os produtos no banco de dados filtrando o produto pelo id*/

app.put("/produtos/:id", async(req, res)=>{
    const{id}= req.params
    const{name, image, price, description}=req.body

    const alterarProduto= await prisma.produto.update({
          where:{ 
            id
          },
          data:{
            name,
            image,
            price,
            description
          }
    })
    res.status(201).json(alterarProduto)
})


/*nessa rota eu estou deletando um produto do meu banco de dados com id espesifico */

app.delete("/produtos/:id",  async (req,res)=>{
   const {id}= req.params
   const {name, image, price, description}=req.body

   const deletarProdutos= await prisma.produto.delete({
       where:{
        id
       },
       data:{
         name,
         image,
         price,
         description
       }
   })
   res.status(201).json(deletarProdutos)
})


/* nessa rota estou rodando a minha porta */

app.listen(3000, ()=>{
    console.log("Servidor em execução na porta http://localhost:3000/")
})