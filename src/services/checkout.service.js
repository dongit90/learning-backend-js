'use strict'

const { findCardById } = require("../models/repositories/cart.repo")
const { BadRequestError, ConflictRequestError } = require("../core/error.response")
const { queryProduct, checkProductByServer } = require("../models/repositories/product.repo")
const { product } = require("../models/product.model")
const { aquireLock, releaseLock } = require("./redis.service")
const orderModel = require("../models/order.model")
class CheckoutService {
    static async checkoutReview({
        cardId, userId, shop_order_ids
    }){
        const foundCart = await findCardById(cardId)
        if (!foundCart) throw new BadRequestError('Cart does not exitsed')
    

        const checkout_order = {
            totalPrice: 0,
            freeShip : 0,
            totalDiscount: 0,
            totalCheckout: 0
        }, shop_order_ids_new = []
        
        for (let i = 0; i < shop_order_ids.length; i++){
            const {shopId, shop_discounts = [], item_products = []} = shop_order_ids[i]
            //chck san pham gia
            const checkProductServer = await checkProductByServer(item_products)
            console.log(`Check product server`, checkProductServer)
            //if (!checkProductServer[0]) BadRequestError('Invalid data') 

            const checkoutPrice = checkProductServer.reduce((acc, product) => {
                return acc + (product.quantity * product.price)
            }, 0)

            checkout_order.totalPrice =+ checkoutPrice
            const itemCheckout = {
                shopId, 
                shop_discounts,
                priceRaw: checkoutPrice, // tien truoc khi giam gia
                priceApplyDiscount: checkoutPrice,
                item_products: checkProductServer
            }
        }
        shop_order_ids_new.push(itemCheckout)
        return {
            shop_order_ids,
            shop_order_ids_new,
            checkout_order
        }
    }

    static async orderByUser({
        shop_order_ids_new, 
        cardId, userId, user_address = {}, user_payment = {}
    }){
        const {shop_order_ids_new, checkout_order} = await CheckoutService.checkoutReview(cardId, userId, shop_order_ids)

        //check lai mot lan nua xem co vuot ton kho hay khong
        const products = shop_order_ids_new.flatMap(order => order.item_products);
        console.log("product", products)
        const aquireProduct = []
        for (let i = 0; i < products.length; i++ ){
            const {productId, quantity} = products[i];
            const keyLock = await aquireLock(productId, quantity, cartId)
            aquireProduct.push(keyLock ? true : false)
            if (keyLock){
                await releaseLock(keyLock)
            }
        }

        //check if 
        if (aquireProduct.includes(false)){
            throw new BadRequestError('product updated')
        }

        const newOrder = await orderModel.create({
            order_userId: userId,
            order_checkout: checkout_order,
            order_shipping: user_address,
            order_payment: user_payment,
            order_products: shop_order_ids_new
        })

        //remove product in cart
        if (newOrder){

        }
    }

    static async getOrderByUser(){
        
    }
}

module.exports = CheckoutService
