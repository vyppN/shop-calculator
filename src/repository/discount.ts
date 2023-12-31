import {FoodSet} from '../internal/domain/food'
import {Discountable} from '../internal/port/pricing'

/*
TLDR; We can have N conditions for discounting without if statement on the implementation logic

With the interface, we can implement polymorphism to create various types of discount condition.
We can eliminate if statement that decrease cyclomatic complexity in significant way
and make it follow the L in SOLID - Liskov substitution

And we love dependency injection, right?
 */

export class MembershipDiscount implements Discountable {
    private readonly discountPercent: number

    constructor(discountPercent: number) {
        this.discountPercent = discountPercent
    }

    calculate(foodSet: FoodSet, price: number, amount: number): number {
        return price - (price * (this.discountPercent / 100))
    }
}

export class BuyMoreToDiscount implements Discountable {
    private readonly buyAtLeast: number
    private readonly foodSets: FoodSet[]
    private readonly discountPercent: number

    constructor(buyAtLeast: number, foodSets: FoodSet[], discountPercent: number) {
        this.buyAtLeast = buyAtLeast
        this.foodSets = foodSets
        this.discountPercent = discountPercent
    }

    calculate(foodSet: FoodSet, price: number, amount: number): number {
        if(amount < this.buyAtLeast + 1) return price
        if(this.foodSets.indexOf(foodSet) < 0) return price
        return price - (price * (this.discountPercent / 100))
    }

}