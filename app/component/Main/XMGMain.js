/**
 * Created by barry on 2017/6/5.
 */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,

    Platform,//判断当前运行的系统
} from 'react-native';
import {
    Navigator,//进行页面之间的跳转
} from 'react-native-deprecated-custom-components';
import TabNavigator from 'react-native-tab-navigator';
import Home from '../Home/XMGHome'
import Shop from '../Shop/XMGShop'
import Mine from '../Mine/XMGMine'
import More from '../More/XMGMore'
export default class Main extends Component{
    //这里的Main是一个二级路由，和Index一样
    constructor(props){
        super(props)
        this.state = {selectedTab:'home'}
    }
    render(){
        let argsHome = ['首页','icon_tabbar_homepage','icon_tabbar_homepage_selected','home','首页',Home];
        let argsShop = ['商家', 'icon_tabbar_merchant_normal', 'icon_tabbar_merchant_selected','shop', '商家', Shop];
        let argsMine = ['我的', 'icon_tabbar_mine', 'icon_tabbar_mine_selected','mine', '我的', Mine, 2];
        let argsMore = ['更多', 'icon_tabbar_misc', 'icon_tabbar_misc_selected','more', '更多', More];
        return(
            <TabNavigator>
                {/*首页*/}
                {this.initTabNavigatorItem(...argsHome)}
                {/*--商家--*/}
                {this.initTabNavigatorItem(...argsShop)}
                {/*--我的--*/}
                {this.initTabNavigatorItem(...argsMine)}
                {/*--更多--*/}
                {this.initTabNavigatorItem(...argsMore)}

            </TabNavigator>
        );
    }

    // 每一个TabNavigatorItem
    initTabNavigatorItem(title, iconName, selectedIconName, selectedTab, componentName, component, badgeText){
        return(
            <TabNavigator.Item
                title= {title}//如果这里传递的是变量，一定要加{}
                renderIcon={() => <Image source={{uri: iconName}} style={styles.iconStyle} />}
                renderSelectedIcon={() => <Image source={{uri: selectedIconName}} style={styles.iconStyle}/>}
                // badgeText="1"
                onPress={()=>{this.setState({selectedTab:selectedTab})}}
                selected={this.state.selectedTab === selectedTab}
                selectedTitleStyle={styles.selectedTitleStyle}
                badgeText = {badgeText}

            >
                <Navigator
                    initialRoute={{name:componentName,component:component}}
                    configureScene={()=>{// 过渡动画
                        return Navigator.SceneConfigs.PushFromRight;
                    }}
                    renderScene={(route,navigator)=>{
                        let Component = route.component;
                        // return <Component {...route.passProps} navigator={navigator}/>;
                        //{...route}最优的方案：传这个就行了，这样就可以直接通过.params或者.passProps,或者是.方法名进行回调了
                        return <Component {...route.params} {...route.passProps} {...route} navigator={navigator}/>;
                    }}
                />
            </TabNavigator.Item>
        )
    }

}
const styles = StyleSheet.create({
    iconStyle:{
        width:Platform.OS === 'ios' ? 30: 30,
        height:Platform.OS === 'ios' ? 30: 30,
    },
    selectedTitleStyle:{
        color:'orange'
    },


});