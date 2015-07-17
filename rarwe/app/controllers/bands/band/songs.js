import Ember from 'ember';
import { capitalizeWords } from '../../../helpers/capitalize-words';

export default Ember.Controller.extend({
  needs: [ 'bands/band' ],

  queryParams: {
    sortBy: 'sort',
    searchTerm: 's',
  },

  sortBy: 'ratingDesc',
  sortProperties: Ember.computed('sortBy', function() {
    var options = {
      "ratingDesc": "rating:desc,title:asc",
      "ratingAsc": "rating:asc,title:asc",
      "titleDesc": "title:desc",
      "titleAsc": "title:asc"
    };
    return options[this.get('sortBy')].split(',');
  }),
  sortedSongs: Ember.computed.sort('matchingSongs', 'sortProperties'),

  songCreationStarted: false,
  canCreateSong: Ember.computed('songCreationStarted', 'model.length', function() {
    return this.get('songCreationStarted') || this.get('model.length');
  }),
  noSongs: Ember.computed('model.length', function() {
    return this.get('model.length') === 0;
  }),
  newSongPlaceholder: Ember.computed('controllers.bands/band.model.name', function() {
    var band = this.get('controllers.bands/band.model');
    return "New %@ song".fmt(capitalizeWords(band.get('name')));
  }),

  searchTerm: '',
  matchingSongs: Ember.computed('model.@each.title', 'searchTerm', function() {
    var term = this.get('searchTerm').toLowerCase();
    return this.get('model').filter(function(song) {
      return song.get('title').toLowerCase().indexOf(term) !== -1;
    });
  }),

  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    },
    setSorting: function(option) {
      this.set('sortBy', option);
    }
  }
});
