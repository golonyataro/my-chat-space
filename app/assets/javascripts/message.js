$(function(){
  function messagebuildHTML(message){
    var insertImage = "";
    if (message.image.url){
      insertImage = `<img class="image", src="${message.image.url}">`;
    }
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
  $('#new_message').on('submit',function(e) {
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
      if (message != ""){
        var html = messagebuildHTML(message);
        $('.messages').append(html);
        $('.main-bottom').animate({scrollTop: $('.main-bottom')[0].scrollHeight});
        $('#new_message')[0].reset();
        $('.input-submit').prop('disabled', false);
      } else {
        alert('メッセージが空ですよ！');
        $('.input-submit').prop('disabled', false);
      }
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
          $('.main-bottom').animate({scrollTop: $('.main-bottom')[0].scrollHeight}, 'fast');
        }
      });
      $('.messages').append(insertHTML);
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    });
  };

  // トップページでのみ自動更新が行われるようにするための記述(暫定的にiは100までにしてる)
  for (var i = 0; i < 100; i++){
    var url = location.href
    if (url === `http://localhost:3000/groups/${i}/messages`){
      setInterval(reloadMessages, 5000);
    }
  }
}); 
