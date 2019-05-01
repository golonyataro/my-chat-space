json.content  @message.content
json.group_id @message.group.id
json.user_id  @message.user.id
json.image  @message.image
json.user_name  @message.user.name
json.created_at format_posted_time(message.created_at)
