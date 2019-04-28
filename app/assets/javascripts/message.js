$(function(){
  function buildHTML(message){
    var html = `<p>
                  <strong>
                    <a href=/users/${message.user_id}>${comment.group_id}</a>
                    ：
                  </strong>
                  ${message.content}
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
    })
    .fail(function(){
      alert('error');
    })
  })
});