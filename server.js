const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Product = require('./models/productmodel')
app.use(express.json())


//routes
app.get('/', (req, res)=> {
    res.send("Hello World my first api")
})

app.get('/new', (req, res)=> {
    res.send("Hello World my first api in new")
})

//fetch all
app.get('/fetch', async(req, res) => {
    try {
        const fetch = await Product.find({});
        res.status(200).json(fetch)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//fetch one
app.get('/fetchone/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const fetchone = await Product.findById(id);
        res.status(200).json(fetchone)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/update/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we cannot find any product in database
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// delete a product
app.delete('/delete/:id', async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`})
        }
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

// add product
app.post('/add', async(req, res)=>{
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


mongoose.set("strictQuery",false)

mongoose.connect('mongodb+srv://admin:admin123@nodeapi.s80lltv.mongodb.net/node-apiretryWrites=true&w=majority')
.then(()=> {
    console.log(`Connected to MongoDB`)
    app.listen(3001, ()=> {
        console.log("Server is running on port 3001")
    })
}).catch((error)=> {
    console.log(`${error} error connecting to mongodb`)
})