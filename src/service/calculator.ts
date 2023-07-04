import {Food} from '../internal/domain/food'
import {FoodRepository} from '../internal/port/repository'
import {FoodCalculatorService} from '../internal/port/service'

export class FoodCalculator implements FoodCalculatorService {
    private foodRepository: FoodRepository

    constructor(foodRepository: FoodRepository) {
        this.foodRepository = foodRepository
    }

    getPrice = (foods: Food[]): number => {
        return foods.reduce((sum: number, food: Food) => {
            let price = sum + this.foodRepository.getPrice(food)
            price = Math.round((price + Number.EPSILON) * 100) / 100
            return price
        }, 0)
    }

}