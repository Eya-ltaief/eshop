const express = require ("express")
const data = require ('./data')

app.use(express.static('public'))
app.get('/api/products', (req,res)=>{
    res.send(data.products)
})



app.get('/api/products/slug/:slug', (req,res)=>{
    const product = data.products.find(x => x.slug===req.params.slug)
    if(product){
        res.send(product)
    }
    else{
        res.status(404).send({message: 'not found'})
    }
    res.send(data.products)
})

const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`serve at http://localhost:${port}`)
})