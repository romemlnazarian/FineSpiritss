import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogLogic from '../../logic/Catalog/CatalogLogic';
import {useNavigation} from '@react-navigation/native';
import {Language} from '../../utiles/Language/i18n';
import { resolveMediaUrl } from '../../utiles/mediaUrl';

const CategoryScreen = memo(() => {
  const {Styles} = StyleComponent();
  const {unSubmit, catalog, loadMore, isLoadingMore, isInitialLoading} =
    CatalogLogic();
  const navigation = useNavigation();

  const renderCategoryItem = useCallback(
    ({item}: {item: any}) => {
      return (
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => unSubmit(item)}
          activeOpacity={0.7}>
          {item.cat_image ? (
            <ImageBackground
              source={{uri: resolveMediaUrl(item.cat_image)}}
              style={styles.categoryImageBackground}
              imageStyle={styles.categoryImage}
              resizeMode="cover">
              <Text style={styles.categoryTitle}>{item.cat_name}</Text>
            </ImageBackground>
          ) : (
            <Text style={[styles.categoryTitle, styles.categoryTitleFallback]}>
              {item.cat_name}
            </Text>
          )}
        </TouchableOpacity>
      );
    },
    [unSubmit],
  );

  const listFooter = useMemo(() => {
    if (!isLoadingMore) {
      return null;
    }
    return (
      <View style={styles.footerLoading}>
        <ActivityIndicator size="small" color={Color.primary} />
      </View>
    );
  }, [isLoadingMore]);

  const listEmptyComponent = useMemo(() => {
    if (!isInitialLoading) {
      return null;
    }
    return (
      <View style={styles.initialLoader}>
        <Text style={styles.loadingText}>{Language.catalog_loading_categories}</Text>
      </View>
    );
  }, [isInitialLoading]);

  return (
    <View style={[Styles.container]}>
      <CustomHeader
        showBack={true}
        title={Language.catalog_title}
        onSubmitBack={() => navigation.getParent()?.navigate('Home' as never)}
      />
      <View style={styles.topSpacer} />
       <FlatList
        data={catalog}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) =>
          item?.id ? item.id.toString() : `cat-${index}`
        }
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.rowStyle}
        removeClippedSubviews={true}
        maxToRenderPerBatch={4}
        windowSize={10}
        initialNumToRender={6}
        updateCellsBatchingPeriod={50}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={listFooter}
        ListEmptyComponent={listEmptyComponent}
      />
    </View>
  );
});

export default CategoryScreen;

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: Color.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    color: Color.gray,
  },
  listContainer: {
    width:'93%',
    alignSelf:'center',
  },
  topSpacer: {
    marginTop: '5%',
  },
  rowStyle: {
    justifyContent: 'flex-start',
    gap: '4%',
    marginBottom: 10,
  },
  categoryItem: {
    width: '48%',
    height: 130,
    backgroundColor: Color.white,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: Color.lightGray,
  },
  categoryImageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  categoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    fontSize: 14,
    marginTop: 14,
    marginLeft: 15,
    color: Color.white,
    width: '40%',
    lineHeight: 25,
  },
  categoryTitleFallback: {
    color: Color.black,
  },
  categoryDescription: {
    color: Color.gray,
    marginBottom: 8,
    lineHeight: 18,
  },
  productCount: {
    color: Color.primary,
  },
  categoryImage: {
    borderRadius: 12,
  },
  initialLoader: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
  },
  loadingText: {
    marginTop: 8,
    color: Color.black,
  },
  footerLoading: {
    paddingVertical: 16,
  },
});
