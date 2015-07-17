import Ember from 'ember';

export function capitalizeWords(input/*, hash*/) {
  var words = input.toString().split(/\s+/).map(function(word) {
    return word.toLowerCase().capitalize();
  });
  return words.join(' ');
}

export default Ember.Helper.helper(capitalizeWords);