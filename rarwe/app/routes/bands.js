import Ember from 'ember';

function wait(promise, delay) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
}

export default Ember.Route.extend({
  model: function() { 
    var bands = this.store.findAll('band');
    return wait(bands, 3 * 1000);
  },
  actions: {
    createBand: function() {
      var route = this,
          controller = route.get('controller');
      var props = controller.getProperties('name');
      var band = route.store.createRecord('band', props);
      band.save().then(function() {
        controller.set('name', '');
        route.transitionTo('bands.band.songs', band);
      });
    },
    didTransition: function() {
      Ember.$(document).attr('title', 'Bands - Rock and Roll');
    }
  }
});
