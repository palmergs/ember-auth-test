import Ember from 'ember';

function wait(promise, delay) {
  return new Ember.RSVP.Promise(function(resolve) {
    setTimeout(function() {
      promise.then(function(result) {
        resolve(result);
      });
    }, delay);
  });
};

export default Ember.Route.extend({
  model: function() {
    var songs = Ember.RSVP.resolve(this.modelFor('bands.band').get('songs'));
    return wait(songs, 1 * 1000);
  },
  actions: {
    createSong: function() {
      var controller = this.controller,
          band = this.modelFor('bands.band');
      var title = controller.get('title');
      var song = this.store.createRecord('song', { title: title, band: band });
      song.save().then(function() {
        controller.set('title', '');
      });
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;
      song.set('rating', rating);
      song.save();
    },
    didTransition: function() {
      var band = this.modelFor('bands.band');
      Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(band.get('name')));
    }
  }
});
