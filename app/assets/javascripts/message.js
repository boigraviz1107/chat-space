$(function() {
  function buildHTML(message)   {

  var html_user = `<div class="chatmain-messeage_list_box_data">
                     <div class="chatmain-messeage_list_box_data_name"> 
                      ${message.user_name}
                     </div>
                     <div class="chatmain-messeage_list_box_data_day">
                      ${message.created_at} 
                     </div>
                   </div>` 
  var html_content = `<p class="chatmain-messeage_list_box_masseage__content">
                      ${message.content} 
                      </p>` 
  var html_image = `<img src="` + message.image + `" class="chatmain-messeage_list_box_masseage__image" >`
 
    if (message.content && message.image) {
      var html = `<div class="chatmain-messeage_list_box">
                   ${html_user} 
                   <div class="chatmain-messeage_list_box_masseage">
                    ${html_content}
                    ${html_image}
                   </div>
                 </div>`
                 return html;
    } else if (message.content) {
      var html = `<div class="chatmain-messeage_list_box"> 
                  ${html_user} 
                   <div class="chatmain-messeage_list_box_masseage"> 
                  ${html_content}
                   </div>
                  </div>`
        return html;
    }else if (message.image) {
      var html = `<div class="chatmain-messeage_list_box"> 
                  ${html_user} 
                   <div class="chatmain-messeage_list_box_masseage">
                  ${html_image}
                   </div>
                  </div>`
        return html;
    };
  }

    
  
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function (data) {
      console.log(data)
      var html = buildHTML(data);
      $('.chatmain-messeage_list').append(html);
      $('form')[0].reset();
      $('.chatmain-messeage_list').animate({ scrollTop: $('.chatmain-messeage_list')[0].scrollHeight});
      $('.input_btn').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
  });
  })
  });
