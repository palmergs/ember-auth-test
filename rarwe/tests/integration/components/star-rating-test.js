import Ember from 'ember';
import { 
  moduleForComponent, 
  test 
} from 'ember-qunit';

moduleForComponent('star-rating', 'Integration | Component | star rating', {
//  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  var component = this.subject();
  assert.equal(component._state, 'preRender');

  this.append();
  assert.equal(component._state, 'inDOM');
});

test('Renders the full and empty stars correctly', function(assert) {
  assert.expect(4);

  var component = this.subject();
  Ember.run(function() {
    component.setProperties({
      rating: 4,
      maxRating: 5
    });
  });

  assert.equal(this.$().find('.glyphicon-star').length, 4, "Full stars are rendered");
  assert.equal(this.$().find('.glyphicon-star-empty').length, 1, "Empty stars are rendered");

  Ember.run(function() {
    component.set('maxRating', 10);
  });

  assert.equal(this.$().find('.glyphicon-star').length, 4, "Full stars are redered with max of 10");
  assert.equal(this.$().find('.glyphicon-star-empty').length, 6, "Empty stars are rendered with max of 10");
});
