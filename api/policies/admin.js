/**
 * Created by TuanNT22 on 28-07-2015.
 */
module.exports = function (req, res, next) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.user && req.session.user.admin) {
    return next();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  else {
    var err = [{name: 'adminRequired', message: 'You must be an admin to continue'}]
    req.session.flash = {
      err: err
    }
    return res.redirect('public/user/login');
  }
}
