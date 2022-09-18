// 订单状态
export const OrderStatus = {
  NEW: 0, // 等待系统处理
  CREATED: 1, // 已创建
  WAITING_FOR_ANSWER: 2, // 等待应答
  WAITING_FOR_PICK_UP: 3, // 已接单，等待接驾
  PROCESSING: 4, // 行程中
  NEED_TO_BE_PAID: 5, // 行程结束，等待支付
  FINISH: 6, // 订单完成
  CANCELLED: -1, // 已取消
};

export const OrderStatusText = {
  [OrderStatus.NEW]: "等待系统处理",
  [OrderStatus.CREATED]: "已创建",
  [OrderStatus.WAITING_FOR_ANSWER]: "等待应答",
  [OrderStatus.WAITING_FOR_PICK_UP]:"已接单，等待接驾",
  [OrderStatus.PROCESSING]: "行程中",
  [OrderStatus.NEED_TO_BE_PAID]:"行程结束，等待支付",
  [OrderStatus.FINISH]: "订单完成",
  [OrderStatus.CANCELLED]: "已取消",
};