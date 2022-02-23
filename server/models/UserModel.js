const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipeSchema = require('./RecipeModel');

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
  firstName: {type: String, required: true},
  username: {type: String, required: true},
  password: {type: String, required: true},
  preferDarkMode: {type: Boolean},
  recipes : [{ type: Schema.Types.ObjectId, ref: 'recipe' }]
  // recipes : [recipeSchema]
});

userSchema.pre('save', function(next) {
  const {password} = this;
  bcrypt.hash(password, SALT_WORK_FACTOR)
    .then(hashed => this.password = hashed)
    .then(() => next())
    .catch(err => console.log(err));
});

module.exports = mongoose.model('User', userSchema);