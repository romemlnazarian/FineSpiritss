import {
  ScrollView,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import React from 'react';
import {StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import OrderHistoryLogic from '../../logic/Setting/OrderHistoryLogic';
import {Color} from '../../utiles/color';
import Arrow from 'react-native-vector-icons/MaterialIcons';
import Vector from '../../assets/svg/Vector.svg';
import HorizontalFlatList from '../../component/HorizontalFlatList';
import {useNavigation} from '@react-navigation/native';
import {Language} from '../../utiles/Language/i18n';
const toDateOnly = (value: unknown): string => {
  if (value == null) {
    return '';
  }
  const s = String(value).trim();
  if (!s) {
    return '';
  }
  // Handles: "2025-12-23T10:20:30Z" or "2025-12-23 10:20:30"
  return s.split('T')[0].split(' ')[0];
};

export default function OrderHistoryScreent() {
  const {onHandlerDetail, orderHistory, loading, recommended, refreshAll} =
    OrderHistoryLogic();
  const {Styles, Height} = StyleComponent();
  const navigation = useNavigation<any>();

  return (
    <View style={[Styles.container]}>
      <CustomHeader showBack={true} subTitle={Language.profile_my_orders} />
      {/* {orderHistory.length > 0 && (
        <View
          style={{
            width: '90%',
            justifyContent: 'center',
            alignItems: 'flex-start',
            alignSelf: 'center',
          }}>
          <Text style={[Styles.title_Regular,{marginLeft:'2%',color:Color.gray}]}>
            {orderHistory.length} orders
          </Text>
        </View>
      )} */}
      <ScrollView>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={Color.primary}
            style={{marginTop: Height / 2.5}}
          />
        ) : orderHistory.length === 0 ? (
          <View style={[Styles.container]}>
            <View
              style={[
                Styles.alignCenter,
                Styles.alignSelf,
                {width: '93%', marginTop: '12%'},
              ]}>
              <Vector fill={Color.black} />
              <Text style={[Styles.h5_Bold, {marginTop: '5%'}]}>
                {Language.setting_order_empty_title}
              </Text>
              <Text
                style={[Styles.body_Regular, Styles.textAlign, {width: '58%'}]}>
                {Language.setting_order_empty_subtitle}
              </Text>
            </View>
            <View style={[Styles.alignSelf, {width: '93%', marginTop: '10%'}]}>
              <Text style={[Styles.h4_Bold, {color: Color.black}]}>
                {Language.profile_recommendations}
              </Text>
              <HorizontalFlatList
                callback={e =>
                  navigation.navigate('CatalogScreen', {
                    screen: 'CatalogDetail',

                    params: {product: e, fromSetting: true},
                  })
                }
                products={recommended}
                onFavoriteToggled={(_id: string, _isFavorite: boolean) =>
                  refreshAll()
                }
              />
            </View>
          </View>
        ) : (
          orderHistory.map((item: any) => (
            <TouchableOpacity
              activeOpacity={0.5}
              key={item.order_number}
              style={[Styles.card, styles.cardItem,Styles.alignCenter]}
              onPress={() => onHandlerDetail(item.order_number)}>
                <Image source={{uri: item?.image_url}} style={styles.orderInfoContainer} />
              <View style={styles.columnGap}>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {Language.setting_order_date_label}:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {toDateOnly(item.date)}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {Language.setting_order_status_label}:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {item.status}
                  </Text>
                </View>
                <View style={styles.rowGap}>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {Language.setting_order_total_price_label}:
                  </Text>
                  <Text style={[Styles.subtitle_Regular, {color: Color.black}]}>
                    {item.total} zł
                  </Text>
                </View>
              </View>
              <Arrow
                name="keyboard-arrow-right"
                size={30}
                color={Color.black}
                style={styles.arrowIcon}
              />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      {/* <CatalogFilter
        onHandler={e => onSubnmitFilter(e)}
        sortData={defaultSortData}
        arrow={true}
      />
      <CatalogList
        item={sortData}
        onHandlerItem={onHandlerDetail}
        orderBottom={true}
      /> */}
      {/* <BottomSheet
        modalVisible={filterVisible}
        height={350}
        onClose={() => setFilterVisible(false)}>
        {title === 'filter' ? (
          <ShowBySetting onCallback={onAddSelected} selectedIds={showById} />
        ) : title.toLocaleLowerCase() === 'status' ? (
          <StatusSetting onCallback={onAddSelected} selectedIds={statusId} />
        ) : (
          <PerioudSetting onCallback={onAddSelected} selectedIds={periodId} />
        )}
      </BottomSheet> */}
    </View>
  );
}

const styles = StyleSheet.create({
  cardItem: {gap: 10},
  columnGap: {flexDirection: 'column' as const, gap: 6},
  rowGap: {flexDirection: 'row' as const, gap: 5},
  orderInfoContainer: {
    width: 80,
    height: 80,
    backgroundColor: Color.background,
  },
  arrowIcon: {
    position: 'absolute',
    right: 10,
  },
});
