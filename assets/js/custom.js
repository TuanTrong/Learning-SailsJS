/**
 * Created by TuanNT22 on 13-07-2015.
 */
//Validate signup form
$('#signup-form').validate({
  rules: {
    username: {
      required: true,
      minlength: 6
    },
    email: {
      required: true,
      email: true
    },
    password: {
      required: true,
      minlength: 6
    },
    confirm_password: {
      required: true,
      minlength: 6,
      equalTo: '#password'
    }
  }
});
