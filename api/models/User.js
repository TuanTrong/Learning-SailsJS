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
    encryptedPassword: {
      type: 'string'
    },
    //Custom attr method
    //toJSON : return JSON object to client
    toJSON: function () {
      var obj = this.toObject();
      delete obj.encryptedPassword;
      return obj;
    }
  }
};

