function populate_table(blogentry_data) {
    var html = '';
    for (var i = 0; i < blogentryd_ata.length; i++) {
      html = '<h1>Hello, world!</h1>' +
              '<p>This is some dynamic content generated using JavaScript.</p>';
      html += '<p>' + blogentry_data[i].name + '</p>';
      html += '<p>' + datablogentry_data[i].email + '</p>';
      }
    $(html).appendTo('#a');
      

  function actionFormatter(value, row, index) {
    return [
      '<a class="edit" href="javascript:void(0)" title="Like">',
      '✏️',
      '</a>  ',
      '<a class="remove" href="javascript:void(0)" title="Remove">',
      '🗑️',
      '</a>'
    ].join('')
  }

  window.operateEvents = {
    'click .edit': function (e, value, row, index) {
      prePopulateForm(row);
    },
    'click .remove': function (e, value, row, index) {
      removeItem(row);
    }
  }

  function prePopulateForm(id) {
    $('#addTweetForm')[0].reset();
    $('#name').val(document.getElementById("name" + id).innerHTML)
    $('#message').val(document.getElementById("message" + id).innerHTML)
    $('#entryid').val(id);
    toggleView();
  }

  function removeItem(id) {
    if (!confirm("Delete " + row.firstname + ' ' + row.lastname + '?')) {
      return false;
    }
    var url = "lab10/remove_contact"
    var formData = { 'id': row.id };
    $.post(url, formData, function (contact_data) {
      refresh_table(contact_data);
    });
  }

  // function blog_table(blog_data) {
  //   //console.log(blogentry_data != [])
  //   // Create the HTML for each artist.
  //   const data = { data: blog_data }
  //   const creatBlog = ({ name, message, email, date_created }) => {
  //     const date = formatTime(date_created)

  //     return `
  //       <div class="tweet">
  //         <div class="row">
      
  //           <div class="col-md-2 text-center">
  //             <img src="static/img/me.png" class="tw-user-medium rounded-circle">
  //           </div>
      
  //           <div class="col-md-10">
  //             <div class="row tweet-info">
  //               <div class="col-md-auto">
  //                 <span class="tweet-username">${name}</span>
  //                 <span class="tweet-usertag text-muted">@${email}</span>-
  //                 <span class="tweet-age text-muted">${date}</span>
  //               </div>
  //               <div class="col tweet-arrow text-muted">
  //                     <div class="dropdown" >
  //                     <i class="fa-solid fa-ellipsis float-right"  onclick="showDropdownMenu(event)"></i>
  //                         <div class="dropdown-menu" id ="dropdown_item">
  //                             <a class="dropdown-item" href="#">
  //                                 <i class="fa-solid fa-pen"></i>
  //                                 edit
  //                             </a>
  //                             <a class="dropdown-item" href="#">
  //                                 <i class="fa-solid fa-trash"></i>
  //                                 delete
  //                             </a>
  //                         </div>
  //                 </div>
  //               </div>
  //             </div>
      
  //             <div class="tweet-text">
  //               ${message}
  //             </div>
      
  //             <div class="tweet-media">
  //               <img src="static/img/mushu_eating.jpg" class="img-fluid rounded" >
  //             </div>
      
  //             <div class="row text-muted">
  //               <div class="col-md-2"><span class="oi oi-bullhorn"></span></div>
  //               <div class="col-md-2"><span class="oi oi-loop-circular"></span></div>
  //               <div class="col-md-2"><span class="oi oi-heart"></span></div></a>
  //               <div class="col-md-2"><span class="oi oi-envelope-open"></span></div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>`;
  //   };
  //   //console.log(JSON.stringify(data));
  //   const blog = data.data.map(creatBlog);
  //   // And add it for each HTML template to the body.
  //   for (let i = 0; i < blog.length; i++) {
  //     document.getElementById("blog_display").innerHTML =
  //       blog[i] + document.getElementById("blog_display").innerHTML;
  //   }
  // }
