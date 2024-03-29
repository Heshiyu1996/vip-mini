export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/auth/index',
    'pages/auth/register/index',
    'pages/code/index',
    'pages/book/index',
    'pages/book-detail/index',
    'pages/order/index',
    'pages/mine/index',
    'pages/recharge/index',
    'pages/balance-record/index',
    'pages/vip-instruction/index',
    'pages/hotel-intro/index',
    'pages/web-view/index',
    'pages/gift-store/index',
    'pages/gift-record/index',

    // 奖励金
    'pages/reward/index',
    'pages/reward-record/index',

    // 资料完善
    'pages/improve-info/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    custom: true,
    color: '#AEAEAE',
    selectedColor: '#152736',
    backgroundColor: '#FFF',
    list: [
      {
        pagePath: 'pages/index/index',
        selectedIconPath: 'images/tab-bar/index-active.png',
        iconPath: 'images/tab-bar/index.png',
        text: '首页'
      },
      {
        pagePath: 'pages/book/index',
        selectedIconPath: 'images/tab-bar/book-active.png',
        iconPath: 'images/tab-bar/book.png',
        text: '订房'
      },
      {
        pagePath: 'pages/code/index',
        selectedIconPath: 'images/tab-bar/code.png',
        iconPath: 'images/tab-bar/code.png',
        text: ''
      },
      {
        pagePath: 'pages/order/index',
        selectedIconPath: 'images/tab-bar/order-active.png',
        iconPath: 'images/tab-bar/order.png',
        text: '订单'
      },
      {
        pagePath: 'pages/mine/index',
        selectedIconPath: 'images/tab-bar/mine-active.png',
        iconPath: 'images/tab-bar/mine.png',
        text: '我的'
      }
    ]
  }
});
