import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color} from '../../utiles/color';
import {shadow3, StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';

type NotificationItem = {
  id: string;
  title: string;
  description: string;
};

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: '1',
    title: 'Order Confirmed',
    description: 'Your order #12345 has been confirmed and is being prepared.',
  },
  {
    id: '2',
    title: 'Special Offer',
    description: 'Get 20% off on selected spirits this weekend only.',
  },
  {
    id: '3',
    title: 'Delivery Update',
    description: 'Your package is out for delivery and will arrive today.',
  },
  {
    id: '4',
    title: 'New Arrival',
    description: 'Check out the latest premium whiskey collection in our catalog.',
  },
];

function NotificationCard({
  item,
  styles,
  Styles,
}: {
  item: NotificationItem;
  styles: ReturnType<typeof StyleSheet.create>;
  Styles: ReturnType<typeof StyleComponent>['Styles'];
}) {
  return (
    <View style={styles.card}>
      <Text style={[Styles.title_SemiBold, styles.cardTitle]}>{item.title}</Text>
      <Text style={[Styles.subtitle_Regular, styles.cardDescription]}>
        {item.description}
      </Text>
    </View>
  );
}

export default function NotificationScreen() {
  const {Styles} = StyleComponent();

  return (
    <View style={styles.container}>
      <CustomHeader showBack subTitle="Notifications" />
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <NotificationCard item={item} styles={styles} Styles={Styles} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[Styles.h5_Medium, styles.emptyTitle]}>No notifications</Text>
            <Text style={[Styles.subtitle_Regular, styles.emptyDescription]}>
              You have no notifications at the moment.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
  },
  listContent: {
    paddingHorizontal: '3.5%',
    paddingTop: 12,
    paddingBottom: 24,
    flexGrow: 1,
  },
  card: {
    width: '100%',
    backgroundColor: Color.white,
    borderRadius: 14,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Color.lineGray,
    ...shadow3,
  },
  cardTitle: {
    color: Color.black,
    marginBottom: 6,
  },
  cardDescription: {
    color: Color.lightBlack,
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  emptyTitle: {
    color: Color.black,
    textAlign: 'center',
  },
  emptyDescription: {
    color: Color.gray,
    textAlign: 'center',
    marginTop: 8,
    width: '70%',
  },
});
