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
  update: function (req, res, next) {
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
      {username: 'Happy Coding', email: 'happycoding@happycoding.com', encryptedPassword: '123456'},
      {username: 'tuannt22', email: 'tuannt22@happycoding.com', encryptedPassword: '123456'},
      {username: 'Coding DoJo', email: 'dojo@happycoding.com', encryptedPassword: '123456'},
      {username: 'Agile', email: 'Agile@happycoding.com', encryptedPassword: '123456'},
      {username: 'Scrum', email: 'Scrum@happycoding.com', encryptedPassword: '123456'},
      {username: 'Waterfall', email: 'Waterfall@happycoding.com', encryptedPassword: '123456'},
    ];
    User.create(users, function (err, users) {
      return res.redirect('public/user/list');
    })
  },
  //render login view
  'login': function (req, res) {
    return res.view();
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

