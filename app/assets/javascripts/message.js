$(function(){
  function messagebuildHTML(message){
    var html = `<p>
                  <strong>
                    <a href=/groups/${message.group_id}/messages</a>
                    ：
                  </strong>
                  ${message.content}
                  ${message.image}
                </p>`
    return html;
  };
  
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
    });

    .done(function(message) {
      var html = messagebuildHTML(message);
      $('.message').append(html)
      $('.input-textarea').val('')
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    });
  });
}); 