/**
 * Created by TuanNT22 on 28-07-2015.
 */
module.exports = function (req, res, next) {
  // User or Admin is allowed to CRUD with their account
  var userMatchesID = req.session.user.id === req.param('id');
  var isAdmin = req.session.user.admin;
  if (!(userMatchesID || isAdmin)) {
    var err = [{name: 'noRight', message: 'You don\'t have permission'}]
    req.session.flash = {
      err: err
    }
    return res.redirect('public/user/login');
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  else {
    next();
  }
}
