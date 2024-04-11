'use strict'

const app = require("../app")
const { BadRequestError } = require("../core/error.response")
const discount = require("../models/discount.model")
const { checkDicountExists } = require("../models/repositories/discount.repo")
const { queryProduct } = require("../models/repositories/product.repo")
const { convertToObjectIdMongoDb } = require("../utils")
const { findAllPublicForShop } = require("./product.service")

class DiscountService{
    static async createDiscountCode(payload){
        const {
            code, start_date, end_date, is_active,
            shopId, min_order_value, product_ids, applies_to, name, description,
            type, value, max_value, max_uses, uses_count, max_uses_per_user
        } = payload
        //kiem tra
        if (new Date < new Date(start_date)){
            throw new BadRequestError('Discount code has expired')
        }

        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongoDb(shopId)
        })

        if (foundDiscount && foundDiscount.discount_is_active){
            throw new BadRequestError('Existed dicount code')
        }

        const newDiscount = await discount.create({
            discount_name: name,
            discount_description: description,
            discount_type: type, //percentage
            discount_value: value,
            discount_code: code,
            discount_start_date: new Date(start_date),
            discount_end_date: new Date(end_date),
            discount_max_uses: max_uses,
            discount_uses_count: uses_count,    
            discount_max_uses_per_user: max_uses_per_user,
            discount_min_order_value: min_order_value || 0,
            discount_shopId: convertToObjectIdMongoDb(shopId),
            discount_is_active: is_active,
            discount_applies_to: applies_to,
            discount_product_ids: applies_to === 'all' ? [] : product_ids
        })

        return newDiscount
    }

    static async updateDiscountCode(){

    }

    static async getAllDiscountCodesWithProduct({
        code, shopId, userId, limit, page
    }){
        const foundDiscount = await discount.findOne({
            discount_code: code,
            discount_shopId: convertToObjectIdMongoDb(shopId)
        }).lean()
        if (!foundDiscount ){
            throw new BadRequestError('Dicount not found')
        }
        console.log("foundDiscount", foundDiscount)
        const {discount_applies_to, discount_product_ids} = foundDiscount
        var products
        if (discount_applies_to === 'all'){ 
            products = await queryProduct({
                filter: {
                    product_shop: convertToObjectIdMongoDb(shopId),
                    isPublic: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime'
            })
        }


        if (discount_applies_to === 'specific'){
            products = await queryProduct({
                filter: {
                    _ids: {$in: discount_product_ids},
                    product_shop: convertToObjectIdMongoDb(shopId),
                    isPublic: true
                },
                limit: +limit,
                page: +page,
                sort: 'ctime'
            })
        }
        return products
    }

    static async getDiscountAmount({
        codeId, userId, shopId, products
    }){
        const foundDiscount = await checkDicountExists({
            discount_code: code,
            discount_shopId: convertToObjectIdMongoDb(shopId)
        })
        if (foundDiscount && foundDiscount.discount_is_active){
            throw new BadRequestError('Existed dicount code')
        }

        const amount = discount_type === 'fixed_amount' ? discount_value : 1000
        return amount
    }
}

module.exports = DiscountService