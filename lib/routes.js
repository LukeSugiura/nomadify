FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) {
    FlowRouter.go('sign-in');
  }
}], { except: ['home', 'sign-up', 'restaurants', 'waiting-list'] });

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/sign-in', {
  name: 'sign-in',
  triggersEnter: [function(context, redirect) {
    if(Meteor.userId()) {
      redirect('/restaurants');
    }
  }],
  action() {
    BlazeLayout.render('MainLayout', {main: 'SignIn'});
  },
});

FlowRouter.route('/sign-up', {
  name: 'sign-up',
  triggersEnter: [function(context, redirect) {
    if(Meteor.userId()) {
      redirect('/restaurants');
    }
  }],
  action() {
    BlazeLayout.render('MainLayout', {main: 'SignUp'});
  },
  triggersExit: [function(context, redirect) {
    redirect('/add-restaurant');
  }]
});

FlowRouter.route('/add-restaurant', {
  name: 'add-restaurant',
  action() {
    BlazeLayout.render('MainLayout', {main: 'AddRestaurant'});
  }
});

FlowRouter.route('/restaurants', {
  name: 'restaurants',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Restaurants'});
  }
});

FlowRouter.route('/restaurants/:id/waiting-list', {
  name: 'waiting-list',
  action(params) {
    Session.set('restaurantId', params.id);
    BlazeLayout.render('MainLayout', {main: 'WaitingList'});
  }
});

FlowRouter.route('/admin/restaurants', {
  name: 'admin-restaurants',
  triggersEnter: [function(context, redirect) {
    if(!Meteor.userId()) {
      FlowRouter.go('sign-in');
    }
  }],
  action() {
    BlazeLayout.render('MainLayout', {main: 'AdminRestaurants'});
  }
});

FlowRouter.route('/admin/restaurants/:id/dashboard', {
  name: 'admin-restaurant-dashboard',
  action(params) {
    Session.set('restaurantId', params.id);
    BlazeLayout.render('MainLayout', {main: 'AdminRestaurantDashboard'});
  }
});

FlowRouter.route('/admin/restaurants/:id/waiting-list', {
  name: 'admin-waiting-list',
  action(params) {
    Session.set('restaurantId', params.id);
    BlazeLayout.render('MainLayout', {main: 'AdminWaitingList'});
  }
});

FlowRouter.route('/twilio/notification-message.xml', {
  where: 'server',
  action() {

    var xmlData = '<?xml version="1.0" encoding="UTF-8"?><Response><Gather timeout="10" numDigits="1" action="twilio_respons.php"><Say voice="woman" language="ja-jp">あなたの順番が近くなりました</Say></Gather></Response>';
    // var xmlData = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    // xmlData += "<Response>";
    // xmlData += "<Say voice=\"woman\" language=\"ja-JP\">じゅんくん、こんにちは！</Say>";
    // xmlData += "</Response>";

    this.response.writeHead(200, {'Content-Type': 'application/xml'});
    this.response.end(xmlData);
  }
});

FlowRouter.route('/twilio/twilio_respons.xml', {
  where: 'server',
  action() {

    // var xmlData = "<?xml version='1.0' encoding='UTF-8'?><Response><Gather timeout='10' numDigits='1' action='twilio_respons.php'><Say voice='woman' language='ja-JP'>じゅんくん、こんにちは！一番押して。</Say></Gather></Response>";
    var xmlData = '<?xml version="1.0" encoding="UTF-8"?><Response><Gather timeout="10" numDigits="1" action="twilio_respons.php"><Say voice="woman" language="ja-jp">あなたの順番が近くなりました</Say></Gather></Response>';
    this.response.writeHead(200, {'Content-Type': 'application/xml'});
    this.response.end(xmlData);
  }
});
