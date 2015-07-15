import Ember from 'ember';
import Song from '../../../models/song';

export default Ember.Route.extend({
  model: function() {
    return this.modelFor('bands.band').get('songs');
  },
  actions: {
    createSong: function() {
      var controller = this.get('controller');
      var band = this.modelFor('bands.band');
      var title = controller.get('title');

      var song = this.store.createRecord({ title: title, band: band });
      band.get('songs').pushObject(song);
      controller.set('title', '');
    },
    updateRating: function(params) {
      var song = params.item,
          rating = params.rating;
      song.set('rating', rating);
    },
    didTransition: function() {
      var band = this.modelFor('bands.band');
      Ember.$(document).attr('title', '%@ songs - Rock & Roll'.fmt(band.get('name')));
    }
  }
});
