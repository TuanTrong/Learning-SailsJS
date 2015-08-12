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
      //email: true,
      required: true
    },
    encryptedPassword: {
      type: 'string'
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    },
    online: {
      type: 'boolean',
      defaultsTo: false
    }
    //Custom attr method
    //toJSON : return JSON object to client
    //toJSON: function () {
    //  var obj = this.toObject();
    //  //delete obj.encryptedPassword;
    //  return obj;
    //}
  },
  beforeValidation: function (values, next) {
    //Add admin value for right
    //Checkbox chỉ khi được check thì mới gửi giá trị lên controller
    //Nên ta sẽ check nếu có param đó thì nghĩa là được check --> true
    values.admin = typeof values.admin !== 'undefined' ? true : false;
    next();
  },
  beforeCreate: function (values, next) {
    require('machinepack-passwords').encryptPassword({
      password: values.password
    }).exec({
      error: function (err) {
        return next(err);
      },
      success: function (result) {
        values.encryptedPassword = result;
        return next();
      }
    });
  }
}
;

