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
});

userSchema.pre('save', function(next) {
  const {password} = this;
  bcrypt.hash(password, SALT_WORK_FACTOR)
    .then(hashed => this.password = hashed)
    .then(() => next())
    .catch(err => console.log(err));
});

userSchema.methods.comparePassword = function(plaintextPassword) {
  // console.log('this.password: ', this.password)
  // console.log('plain password: ', plaintextPassword)
  // let result = bcrypt.compare(plaintextPassword, this.password);
  // console.log(result);
  return bcrypt.compare(plaintextPassword, this.password);
  // bcrypt.compare(plaintextPassword, this.password, (err, res) => {
  //   if(err) {
  //     console.log('not going through ', err);
  //   }
  //   if (res) {
  //     console.log('comparison result ', res);
  //     return res;
  //   } else {
  //     return 0;
  //   }
  // });
};

module.exports = mongoose.model('User', userSchema);