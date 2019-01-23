const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateExperienceInput(data) {
     let errors = {};

     data.bio = !isEmpty(data.bio) ? data.bio : '';
    

     if (Validator.isEmpty(data.bio)) {
          errors.bio = 'Bio field is required';
     }
     

     return {
          errors,
          isValid: isEmpty(errors)
     };
};