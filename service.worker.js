self.addEventListener('message', function(e) {
  console.log(e)
  
  var processedNotification = processNotification(e.data);
  
  this.self.postMessage(processedNotification);
}, false);

function processNotification(notification) {
  console.log('->', notification);
  
  if(notification.type === 'sms') {
    return {
      type: notification.type,
      category: notification.data.category,
      userId: notification.data.user.id,
      name: notification.data.user.name,
      phone: notification.data.user.phone_number,
    };
  } else if(notification.type === 'email') {
    return {
      type: notification.type,
      category: notification.data.category,
      userId: notification.data.user.id,
      name: notification.data.user.name,
      email: notification.data.user.email,
    };
  } else if(notification.type === 'push') {
    return {
      type: notification.type,
      category: notification.data.category,
      userId: notification.data.user.id,
      name: notification.data.user.name,
    };
  }

}
