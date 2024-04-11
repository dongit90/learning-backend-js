'use strict'

const cartModel = require("../models/cart.model")
const { BadRequestError } = require("../core/error.response");

class CartService{

    static async createUserCart({userId, product}){
        const query = {cart_userId: userId, cart_state: 'active'},
        updateOrInsert = {
            $addToSet: {
                cart_products: product
            }
        }, options = {upsert: true, new: true}
        return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }

    static async addToCart({userId, product = {}}){
        const userCart = await cartModel.findOne({cart_userId: userId})
        if (!userCart){
            // create card for User
            return await CartService.createUserCart({userId, product})
        }

        if (!userCart.cart_products.length){
            userCart.cart_products = [product]
            return await userCart.save()
        }

        //gio hang ton tai update gio hang
        return await CartService.updateUserCartQuantity({userId, product})
    }

    static async updateUserCartQuantity({userId, product = {}}){
        const {productId, quantity} = product;
        const query = {
            cart_userId: userId,
            'card_products.productId' : productId,
            cart_state: 'active'
        }, updateSet = {
            $inc: {
                'cart_products.$.quantity': quantity
            }
        }, options = {upsert: true, new: true}
    }

    //update cart
    /*
    shop_order_ids:[
        shopId, 
        item_products: [

        ],
        version
    ]
    */

    static async addToCartV2({userId, product = {}}){
        const {productId, quantity, old_quantity} = shop_order_ids[0]?.item_products[0]
        //check product

        if (quantity === 0){
            //deleted
        }

        return await CartService.updateUserCartQuantity({
            userId,
            product:{
                productId,
                quantity: quantity
            }
        })
    }

    static async deleteUserCart({userId, productId}){
        const query = {
            cart_userId: userId,
            'card_products.productId' : productId,
            cart_state: 'active'
        }
        updateSet = {
            $pull: {
                cart_products : {
                    productId
                }
            }
        }

        const deleteCart = cartModel.updateOne(query, updateSet)
        return deleteCart
    } 

    static async getListUserCart({userId}){
        return await cartModel.findOne({
            cart_userId: +userId
        }).lean()
    }
}

module.exports = CartService