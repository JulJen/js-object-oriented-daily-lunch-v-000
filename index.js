// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// new Neighborhood() - initialized with name. It returns an object that has attributes of Id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

let neighborhoodId = 0
let mealId = 0
let customerId = 0
let deliveryId = 0


class Neighborhood {
  constructor(name) {
    this.Id = ++neighborhoodId;
    this.name = name;
    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(x => {
      return x.neighborhoodId === this.Id
    });
  }

  meals() {
      const customerMeals = this.customers().map(customer => customer.meals());
      const allMeals = [].concat.apply([], customerMeals);
      return [...new Set(merged)];
    }

  deliveries() {
    return store.deliveries.filter(x => x.neighborhoodId === this.Id)
  }
}


//
// class Neighborhood {
//   constructor(name) {
//     this.Id = ++neighborhoodId;
//     this.name = name;
//
//     store.neighborhoods.push(this)
//   }
//    // Customer belongs to neighborhood
//    // A neighborhood has many customers through deliveries
//   customers() {
//     return store.customers.filter(customer => {
//       return customer.neighborhood === this.Id
//     })
//   }
//
//   meals() {
//     const allMeals = this.customers().map(customer => customer.meals());
//     const merged = [].concat.apply([], allMeals);
//     return [...new Set(merged)];
//   }
//
//    // A neighborhood has many deliveries
//   deliveries(){
//     return store.deliveries.filter(delivery => {
//       return delivery.neighborhood === this.Id
//     })
//   }
// }
//
//
// // new Customer() — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of Id, neighborhoodId, and name.
// // deliveries() — returns all of the deliveries that customer has received
// // meals() - returns all meals that a customer has ordered
// // totalSpent() - returns the total amount that the customer has spent on food.
//
//
// class Customer {
//   constructor(name, neighborhoodId) {
//     this.Id = ++customerId;
//     this.name = name;
//     if(neighborhood) {
//       this.neighborhoodId = neighborhood.Id;
//     }
//
//     store.customers.push(this)
//   }
//   deliveries(){
//     return store.customers.filter(delivery => {
//       return delivery.cutomerId === this.Id
//     })
//   }
// }
//
//
// // new Meal() — initialized with title and price. It returns an object that has attributes of title, price, and Id. Meal Ids should automatically increment.
// // deliveries() - returns all of the deliveries associated with a particular meal.
// // customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// // byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
//
//
//
// class Meal {
//   constructor(title, price) {
//     this.Id = ++mealId;
//     this.title = title;
//     this.price = price;
//
//     store.meals.push(this)
//   }
// }
//
//
// // new Delivery() — initialized with mealId, neighborhoodId, and customerId. It returns an object that has attributes of mealId, neighborhoodId, customerId, and Id
// // meal() - returns the meal associated with a particular delivery
// // customer() - returns the customer associated with a particular delivery
// // neighborhood() - returns the neighborhood associated with a particular delivery
//
//
//
// class Delivery {
//   constructor(mealId, neighborhoodId, customerId) {
//     this.Id = ++deliverylId;
//     if(meal) {
//       this.mealId = meal.Id;
//     }
//     if(neighborhood) {
//       this.neighborhoodId = neighborhood.Id;
//     }
//     if(customer) {
//       this.customer = customer.Id;
//     }
//     store.deliveries.push(this)
//   }
// }







class Meal {
  constructor(title, price) {
    this.Id = ++mealId
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.mealId === this.Id)
  }

  // customers() {
  //   return store.customers.filter(x => x.mealId === this.Id)
  // }

  customers() {
      const allCustomers = this.deliveries().map(delivery => delivery.customer());
      return [...new Set(allCustomers)];
    }


  static byPrice() {
      return store.meals.sort((a, b) => a.price < b.price);
    }
}


class Customer {
  constructor(name, neighborhoodId){
    this.Id = ++customerId
    this.name = name
    this.neighborhoodId = neighborhoodId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.customerId === this.Id)
  }

  meals() {
    return this.deliveries().map(x => x.meal())
  }

  totalSpent() {
    return this.meals().reduce((a,b) => a += b.price, 0)
  }
}


class Delivery {
  constructor(mealId, neighborhoodId, customerId,){
    this.Id = ++deliveryId
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(meal => meal.Id === this.mealId)
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.Id === this.neighborhoodId)
  }

  customer() {
    return store.customers.find(customer => customer.Id === this.customerId)
  }

}
