import CleverTap from 'clevertap-react-native';

export const openAppInbox = () => {
  CleverTap.showInbox({
    tabs: ['Offers', 'Promotions'],
    navBarTitle: 'My App Inbox',
    navBarTitleColor: '#FF0000',
    navBarColor: '#FFFFFF',
    inboxBackgroundColor: '#AED6F1',
    backButtonColor: '#00FF00',
    unselectedTabColor: '#0000FF',
    selectedTabColor: '#FF0000',
    selectedTabIndicatorColor: '#000000',
    noMessageText: 'No message(s)',
    noMessageTextColor: '#FF0000',
  });
};
