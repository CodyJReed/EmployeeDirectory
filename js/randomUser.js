// Create ajax request
$('document').ready(function () {
  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    //if successful create employee directory
    success: function(data) {
      var employeeHTML = '';
      $.each(data.results, function(i, employee) {
        employeeHTML += '<div class="employee">';
        employeeHTML += '<div class="image">';
        employeeHTML += '<img src="' + employee.picture.medium + '"></div>';
        employeeHTML += '<div class="info">';
        employeeHTML += '<p class="employeeName">' + employee.name.first + ' ' + employee.name.last +'</p>';
        employeeHTML += '<a class="employeeEmail" href="' + employee.email + '"> ' +employee.email +' </a>';
        employeeHTML += '<p class=employeeState>' + employee.location.city +'</p></li></div></div>';
      });
      $('#directory').html(employeeHTML);//attach pullRequest to html
    }
  });// select all buttons
});// end ready

// Overlay Modal
// var modal = (function(){
//   var $window = $(window);
//   var $modal = $('<div class="modal"/>');
//   var $content = $('<div class="modal-content"/>');
//   var $close = $('<button role="button" class="modal-close">close</button>');
//
//   //Append close button to modal window
//   $modal.append($content, $close);
//
//   //Close on click
//   $close.on('click', function(e) {
//     e.preventDefault();
//     modal.close();
//   });
//
//   return {
//     //Add code to center modal
//     //Define center
//     center: funtion() {
//       var top = Math.max($window.height() - $modal.outerHeight(), 0) / 2;
//       var left = Math.max($window.width() - $modal.outerWidth(), 0) / 2;
//       //Set modal to center in CSS
//       $modal.css({
//         top: top + $window.scrollTop(),
//         left: left + $window.scrollLeft()
//       });
//     },
//     //Define open or show of modal object
//     open: function(settings) {
//       //Set new content of modal
//       $content.empty().append(settings.content);
//
//       //Set modal dimensions
//       $modal.css({
//         width: settings.width || 'auto',
//         height: settings.height || 'auto'
//         //Add to page
//       }).appendTo('body');
//
//       //Call center() method
//       $modal.center();
//       $(window).on('resize', modal.center);
//     },
//     //Define close() method
//     close: function() {
//       $content.empty();
//       $modal.detach();
//       $(window).off('resize', modal.center);
//     }
//   };
// }());
//
// //Remove modal from page
// var $content = $('#modal').detach();
//
// //Click event on employee
// $('.employee').on('click', function(e) {
//   modal.open({});
// });
