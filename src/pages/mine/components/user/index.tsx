import { useEffect, useRef, useState } from 'react';
import Taro, { useDidShow } from '@tarojs/taro';
import { AtIcon } from 'taro-ui';
import { View, Text, Image } from '@tarojs/components';
import { getUserInfo, updateUserInfo } from '@/service';
import { SERVICE_PHONE_NUMBER } from '@/utils/config';
import { formatPrice } from '@/utils/tool';
import bus from '@/utils/bus';
import TicketModal from './ticket-modal';
import './index.less';
// 默认用户头像
const defaultAvatarUrl = "https://vip.gdxsjt.com/medias/uploads/null_mp_20220924111228_cad9ff.svg";

const User = () => {
  // 获取用户信息
  const [userInfo, setUserInfo] = useState({});
  const fetchUserInfo = async () => {
    const data = await getUserInfo();
    setUserInfo(data);
    // 手动设置ifLogin
    setIfLogin(true);
  };

  useDidShow(() => {
    fetchUserInfo();
  });

  const doCall = () => {
    Taro.makePhoneCall({
      phoneNumber: SERVICE_PHONE_NUMBER
    });
  };

  const calcBalance = (price) => {
    if (!price) return '-';
    return `${formatPrice(price)}`;
  };

  const refTicketModal = useRef();

  const [ifLogin, setIfLogin] = useState(true);
  useEffect(() => {
    // 监听一个事件，接受参数
    bus.on('ifLogin', (data) => {
      setIfLogin(data);
    });
  }, []);

  const goLogin = () => {
    Taro.redirectTo({
      url: '/pages/auth/index'
    });
  };

  const improveInfo = () => {
    Taro.navigateTo({ url: `/pages/improve-info/index` });
  };

  const getWxAvatar = () => {
    // 获取用户微信信息
    Taro.getUserProfile({
      desc: '用于完善金水台vip资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: async (data) => {
        console.log(data, 993);
        
        const { nickName, avatarUrl } = data?.userInfo || {};
        console.log(nickName, avatarUrl, 666666);

        // 更新用户头像
        const params = {
          avatarUrl,
        };

        await updateUserInfo(params);
        Taro.showToast({
          title: '头像更新成功!',
          icon: 'success',
          duration: 2000
        });
        fetchUserInfo();
      },
    });
  };

  return (
    <View className='u-mine-user'>
      <View className='u-info'>
        <Image className='avatar' src={userInfo.avatarUrl || defaultAvatarUrl} onClick={getWxAvatar} />
        {ifLogin ? <View className='if-login'>
          <View className='nickname'>{userInfo.ownerName}</View>
          <View className='phone'>
            {userInfo.mobileNumber}
          </View>
          <View className='btn-improve' onClick={improveInfo}>资料完善</View>
        </View> : 
          <View className='no-login' onClick={goLogin}>
            <View className='tip'>
              请登录
            </View>
          </View>}

      </View>

      <View className='u-content'>
        <View className='vip' onClick={() => Taro.navigateTo({ url: `/pages/vip-instruction/index` })}>
          <Text className='level'>{userInfo.currentLevel}</Text>
          <View className='link'>
          查看会员权益
            <AtIcon className='icon-right' value='chevron-right' size='12'></AtIcon>
          </View>
        </View>
        <View className='wallet-wrapper'>
          <View className='balance-wrapper'>
            <View className='item'>
              <View className='value'>
                {calcBalance(userInfo.totalBalance)}
              </View>
              <View className='label'>总余额</View>
            </View>
            <View className='item'>
              <View className='value'>
                {calcBalance(userInfo.rewardBalance)}
              </View>
              <View className='label'>奖励金</View>
            </View>
            <View className='item' onClick={() => Taro.navigateTo({ url: `/pages/gift-store/index` })}>
              <View className='value'>{calcBalance(userInfo.totalPointBalance)}</View>
              <View className='label'>
                积分
              </View>
            </View>
            {/* 住房券使用范围 */}
            <TicketModal ref={refTicketModal} />
          </View>
          <View className='service'>
            <View className='title'>我的服务</View>
            <View className='btn-wrapper'>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/recharge/index` })}>
                <View className='icon recharge'></View>
                <View className='label'>充值</View>
              </View>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/balance-record/index` })}>
                <View className='icon recharge-list'></View>
                <View className='label'>充值记录</View>
              </View>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/balance-record/index?type=1` })}>
                <View className='icon consumption-list'></View>
                <View className='label'>消费记录</View>
              </View>
              <View className='btn' onClick={doCall}>
                <View className='icon contract'></View>
                <View className='label'>联系客服</View>
              </View>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/gift-store/index` })}>
                <View className='icon contract'></View>
                <View className='label'>积分商城</View>
              </View>
            </View>
          </View>

          <View className='service'>
            <View className='title'>员工专区</View>
            <View className='btn-wrapper'>
              <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/reward-record/index` })}>
                <View className='icon reward-detail'></View>
                <View className='label'>奖励金明细</View>
              </View>
              {/* TODO: 暂时不开放 */}
              {/* <View className='btn' onClick={() => Taro.navigateTo({ url: `/pages/reward/index` })}> */}
              <View className='btn' onClick={() => 
                Taro.showModal({
                  title: '敬请期待',
                  content: '“奖励金提现功能”待开放',
                  showCancel: false,
                  confirmText: '好的'
                })}
              >
                <View className='icon reward-withdraw'></View>
                <View className='label'>奖励金提现</View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default User;
