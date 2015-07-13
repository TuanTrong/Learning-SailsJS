/**
 * Created by TuanNT22 on 13-07-2015.
 */
module.exports = function (req, res, next) {
  res.locals.flash = {};
  if (!req.session.flash) {
    return next();
  }
  res.locals.flash = _.clone(req.session.flash);
  //clear flash
  req.session.flash = {};
  next();
}
