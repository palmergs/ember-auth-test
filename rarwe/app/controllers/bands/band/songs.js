import Ember from 'ember';

export default Ember.Controller.extend({
  songCreationStarted: false,
  canCreateSong: Ember.computed('songCreationStarted', 'model.length', function() {
    return this.get('songCreationStarted') || this.get('model.length');
  }),
  noSongs: Ember.computed('model.length', function() {
    return this.get('model.length') === 0;
  }),
  actions: {
    enableSongCreation: function() {
      this.set('songCreationStarted', true);
    }
  }
});
