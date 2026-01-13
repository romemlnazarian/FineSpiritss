import { View, Text, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React, { Fragment, useEffect, useState } from 'react'
import { StyleComponent } from '../../utiles/styles'
import CustomHeader from '../../navigation/CustomHeader'
import { Color } from '../../utiles/color'
import Email from '../../assets/svg/Email.svg';
import Telegram from '../../assets/svg/Telegram.svg';
import Whatsapp from '../../assets/svg/Whatsapp.svg';
import Facebook from '../../assets/svg/FacebookIcon.svg';
import Instagram from 'react-native-vector-icons/FontAwesome';
import { getSupportModel } from '../../model/Setting/SettingModel'
import useAuthStore from '../../zustland/AuthStore'
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel'
import AddressIcon from 'react-native-vector-icons/FontAwesome';
import ThreadsIcon from '../../assets/svg/Threads.svg';
import PhoneIcon from 'react-native-vector-icons/SimpleLineIcons';
import WebsiteIcon from 'react-native-vector-icons/Ionicons';

export default function SupportServiceScreen() {
  const {Styles} = StyleComponent();
const {token,refreshToken, setToken, setRefreshToken} = useAuthStore();

const [support, setSupport] = useState<any>(null);
useEffect(() => {
  getSupportModel(token, (data) => {
    setSupport(data);
    console.log('dataaaaa =>', data);
  }, (error) => {
    console.log('error =>', error);
  }, () => {
    refreshTokenModel(refreshToken, (data) => {
      setToken(data.access);
      setRefreshToken(data.refresh);
      getSupportModel(token, (data) => {
        setSupport(data);
        console.log('dataaaaaa =>', data);
      }, (error) => {
        console.log('error =>', error);
      });
    });

  });
}, []);
const data = [
  {
    id: 1,
    title: 'Email address',
    discription:support?.support_email,
    icon: <Email/>,
    key:'email',
  },
  {
    id: 2,
    title: 'Phone number',
    discription:support?.phone,
    icon: <PhoneIcon name="phone" size={20} color={Color.black}/>,
    key:'phone',
  },
  {
    id: 3,
    title: 'Address',
    discription:support?.address,
    icon: <AddressIcon name="address-book-o" size={22} color={Color.black}/>,
    key:'address',
  },
  {
    id: 4,
    title: 'Telegram',
    discription:support?.telegram_username,
    icon: <Telegram/>,
    key:'telegram',
  },
  {
    id: 5,
    title: 'Whatsapp',
    discription:support?.whatsapp_phone,
    icon: <Whatsapp/>,
    key:'whatsapp',
  },
];
const dataTwo = [
  {
    id: 1,
    title: 'Web Site',
    discription:"Finespirits",
    icon: <WebsiteIcon name="earth" size={25} color={Color.black}/>,
    key:'WebsiteIcon',
  },
  {
    id: 2,
    title: 'Facebook',
    discription:"Finespirits",
    icon: <Facebook/>,
    key:'facebook',
  },
    {
      id: 3,
      title: 'Instagram',
      discription:"Finespirits",
      icon: <Instagram name="instagram" size={25} color={Color.black}/>,
      key:'instagram',
    },
    {
      id: 4,
      title: 'Threads',
      discription:"Finespirits",
      icon: <ThreadsIcon/>,
      key:'threads',
     
    },
];

const onSubmit = (key:string)=>{
  switch(key){  
     case 'email':
      Linking.openURL(`mailto:${support?.support_email}`);
      break;
      case 'phone':
      Linking.openURL(`tel:${support?.phone}`);
      break;
    case 'WebsiteIcon':
      Linking.openURL(`${support?.website_url}`);
      break;
    case 'address':
      Linking.openURL(`${support?.address_map_url}`);
      break;
    case 'telegram':
      Linking.openURL(`${support?.telegram_url}`);
      break;
    case 'whatsapp':
      Linking.openURL(`${support?.whatsapp_url}`);
      break;
    case 'facebook':
      Linking.openURL(`${support?.facebook_url}`);
      break;
    case 'instagram':
      Linking.openURL(`${support?.instagram_url}`);
      break;
    case 'threads':
      Linking.openURL(`${support?.threads_url}`);
      break;
    default:
      break;
 }
}
  return (
    <ScrollView style={Styles.container}>
      <CustomHeader showBack={true} title="Support Service" />
      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <TouchableOpacity
            activeOpacity={0.5}
              onPress={()=>onSubmit(item.key)}
              key={item.id}
              style={styles.rowGap10Center}>
                {item.icon}
                <View style={{gap:5}}>
                <Text style={Styles.title_Medium}>{item.title}</Text>
                <Text style={[Styles.title_Regular,{color:Color.gray,width:item.id === 3 ? '98%' : '100%'}]}>{item.discription}</Text>
                </View>
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
      <View style={[styles.section, {marginBottom: 10}]}>
        {dataTwo.map(item => (
          <Fragment key={item.id}>
               <TouchableOpacity
              activeOpacity={0.5}
              onPress={()=>onSubmit(item.key)}
              key={item.id}
              style={styles.rowGap10Center}>
                {item.icon}
                <View style={{gap:5}}>
                <Text style={Styles.title_Medium}>{item.title}</Text>
                <Text style={[Styles.title_Regular,{color:Color.gray}]}>{item.discription}</Text>
                </View>
            </TouchableOpacity>
          </Fragment>
        ))}
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
    section: {
        width: '93%',
        alignSelf: 'center',
        marginTop: '5%',
        backgroundColor: Color.white,
        padding: 10,
        borderRadius: 10,
        gap: 20,
        paddingVertical: 15,
      },
      rowGap10Center: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      },

});