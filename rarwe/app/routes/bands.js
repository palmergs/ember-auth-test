import Ember from 'ember';

export default Ember.Route.extend({
  model: function() { 
    return this.store.findAll('band');
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
