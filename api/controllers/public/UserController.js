/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  //render new view to signup
  'new': function (req, res) {
    res.view();
  },
  create: function (req, res, next) {
    User.create(req.params.all(), function (err, userCreated) {
      if (err) {
        //Policies chỉ áp dụng cho controller, không cho view
        //http://sailsjs.org/documentation/concepts/policies
        req.session.flash = {
          err: err
        };
        //Phải gọi redirect ở đây, không được dùng res.view
        return res.redirect('public/user/new');
      }
      res.redirect('public/user/show/' + userCreated.id);
    });
  },
  show: function (req, res, next) {
    User.findOne(req.param('id'), function (err, userFound) {
      if (err) {
        return next(err);
      }
      if (!userFound) {
        return next();
      }
      res.view({user: userFound});
    });
  },
  list: function (req, res, next) {
    User.find(function (err, userList) {
      if (err) {
        return next(err);
      }
      return res.view({users: userList});
    });
  },
  //render login view
  'login': function (req, res) {
    res.view();
  }
  //login: function (req, res) {
  //  var username = req.param('username');
  //  var password = req.param('password');
  //  sails.log(username, password);
  //  User.find({username: username, encryptedPassword: password}, function (err, founded) {
  //    if (err) {
  //      return res.negotiate();
  //    }
  //    req.session.authenticated = true;
  //    req.session.user = founded;
  //    sails.log(req.session.user);
  //    return res.view('public/user/index');
  //  })
  //}
};

