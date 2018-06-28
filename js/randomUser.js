

// Create ajax request
  let dataResults = [];

  $.ajax({
    url: 'https://randomuser.me/api/?results=12&nat=us',
    dataType: 'json',
    //if successful create employee directory
    success: function(data) {

      dataResults = data.results;
      var employeeHTML = '';
      $.each(dataResults, function(index, employee) {
        employeeHTML += '<div class="employee">';
        employeeHTML += '<div class="image">';
        employeeHTML += '<img src="' + employee.picture.medium + '"></div>';
        employeeHTML += '<div class="info">';
        employeeHTML += '<p class="employeeName">' + employee.name.first + ' ' + employee.name.last +'</p>';
        employeeHTML += '<a class="employeeEmail" href=""> ' +employee.email +' </a>';
        employeeHTML += '<p class="employeeState">' + employee.location.city +'</p></div></div>';
      });
      $('#directory').html(employeeHTML);//attach pullRequest to directory

      // Define click event on employee directory to create modal
      profiles = $('#directory .employee');

      // for each profile in the employee directory
      for (let i = 0; i < profiles.length; i++) {

        // When a profile is clicked
        profiles[i].onclick = function () {

          // Diplay modal and call modalFill
          $('#modal').show();
          modalFill(dataResults[i], i);
        };

        // When modal close button is clicked
        $('#button').on('click', function () {

          // Hide modal
          $('#modal').hide();
        });
      }

      // search users
      let users = $('#dataResults .employeeName');
      $("#search").keyup(function() {
        const $input = $(this).val().toLowerCase();
        $.each(users, function(index, user) {
          if (user.innerHTML.toLowerCase().includes($input)) {
            $(this).closest('.employee').show();
          } else {
            $(this).closest('.employee').hide();
          }
        });
      });

      // Search functionality //
    $('#search').keyup(function () {

      let searchImages = $('#search').val();
      searchImages = searchImages.toLowerCase();

      let profiles = $('#directory .employee');
      for (i = 0; i < profiles.length; i++) {
        if (profiles[i].innerHTML.toLowerCase().includes(searchImages)) {
          profiles[i].style.display = 'flex';
        } else {
          profiles[i].style.display = 'none';
        }
      }
    })

      // Define modalFill function
      function modalFill(target, index) {
        // Define content variable for modal fill
        let employeeModal = '';
        currentTarget = dataResults.indexOf(target);
        // Store new Date string from  value of (date:key) in dataResults
        let dob = new Date(target.dob.date);
        dob = dob.toLocaleDateString();

        // Add content to employeeModal
        employeeModal += '<img class="imgLarge" src="' + target.picture.large +'">';
        employeeModal += '<p class="employeeName">' + target.name.first + ' ' + target.name.last +'</p>';
        employeeModal += '<a class="employeeEmail" href=""> ' + target.email +' </a>';
        employeeModal += '<p class="employeeState">' + target.location.city +'</p>';
        employeeModal += '<hr>';
        employeeModal += '<p class="employeePhone">' + target.phone + '</p>';
        employeeModal += '<p class="employeeAddress">' + target.location.street + ',' + ' ' + '<span class="state">' + target.location.state + '</span>' + ' ' + target.location.postcode + '</p>';
        employeeModal += '<p class="employeeDOB">Birthday:' + ' ' + dob +'</p>';

        $('#modal-profile').html(employeeModal);//attach pullRequest to modal-profile

          // When right modal button is clicked
         $("#rightBtn").click(function() {

                    // If employee is eleventh index of dataResults
                    if(index === 11){
                      // Fill modal profile with employee content @ index 0
                      modalFill(dataResults[0], 0)
                    }// Else fill modal with next index employee content
                     else {
                     modalFill(dataResults[index + 1], index + 1);
                   }
                 });

          // Same as above, just reversed
         $("#leftBtn").click(function() {
           if(index === 0){
             modalFill(dataResults[11], 11)}
             else {
              modalFill(dataResults[index - 1], index - 1);
            }
         });

      } // end of modalFill function
    } // end of success
  }); // end of ajax
