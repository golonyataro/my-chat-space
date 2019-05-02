$(function(){
  function messagebuildHTML(message){
    var insertImage = message.id ? insertImage = `<img class="image, src="${message.image}">`: '';
    var html = `
    <div class='message' data-id="${message.id}">
      <div class='upper-info'>
        <p class='upper-info-user'>
          ${message.name}
        </p>
        <p class='upper-info-date'>
          ${message.created_at}
        </p>
      </div>
      <div class='lower-info'>
        <p class='message-text'>
          ${message.content}
        </p>
        ${insertImage}
      </div>
    </div> `
    return html;
  };
  
  //非同期通信
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
    .done(function(message) {
      var html = messagebuildHTML(message);
      $('.message').append(html)
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
  });

  //自動更新
  var reloadMessages = function() {
    var last_message_id = $('.message:last').data('id');
    $.ajax({
      url: location.href.json,
      type: 'get',
      dataType: 'json',
      data: {last_message_id: last_message_id}
    })
    .done(function(messages) {
      var insertHTML = '';
      messages.forEach(function(message) {
        if (message.id > last_message_id ) {
          insertHTML += messagebuildHTML(message);
        }
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };
  setInterval(reloadMessages, 5000);
}); 
