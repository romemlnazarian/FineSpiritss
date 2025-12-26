import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {Color} from '../../utiles/color';
import {StyleComponent} from '../../utiles/styles';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';


type LocalTabButtonProps = {
  active?: boolean;
  onPress?: () => void;
  style?: any;
  image?: string;
};

const TabButton = ({
  active = false,
  onPress,
  style,
  image,
}: LocalTabButtonProps) => {
  const {Styles} = StyleComponent();
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.tabContainer,
        active ? styles.tabActive : styles.tabInactive,
        style,
      ]}>
      <View style={[Styles.justifyCenter]}>
        {image ? (
          <Image
            source={{uri: image}}
            style={styles.productImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.imagePlaceholder} />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function MyOrderItem({data}:{data:any}) {
  const {Styles} = StyleComponent();

  const [activeIndex, setActiveIndex] = useState<number>(data[0]?.id);
  const selected = data?.find((t:any) => t.id === activeIndex);
  const navigation = useNavigation<any>();

  const onSubmit = (product: any) => {
    if (!product) {
      return;
    }
    navigation.navigate('CatalogScreen', {
      screen: 'CatalogDetail',
      params: {product, fromSetting: true},
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabsRow}>
        {data?.map((e:any) => (
          <TabButton
            key={e.id}
            active={activeIndex === e.id}
            onPress={() => setActiveIndex(e.id)}
            style={styles.tabButton}
            image={e?.image_url}
          />
        ))}
      </View>

      <TouchableOpacity
        style={styles.productBlock}
        onPress={() => onSubmit(selected)}>
        <Text style={[Styles.body_Bold, styles.productTitle]}>
          {selected?.title || ''}
        </Text>
        <View style={styles.productMetaRow}>
          <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
            {selected?.country || ''}
          </Text>
          <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
            |
          </Text>
          <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
            ABV {selected?.abv || ''}
          </Text>
        </View>
        <View style={styles.productMetaRow}>
          <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
            volume:
          </Text>
          <Text style={[Styles.subtitle_Regular, {color: Color.gray}]}>
           {selected?.volume || ''}
          </Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.priceRow}>
          <Text style={[Styles.h6_SemiBold]}>{selected?.regular_price || ''} zł</Text>
          <Text style={[Styles.subtitle_Regular]}>Quantity x{selected?.quantity || ''}</Text>
        </View>
        <Arrow
          name="keyboard-arrow-right"
          size={30}
          color={Color.black}
          style={styles.arrowIcon}
        />
      </TouchableOpacity>


      {/* Order Status Card */}
      {/* <View style={styles.orderCard}>
        <Text style={[Styles.h4_SemiBold, Styles.textAlign]}>On the way</Text>
        <Text style={[Styles.subtitle_Regular, styles.planText]}>
          We plan to deliver on September 10th
        </Text>

        <View style={styles.statusCard}>
          <View style={[styles.stepContainer, styles.stepConfirmed]}>
            <View
              style={[
                styles.circle,
                styles.circleFixed,
                currentStep > 0 ? styles.circleDone : styles.circleCurrent,
              ]}>
              {currentStep > 0 ? (
                <Ionicons name="checkmark" size={20} color={Color.white} />
              ) : (
                <MaterialCommunityIcons
                  name="package-variant-closed"
                  size={20}
                  color={Color.white}
                />
              )}
            </View>
            <Text
              style={[
                Styles.subtitle_Medium,
                currentStep >= 0
                  ? styles.stepTextActive
                  : styles.stepTextInactive,
              ]}>
              Confirmed
            </Text>
          </View>

          <View style={[styles.connectorDashed, styles.connectorPrimary]} />

          <View style={[styles.stepContainer, styles.stepDelivery]}>
            <View
              style={[styles.circle, styles.circleFixed, styles.circleOutline]}>
              <MaterialCommunityIcons
                name="truck-delivery"
                size={20}
                color={Color.primary}
              />
            </View>
            <Text style={[Styles.subtitle_Medium, styles.stepTextActive]}>
              Delivery
            </Text>
          </View>

          <View style={[styles.connector, styles.connectorMuted]} />

          <View style={[styles.stepContainer, styles.stepDelivered]}>
            <View
              style={[
                styles.circle,
                styles.circleFixed,
                styles.circleUpcoming,
              ]}>
              <Ionicons name="location" size={20} color={Color.white} />
            </View>
            <Text style={[Styles.subtitle_Medium, styles.stepTextInactive]}>
              Delivered
            </Text>
          </View>
        </View>
      </View> */}

       {/* <View style={[styles.orderCard,{alignItems:'center',height:250}]}>
       <Text style={[Styles.h4_SemiBold, Styles.textAlign]}>Take your order from</Text>
        <Text style={[Styles.subtitle_Regular, styles.planText]}>
        Cybernetyki 17, 02-677 Warszawa
        </Text>
        <View style={{marginTop:'5%'}}>
        <HomeTwo/>
        </View>
         <BottomCardComponent title="My Code" onHandler={()=>{}} style={styles.button} textStyle={styles.buttonText}/>
       </View> */}

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.background,
    paddingVertical: 12,
  },
  button:{
    width:'90%',
    alignSelf:'center',
    marginTop:'5%',
    backgroundColor:Color.white,
  },
  buttonText:{
    color:Color.primary,
  },
  tabsRow: {
    backgroundColor: Color.white,
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tabButton: {
    margin: 8,
  },
  tabContainer: {
    width: 100,
    height: 150,
    borderRadius: 12,
    marginLeft: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  tabActive: {
    backgroundColor: Color.white,
    borderColor: Color.primary,
  },
  tabInactive: {
    backgroundColor: Color.background,
    borderColor: 'transparent',
  },
  activeIndexLabel: {
    alignSelf: 'center',
    marginTop: 8,
  },
  statusCard: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '5%',
  },
  productBlock: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Color.white,
  },
  productTitle: {
    marginLeft: '5%',
  },
  productMetaRow: {
    flexDirection: 'row',
    gap: 10,
    marginLeft: '5%',
  },
  divider: {
    height: 1,
    backgroundColor: Color.lightGray,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  priceRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: '2%',
    alignItems: 'center',
    marginLeft: '5%',
    marginBottom:10,
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  orderCard: {
    width: '93%',
    alignSelf: 'center',
    marginTop: 16,
    padding: 16,
    backgroundColor: Color.white,
    borderRadius: 16,
    position: 'relative',
    height: 180,
  },
  planText: {
    color: Color.gray,
    marginTop: 4,
    textAlign: 'center',
  },
  circleFixed: {
    width: 44,
    height: 44,
    borderRadius: 44,
  },
  stepConfirmed: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 1,
  },
  stepDelivery: {
    position: 'absolute',
    left: '40%',
    top: 0,
    zIndex: 1,
  },
  stepDelivered: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
  connectorPrimary: {
    borderTopColor: Color.primary,
  },
  connectorMuted: {
    borderTopColor: '#D5D9E0',
  },

  stepContainer: {
    alignItems: 'center',
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: {
    backgroundColor: Color.primary,
  },
  circleCurrent: {
    backgroundColor: Color.primary,
  },
  circleOutline: {
    backgroundColor: Color.white,
    borderWidth: 2,
    borderColor: Color.primary,
  },
  circleUpcoming: {
    backgroundColor: '#C8CFD8',
  },
  connector: {
    width: '35%',
    height: 0,
    borderTopWidth: 2,
    alignSelf: 'center',
    marginHorizontal: 8,
    marginRight: '20%',
    marginTop: '5%',
  },
  connectorDashed: {
    borderStyle: 'dashed',
    width: '30%',
    height: 0,
    borderTopWidth: 2,
    alignSelf: 'center',
    marginHorizontal: 8,
    marginLeft: '15%',
    marginTop: '5%',
  },
  stepTextActive: {
    color: Color.black,
    marginTop: 8,
  },
  stepTextInactive: {
    color: '#B4BAC2',
    marginTop: 8,
  },
  productImage: {
    width: 90,
    height: 130,
    borderRadius: 12,
  },
  imagePlaceholder: {
    width: 90,
    height: 130,
    borderRadius: 12,
    backgroundColor: Color.lightGray,
  },
});
