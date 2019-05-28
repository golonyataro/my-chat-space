$(function() {
  var user_list = $("#user_search_result");
  var member_list = $("#member_search_result");
  var member_name_lists = [];

  function appendUsers(user) {
    
    var html = '';
    html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">
                ${user.name}
              </p>
              <a class="user_search_add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">
                追加
              </a>
            </div>`

    //既にグループに追加されているユーザーが検索されないようにする
    member_name_lists.forEach(function(member_name){
      if (member_name === user.name){
        html = ''
      }
    })

    user_list.append(html);
  };

  function appendMembers(user_name, user_id) {
    var html = `<div class='chat-group-user clearfix'>
                  <input name='group[user_ids][]' type='hidden' value="${user_id}" multiple >
                    <p class='chat-group-user__name'>
                      ${user_name}
                    </p>
                    <a class='user_search_remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-name="${user_name}">
                      削除
                    </a>
                </div>`           

    member_list.append(html);
  };

  function appendMatch() {
    
    var html = '';
    html = `<div class="chat-group-user clearfix">
              <p class="chat-group-user__name">
                一致するユーザーがいません
              </p>
            </div>`

    user_list.append(html);
  };

  // グループ編集ページ、既存のグループメンバーを配列に追加
  $(function(){
    $("#user-search-field").one("keyup", function(){
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        processData: false,
        contentType: false
      })

      .done(function(users) {
        users.forEach(function(user){
          member_name_lists.push(user.name)
        })
      })
      console.log(member_name_lists)
    })
  })

  //インクリメンタルサーチ
  $(function() {
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { member: input },
        dataType: 'json'
      })
      .done(function(users) {
        $("#user_search_result").empty();
        if (users.length !== 0 && users !== null) {
          users.forEach(function(user){
            appendUsers(user);
          })
        } else {
          appendMatch();
        }
      })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      });
    });
  });

  //追加・削除ボタンの処理
  $(function() {
    $(document).on("click", '.user_search_add', function() {
      var user_name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      member_name_lists.push(user_name)
      // console.log(member_name_lists);
      appendMembers(user_name, user_id);
    });
    $(document).on("click", '.user_search_remove', function() {
      var user_name = $(this).attr("data-user-name");
      for(i = 0; i < member_name_lists.length; i++){
        if(member_name_lists[i] == user_name){
          member_name_lists.splice(i--,1);
        }
      }
      $(this).remove();
    });
  });
});
