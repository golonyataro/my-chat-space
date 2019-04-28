$(function(){
  function buildHTML(message){
    var html = `<p>
                  <strong>
                    <a href=/groups/${message.user_id}/messages</a>
                    ：
                  </strong>
                  ${message.content}
                  ${message.image}
                </p>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.message').append(html)
      $('.input-textarea').val('')
      $('.hidden')
      $("form")[0].reset()
    })
    .fail(function(){
      alert('error');
    })
  })
}); 