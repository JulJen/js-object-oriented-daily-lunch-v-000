// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0


class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(customer => {
      return customer.neighborhoodId === this.id
    });
  }

  // returns a list of all deliveries placed in a neighborhood
  deliveries() {
   return store.deliveries.filter(x => x.neighborhoodId === this.id)
  }

  // returns a unique list of meals that have been ordered in a particular neighborhood
  //(you might want to do this one last)
  meals() {
    const customerMeals = this.customers().map(customer => customer.meals());
    const allMeals = [].concat.call([], customerMeals);
    return [...new Set(merged)];
  }
}




class Customer {
  constructor(name, neighborhoodId){
    this.id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(x => x.meal())
  }

  totalSpent() {
    return this.meals().reduce((a,b) => a += b.price, 0)
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.mealId === this.id)
  }


  customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }


  static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}



class Delivery {
  constructor(mealId, neighborhoodId, customerId,){
    this.id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId)
  }

}
