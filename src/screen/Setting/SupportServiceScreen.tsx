import { View, Text, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import { StyleComponent } from '../../utiles/styles'
import CustomHeader from '../../navigation/CustomHeader'
import { Color } from '../../utiles/color'
import Email from '../../assets/svg/Email.svg';
import Telegram from '../../assets/svg/Telegram.svg';
import Whatsapp from '../../assets/svg/Whatsapp.svg';
import Facebook from '../../assets/svg/FacebookIcon.svg';
import Instagram from 'react-native-vector-icons/FontAwesome';
const data = [
    {
      id: 1,
      title: 'Email address',
      discription:"support@example.com",
      icon: <Email/>,

    },
    {
      id: 2,
      title: 'Telegram',
      discription:"+48 00 000 00 00",
      icon: <Telegram/>,
    },
    {
      id: 3,
      title: 'Whatsapp',
      discription:"+48 00 000 00 00",
      icon: <Whatsapp/>,
    },
  ];
  const dataTwo = [
    {
      id: 1,
      title: 'Facebook',
      discription:"@Finespirits",
      icon: <Facebook/>,
    },
    {
      id: 2,
      title: 'Email address',
      discription:"@Finespirits",
      icon: <Instagram name="instagram" size={25} />,
    },
  ];
export default function SupportServiceScreen() {
  const {Styles} = StyleComponent();
  return (
    <View style={Styles.container}>
      <CustomHeader showBack={true} title="Support Service" />
      <View style={styles.section}>
        {data.map(item => (
          <Fragment key={item.id}>
            <View
              key={item.id}
              style={styles.rowGap10Center}>
                {item.icon}
                <View style={{gap:5}}>
                <Text style={Styles.title_Regular}>{item.title}</Text>
                <Text style={[Styles.title_Regular,{color:Color.gray}]}>{item.discription}</Text>
                </View>
            </View>
          </Fragment>
        ))}
      </View>
      <View style={styles.section}>
        {dataTwo.map(item => (
          <Fragment key={item.id}>
               <View
              key={item.id}
              style={styles.rowGap10Center}>
                {item.icon}
                <View style={{gap:5}}>
                <Text style={Styles.title_Regular}>{item.title}</Text>
                <Text style={[Styles.title_Regular,{color:Color.gray}]}>{item.discription}</Text>
                </View>
            </View>
          </Fragment>
        ))}
      </View>
    </View>
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