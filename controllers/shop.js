const {Product , getProductsFromFile} = require('../models/product')

exports.getProducts = (req, res, next) => {
    Product.fetchAll( products => {
        res.render('shop/product-list', {
            prods:products,
            pageTitle: '全部商品',
            path: '/products'
        })
    })
}

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods: products,
            pageTitle: '商店',
            path: '/'
        })
    })
}

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path:'/cart',
        pageTitle: '購物車'
    })
}

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: '你的訂單'
    })
}


exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: 'checkout',
        pageTitle: '結帳'
    })
}