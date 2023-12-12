const fs = require('fs')
const path = require('path')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
)

const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(fileContent));// return an array
        //console.log(JSON.parse(fileContent))
    }
    });
  };



class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title
        this.imageUrl = imageUrl
        this.description = description
        this.price = price
    }

    save_to_file() {
        getProductsFromFile(products => {
            products.push(this)
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log(err)
            })
        })
    }
    
    static fetchAll(callback) {
        getProductsFromFile(callback)
    }
}

module.exports = {
    getProductsFromFile: getProductsFromFile
    , Product: Product
}

