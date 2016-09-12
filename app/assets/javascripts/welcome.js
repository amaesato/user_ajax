$(document).ready(function(){
  var BASEURL = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1';

  function loadUsers() {
    $('#users').empty();
    $('#one_user_header').empty();
    $('#view_a_user').empty();
    $.ajax({
      url: BASEURL + '/users',
      type: 'GET',
      dataType: 'JSON'
    }).done(function(data){
      $('#users_header').text('All Users')
      data.forEach(function(user){
        $('#users').prepend('<li data-user-id="' + user.id + '">' + user.first_name + ' ' + user.last_name +
                              '<button class="view_user">view</button></li>');

      });
    }).fail(function(data){
      console.log(data)
    });
  }

  $(document).on('click', '.view_user', function(){
    $('#users_header').empty();
    $('#users').empty();
    $('#view_a_user').slideDown();
    var userId = $(this).parent().data('user-id');
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(user){
      var userName = user.first_name + ' ' + user.last_name;
      $('#one_user_header').text(userName);
      $('#view_a_user').append('<p data-user-id="' + user.id + '">' + user.phone_number +
                              '<button class="delete_user">delete</button> \
                               <button class="edit_button">edit</button></li>');
    }).fail(function(user){
      console.log(user)
    });
  });


  // function loadUsers() {
  //   $('#users').empty();
  //   $.ajax({
  //     url: BASEURL + '/users',
  //     type: 'GET',
  //     dataType: 'JSON'
  //   }).done(function(data){
  //     $('#all_users_header').text('All Users');
  //     data.forEach(function(user){
  //       $('#users').prepend('<li data-user-id="' + user.id + '">' + user.first_name + ' ' + user.last_name +
  //                             '<button class="delete_user">delete</button> \
  //                              <button class="edit_button">edit</button></li>');
  //
  //     });
  //   }).fail(function(data){
  //     console.log(data)
  //   });
  // }

  $('#view_users').click(function(){
    loadUsers();
  });


  $(document).on('click', '.delete_user', function(){
    var userId = $(this).parent().data('user-id');

    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'DELETE',
      dataType: 'JSON'
    }).done(function(data){
      console.log('User deleted!')
      loadUsers();
    }).fail(function(data){
      console.log(data);
    });
  });


  $('#add_user').click(function(){
    var $addNewUser = $('#add_new_user');
    $addNewUser.slideToggle(400, function(){
      var $addUser = $('#add_user');
      if($addNewUser.is(':hidden')){
        $addUser.text('Add User');
      } else {

  // TODO: change button text
        $addUser.text('Hide Add User');
      }
    });
  });

  $('#add_user_form').submit(function(e){
    e.preventDefault();

    var $firstName = $('#user_first_name');
    var $lastName = $('#user_last_name');
    var $phoneNum = $('#user_phone_number');
    var form = this;
    $.ajax({
      url: BASEURL + $(this).attr('action'),
      type: $(this).attr('method'),
      dataType: 'JSON',
      // data: {user: {first_name: $firstName.val(),
      //           lastName: $lastName.val(),
      //           phone_number: $phoneNum.val()}}
      data: $(this).serializeArray()
    }).done(function(data){
      form.reset();
      loadUsers();
    }).fail(function(data){
      data.error();
      console.log(data);
    });
  });

  //fix from here down
    $(document).on('click', '.edit_button', function() {
    $('#one_user_header').empty();
    $('#view_a_user').empty();
    var userId = $(this).parent().data('user-id');
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'GET',
      dataType: 'JSON'
    }).done(function(user) {
      var userFirstName = user.first_name;
      var userLastNight = user.last_name;
      var userPhoneNum = user.phone_number;
      $('#edit_user > h3').text(user.first_name + ' ' + user.last_name);
      $('#edit_first_name').val(userFirstName);
      $('#edit_last_name').val(userLastNight);
      $('#edit_phone_number').val(userPhoneNum);
      $('#user_id').val(userId);
      $('#edit_user').slideDown();
    }).fail(function(data) {
      console.log(data);
    });
  });

  $('#edit_user_form').submit(function(e) {
    e.preventDefault();
    var form = this;
    var userId = $('#user_id').val();
    $.ajax({
      url: BASEURL + '/users/' + userId,
      type: 'PUT',
      dataType: 'JSON',
      data: $(this).serializeArray()
    }).done(function(data) {
      form.reset();
      $('#edit_user').slideUp();
      loadUsers();
    }).fail(function(data) {
      console.log(data);
    });
  });

});
