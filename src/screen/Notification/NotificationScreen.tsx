import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Color} from '../../utiles/color';
import {shadow3, StyleComponent} from '../../utiles/styles';
import CustomHeader from '../../navigation/CustomHeader';
import NotificationLogic, {
  NotificationItem,
} from '../../logic/Notification/Notification';
import { Language } from '../../utiles/Language/i18n';

function NotificationCard({
  item,
  styles,
  Styles,
}: {
  item: NotificationItem;
  styles: ReturnType<typeof StyleSheet.create>;
  Styles: ReturnType<typeof StyleComponent>['Styles'];
}) {
  const [expanded, setExpanded] = useState(false);
  const [isTitleTruncated, setIsTitleTruncated] = useState(false);
  const [isTextTruncated, setIsTextTruncated] = useState(false);
  const showMore = isTitleTruncated || isTextTruncated;

  return (
    <View style={styles.card}>
      <Text
        style={[styles.hiddenMeasure, Styles.title_SemiBold]}
        onTextLayout={e => {
          setIsTitleTruncated(e.nativeEvent.lines.length > 1);
        }}>
        {item.title}
      </Text>
      <Text
        style={[Styles.title_SemiBold, styles.cardTitle]}
        numberOfLines={expanded ? undefined : 1}>
        {item.title}
      </Text>
      <Text
        style={[styles.hiddenMeasure, Styles.subtitle_Regular]}
        onTextLayout={e => {
          setIsTextTruncated(e.nativeEvent.lines.length > 2);
        }}>
        {item.text}
      </Text>
      <Text
        style={[Styles.subtitle_Regular, styles.cardDescription]}
        numberOfLines={expanded ? undefined : 2}>
        {item.text}
      </Text>
      {showMore && (
        <TouchableOpacity
          onPress={() => setExpanded(prev => !prev)}
          hitSlop={{top: 8, bottom: 8, left: 8, right: 8}}>
          <Text style={[Styles.subtitle_SemiBold, styles.moreText]}>
            {expanded ? Language.notification_less : Language.notification_more}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default function NotificationScreen() {
  const {Styles} = StyleComponent();
  const {notifications, loading} = NotificationLogic();

  if (loading) {
    return (
      <View style={[styles.container, styles.loader]}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CustomHeader showBack subTitle="Notifications" />
      <FlatList
        data={notifications}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <NotificationCard item={item} styles={styles} Styles={Styles} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[Styles.title_SemiBold, styles.emptyTitle]}>{Language.notification_title}</Text>
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
  loader: {
    justifyContent: 'center',
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
  hiddenMeasure: {
    position: 'absolute',
    opacity: 0,
    zIndex: -1,
    width: '100%',
    lineHeight: 20,
  },
  moreText: {
    color: Color.primary,
    marginTop: 4,
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
    // width: '80%',
  },
});
