// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// new Neighborhood() - initialized with name. It returns an object that has attributes of id and name
// deliveries() - returns a list of all deliveries placed in a neighborhood
// customers() - returns all of the customers that live in a particular neighborhood
// meals() - returns a unique list of meals that have been ordered in a particular neighborhood (you might want to do this one last)

let neighborhoodID = 0
let mealID = 0
let customerID = 0
let deliveryID = 0


class Neighborhood {
  constructor(name) {
    this.id = ++neighborhoodID;
    this.name = name;
    store.neighborhoods.push(this)
  }

  customers() {
    return store.customers.filter(x => {return x.neighborhoodId === this.id})
  }


//
// class Neighborhood {
//   constructor(name) {
//     this.id = ++neighborhoodId;
//     this.name = name;
//
//     store.neighborhoods.push(this)
//   }
//    // Customer belongs to neighborhood
//    // A neighborhood has many customers through deliveries
//   customers() {
//     return store.customers.filter(customer => {
//       return customer.neighborhood === this.id
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
//       return delivery.neighborhood === this.id
//     })
//   }
// }
//
//
// // new Customer() — should expect to be initialized with a name and a neighborhoodId. It returns an object that has attributes of id, neighborhoodId, and name.
// // deliveries() — returns all of the deliveries that customer has received
// // meals() - returns all meals that a customer has ordered
// // totalSpent() - returns the total amount that the customer has spent on food.
//
//
// class Customer {
//   constructor(name, neighborhoodId) {
//     this.id = ++customerId;
//     this.name = name;
//     if(neighborhood) {
//       this.neighborhoodId = neighborhood.id;
//     }
//
//     store.customers.push(this)
//   }
//   deliveries(){
//     return store.customers.filter(delivery => {
//       return delivery.cutomerId === this.id
//     })
//   }
// }
//
//
// // new Meal() — initialized with title and price. It returns an object that has attributes of title, price, and id. Meal Ids should automatically increment.
// // deliveries() - returns all of the deliveries associated with a particular meal.
// // customers() - returns all of the customers who have had the meal delivered. Be careful not to return the same customer twice if they have ordered this meal multiple times.
// // byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.
//
//
//
// class Meal {
//   constructor(title, price) {
//     this.id = ++mealId;
//     this.title = title;
//     this.price = price;
//
//     store.meals.push(this)
//   }
// }
//
//
// // new Delivery() — initialized with mealId, neighborhoodId, and customerId. It returns an object that has attributes of mealId, neighborhoodId, customerId, and id
// // meal() - returns the meal associated with a particular delivery
// // customer() - returns the customer associated with a particular delivery
// // neighborhood() - returns the neighborhood associated with a particular delivery
//
//
//
// class Delivery {
//   constructor(mealId, neighborhoodId, customerId) {
//     this.id = ++deliverylId;
//     if(meal) {
//       this.mealId = meal.id;
//     }
//     if(neighborhood) {
//       this.neighborhoodId = neighborhood.id;
//     }
//     if(customer) {
//       this.customer = customer.id;
//     }
//     store.deliveries.push(this)
//   }
// }




  meals() {
      const allMeals = this.customers().map(customer => customer.meals());
      const merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

  deliveries() {
    return store.deliveries.filter(x => x.neighborhoodId === this.id)
  }
}


class Meal {
  constructor(title, price) {
    this.id = ++mealID
    this.title = title
    this.price = price
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter(x => x.mealId === this.id)
  }

  // customers() {
  //   return store.customers.filter(x => x.mealId === this.id)
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
  constructor(name, neighborhoodID){
    this.id = ++customerID
    this.name = name
    this.neighborhoodId = neighborhoodID
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


class Delivery {
  constructor(mealID, neighborhoodID, customerID,){
    this.id = ++deliveryID
    this.mealId = mealID
    this.neighborhoodId = neighborhoodID
    this.customerId = customerID
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
