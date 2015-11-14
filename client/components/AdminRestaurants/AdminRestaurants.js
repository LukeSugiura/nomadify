Template.AdminRestaurants.onCreated(function() {
  var self = this;
  self.autorun(function() {
    self.subscribe('restaurants');
  });
});

Template.AdminRestaurants.helpers({
  restaurants: () => {
    return Restaurants.find();
  }
});