import { Component, PropsWithChildren } from 'react'
import { View } from '@tarojs/components'
import User from './components/user';
import Book from './components/book';
import Service from './components/service';
import Facility from './components/facility';
import './index.less'

export default class Index extends Component<PropsWithChildren> {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='m-index'>
        <View className='bg'></View>
        <View className='u-title'>
          <View className='cover'></View>
        </View>
        
        <User />
        <Book />
        <Service />
        <Facility />

      </View>
    )
  }
}
