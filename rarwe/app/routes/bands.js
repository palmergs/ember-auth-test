import Ember from 'ember';

export default Ember.Route.extend({
  model: function() { 
    return this.store.findAll('band');
  },
  actions: {
    createBand: function() {
      var name = this.get('controller').get('name');
      var band = store.createRecord({ name: name });
      bands.pushObject(band);
      this.get('controller').set('name', '');
      this.transitionTo('bands.band.songs', band);
    },
    didTransition: function() {
      Ember.$(document).attr('title', 'Bands - Rock and Roll');
    }
  }
});
