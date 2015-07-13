/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  schema: true,
  attributes: {
    username: {
      type: 'string',
      required: true
    },
    email: {
      type: 'string',
      email: true,
      required: true
    },
    password: {
      type: 'string',
      required: true
    },
    confirm_password: {
      type: 'string',
      required: true
    },
    _csrf: {
      type: 'string'
    },
    encryptedPassword: {
      type: 'string'
    },
    //Custom attr method
    //toJSON : return JSON object to client
    toJSON: function () {
      var obj = this.toObject();
      delete obj.password;
      delete obj.confirm_password;
      delete obj.encryptedPassword;
      delete obj._csrf;
      return obj;
    }
  }
};

