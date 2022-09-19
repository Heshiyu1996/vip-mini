export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/auth/index',
    'pages/auth/login/index',
    'pages/auth/register/index',
    'pages/code/index',
    'pages/book/index',
    'pages/book-detail/index',
    'pages/order/index',
    'pages/mine/index',
    'pages/balance-record/index',
    'pages/vip-instruction/index',
    'pages/hotel-intro/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: '#000000',
    selectedColor: '#DC143C',
    backgroundColor: '#ffffff',
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
