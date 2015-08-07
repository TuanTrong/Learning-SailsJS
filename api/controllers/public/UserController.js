/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var auth = require('machinepack-passwords');
module.exports = {
  //render new view to signup
  'new': function (req, res) {
    return res.view();
  },
  create: function (req, res, next) {
    User.create(req.params.all(), function (err, user) {
      if (err) {
        //Policies chỉ áp dụng cho controller, không cho view
        //http://sailsjs.org/documentation/concepts/policies
        req.session.flash = {
          err: err
        };
        //Phải gọi redirect ở đây, không được dùng res.view
        return res.redirect('public/user/new');
      }
      req.session.user = user;
      return res.redirect('public/user/show/' + user.id);
    });
  },
  show: function (req, res, next) {
    User.findOne(req.param('id'), function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      return res.view({user: user});
    });
  },
  list: function (req, res, next) {
    User.find(function (err, users) {
      if (err) {
        return next(err);
      }
      return res.view({users: users});
    });
  },
  edit: function (req, res, next) {
    User.findOne(req.param('id'), function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next();
      }
      return res.view({user: user});
    });
  },
  update: function (req, res) {
    User.update(req.param('id'), req.params.all(), function (err) {
      if (err) {
        return res.redirect('public/user/edit/' + req.param('id'));
      }
      return res.redirect('public/user/show/' + req.param('id'));
    });
  },
  destroy: function (req, res, next) {
    User.findOne(req.param('id'), function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next('Người dùng này không tồn tại!');
      }
      User.destroy(req.param('id'), function (err, user) {
        if (err) {
          return next(err);
        }
      })
      return res.redirect('public/user/list');
    });
  },
  gen: function (req, res) {
    var users = [
      {
        username: 'Happy Coding',
        email: 'happycoding@happycoding.com',
        admin: true,
        password: '123456',
        confirm_password: '123456'
      },
      {username: 'tuannt22', email: 'tuannt22@happycoding.com', password: '123456', confirm_password: '123456'},
      {
        username: 'Coding DoJo',
        email: 'dojo@happycoding.com',
        admin: true,
        password: '123456',
        confirm_password: '123456'
      },
      {username: 'Agile', email: 'Agile@happycoding.com', password: '123456', confirm_password: '123456'},
      {username: 'Scrum', email: 'Scrum@happycoding.com', password: '123456', confirm_password: '123456'},
      {
        username: 'Waterfall',
        email: 'Waterfall@happycoding.com',
        admin: true,
        password: '123456',
        confirm_password: '123456'
      }
    ];
    User.create(users, function (err, users) {
      return res.redirect('public/user/list');
    })
  },
  //render login view
  'login': function (req, res) {
    return res.view();
  },
  doLogin: function (req, res, next) {
    var email = req.param('email');
    var password = req.param('password');
    if (!email || !password) {
      var err = [{name: 'allFieldRequired', message: 'Email and password are required!'}];
      req.session.flash = {
        err: err
      };
      return res.redirect('public/user/login');
    }
    User.findOneByEmail(email, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        var err = [{name: 'emailNotExist', message: 'Your email is invalid!'}];
        req.session.flash = {
          err: err
        }
        return res.redirect('public/user/login');
      }
      auth.checkPassword({
        passwordAttempt: password,
        encryptedPassword: user.encryptedPassword
      }).exec({
        error: function (err) {
          return next(err);
        },
        incorrect: function () {
          var err = [{name: 'emailIncorrect', message: 'Your email is invalid!'}];
          req.session.flash = {
            err: err
          }
          return res.redirect('public/user/login');
        },
        success: function () {
          req.session.user = user;
          if (req.session.user.admin) {
            return res.redirect('public/user/list');
          }
          return res.redirect('public/user/show/' + user.id);
        }
      });
    });
  },
  logout: function (req, res, next) {
    req.session.destroy();
    return res.redirect('public/user/login');
  }
};

