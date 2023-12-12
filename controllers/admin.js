const { error } = require('console')
const {Product, getProductsFromFile} = require('../models/product')
const fs = require('fs')


const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
)
exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
        pageTitle: '新增商品',
        path: '/admin/add-product',
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true
    })
}

exports.postAddProduct = (req,res, next) => {

    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const price = req.body.price
    const description = req.body.description
    const product = new Product(title, imageUrl, description, price)
    product.save_to_file()
    res.redirect('/')
}

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        //console.log(products)
        res.render('admin/products', {
            prods: products,
            pageTitle: 'Admin Products',
            path: '/admin/products'
        })
    })
}

exports.deleteProducts = (req, res, next) => {
    console.log("delete it")
    let title = req.body.title
    //console.log(title)
    getProductsFromFile(products => {
        
    let newproducts = products.filter( x => x.title !== title)
    //roducts.pop()
    fs.writeFileSync(p, JSON.stringify(newproducts), err => {
        if(err) {
            console.log(err)
        } else {
            console.log('success')
        }
    })
    // res.render('admin/products', {
    //     prods: products,
    //     pageTitle: 'Admin Products',
    //     path: '/admin/products'
    // })
    })
    res.redirect('/admin/products')
   
}

