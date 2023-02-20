var lastestID = 0;
$(document).ready(function () {
    (function () {
        $.getJSON("lab11/blogentry", blog_table);
    })();
});


$("#addBlogBlog").submit(function (event) {
  
    // prevent default html form submission action
    event.preventDefault();

    // pack the inputs into a dictionary
    var formData = {};
    $(":input").each(function () {
        var key = $(this).attr('name');
        var val = $(this).val();

        if (key != 'submit') {
            formData[key] = val;
        }

    });

    var $form = $(this);
    var url = $form.attr("action");

    // make a POST call to the back end w/ a callback to refresh the table
    $.post(url, formData, function (blog_data) {
        clearForm();
        refresh_table(blog_data)
        toggleView()

    });


});


function clearForm() {
    $('#addBlogBlog')[0].reset();
    $('#entryid').val('');
};


function blog_table(blog_data) {
    
    //console.log(blogentry_data != [])
    // Create the HTML for each artist.
    const data = { data: blog_data }
    const creatBlog = ({id, name, message, email, date_created, date_update }) => {
        lastestID = id;
        let date = formatTime(date_created);
        let dateEdit = formatTime(date_update);
        console.log(date_created.split(",")[0])
        const DMY = date_created
        var oldDate = new Date(date_created);
        var editDate = new Date(date_update);
   
        if(oldDate.getUTCSeconds() === editDate.getUTCSeconds()){
          return currentBlog(id, name, message, email, date, DMY);
        }else{
          return editBlog(id, name, message, email, date, dateEdit, DMY);
        }    
    };

    //console.log(JSON.stringify(data));
    const blog = data.data.map(creatBlog);
    // And add it for each HTML template to the body.
    for (let i = 0; i < blog.length; i++) {
        document.getElementById("blog_display").innerHTML =
            blog[i] + document.getElementById("blog_display").innerHTML;
    }
};


function currentBlog(id, name, message, email, post_date, dateMonthYear){
  return `
      <div class="tweet">
        <div class="row">
    
          <div class="col-md-2 text-center">
            <img src="static/img/me.png" class="tw-user-medium rounded-circle">
          </div>
    
          <div class="col-md-10">
            <div class="row tweet-info">
              <div class="col-md-auto">
                <span class="tweet-id" id="id-blog" hidden="hidden">${id}</span>
                <span class="tweet-username" id="name${id}">${name}</span>
                (<span class="tweet-usertag"id="email${id}">${email}</span>)
                <span class="tweet-age" data-text="${dateMonthYear}"> · ${post_date} · <i class="fa-solid fa-earth-asia"></i></span>
               
              </div>
              <div class="tweet-arrow">
                    <div class="dropdown" >
                    <i class="fa-solid fa-ellipsis" onclick="showDropdownMenu(event)"></i>
                        <div class="dropdown-menu" id ="dropdown_item">
                            <a class="dropdown-item" href="javascript:void(0) "onclick="prePopulateForm(${id})" >
                                <i class="fa-solid fa-pen" ></i>
                                edit
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)" onclick="removeItem(${id})">
                                <i class="fa-solid fa-trash"></i>
                                delete
                            </a>
                        </div>
                 </div>
              </div>
            </div>
    
              <div class="tweet-text" id="message${id}">${message}</div>

          </div>
        </div>
      </div>`;

};


function editBlog(id, name, message, email, date, edit_date, dateMonthYear){
  return `
      <div class="tweet">
        <div class="row">
    
          <div class="col-md-2 text-center">
            <img src="static/img/me.png" class="tw-user-medium rounded-circle">
          </div>
    
          <div class="col-md-10">
            <div class="row tweet-info">
              <div class="col-md-auto">
                <span class="tweet-id" id="id-blog" hidden="hidden">${id}</span>
                <span class="tweet-username" id="name${id}">${name}</span>
                (<span class="tweet-usertag"id="email${id}">${email}</span>)
                <span class="tweet-age" data-text="${dateMonthYear} (Edited ${edit_date} ago)"> · ${date} (edited) · <i class="fa-solid fa-earth-asia"></i> </span>
                
                
              </div>
              
              <div class="tweet-arrow">
                    <div class="dropdown" >
                    <i class="fa-solid fa-ellipsis" onclick="showDropdownMenu(event)"></i>
                        <div class="dropdown-menu" id ="dropdown_item">
                            <a class="dropdown-item" href="javascript:void(0) "onclick="prePopulateForm(${id})" >
                                <i class="fa-solid fa-pen" ></i>
                                edit
                            </a>
                            <a class="dropdown-item" href="javascript:void(0)" onclick="removeItem(${id})">
                                <i class="fa-solid fa-trash"></i>
                                delete
                            </a>
                        </div>
                 </div>
              </div>
            </div>
    
              <div class="tweet-text" id="message${id}">${message}</div>

          </div>
        </div>
      </div>`;

};


function formatTime(date_created) {
    let now = new Date();
    let created = new Date(date_created + " UTC");
    let diff = (now.getTime() - created) / 1000 / 60; // convert to minutes
    diff = Math.abs(Math.round(diff)); // round and get absolute value

    let result;
    if (diff >= 60 && diff < 1440) {
        result = Math.round(diff / 60) + " hours";
    } else if (diff >= 1440) {
        result = new Date(date_created).toLocaleDateString().split(",")[0];
    } else if (diff <= 1) {
        result = "now";
    } else {
        result = diff + " minutes";
    }
    return result;
}

function showDropdownMenu(event) {
    var dropdown = event.target.nextElementSibling;
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
    } else {
      dropdown.style.display = "block";
    }
    document.addEventListener("click", function(event) {
        if (!event.target.matches('.fa-ellipsis')) {
          dropdown.style.display = "none";
        }
      });
  }


function removeItem(id) {
  if (!confirm("Are you sure to delete this?")) {
    console.log("not pass")
    return false;
  }
  console.log("pass")
  var url = "lab11/remove_blog"
  var formData = { 'id': id};
  $.post(url, formData, function (blog_data) {
    refresh_table(blog_data)
  });
}

function refresh_table(blog_data) {
  document.getElementById("blog_display").innerHTML = "";
  document
    .getElementById("blog_display")
    .addEventListener("load", blog_table(blog_data));
}

function prePopulateForm(id){
  // console.log("id : " + id)
  // console.log("name : " + (document.getElementById("name"+id).innerHTML))
  $('#addBlogBlog')[0].reset();
  $('#name').val(document.getElementById("name"+id).innerHTML)
  $('#email').val(document.getElementById("email"+id).innerHTML)
  $('#message').val(document.getElementById("message"+id).innerHTML)
  $('#entryid').val(id)
  toggleView()
}

function lastestPrePopulateForm(id){
  $('#addBlogBlog')[0].reset();
  $('#name').val(document.getElementById("name"+id).innerHTML);
  $('#email').val(document.getElementById("email"+id).innerHTML);  
}


function toggleView() {
  if ($('#addBlog_display').attr('hidden')) {
    $('#addBlog_display').removeAttr('hidden');
    $('#addBlogBlog').attr('hidden', 'hidden');
  } else {
    $('#addBlog_display').attr('hidden', 'hidden');
    $('#addBlogBlog').removeAttr('hidden');
  }  
}

$("#add_blog").click(function () {
  clearForm();
  toggleView();
  lastestPrePopulateForm(lastestID)
});

$("#clear_form").click(function () {
  clearForm();
});


$("#cancel_form").click(function () {
  clearForm();
  toggleView();
});

