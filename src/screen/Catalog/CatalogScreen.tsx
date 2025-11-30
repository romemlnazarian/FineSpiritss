import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';
import React, {memo, useCallback, useMemo} from 'react';
import {StyleComponent} from '../../utiles/styles';
import {Color} from '../../utiles/color';
import CustomHeader from '../../navigation/CustomHeader';
import CatalogLogic from '../../logic/Catalog/CatalogLogic';
import {useNavigation} from '@react-navigation/native';

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
          {item.cat_image && (
            <Image
              source={{
                uri: item.cat_image,
              }}
              resizeMode="contain"
              style={styles.categoryImage}
            />
          )}
          <Text style={styles.categoryTitle} numberOfLines={1} ellipsizeMode="tail">{item.cat_name}</Text>
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
        <Text style={styles.loadingText}>Loading categories...</Text>
      </View>
    );
  }, [isInitialLoading]);

  return (
    <View style={[Styles.container]}>
      <CustomHeader
        showBack={true}
        title="Catalog"
        onSubmitBack={() => navigation.getParent()?.navigate('Home' as never)}
      />
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
    paddingBottom: 20,
  },
  rowStyle: {
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  categoryItem: {
    width: '45%',
    height: 130,
    backgroundColor: Color.white,
    borderRadius: 12,
    padding: 16,
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  categoryTitle: {
    color: Color.black,
    fontSize: 16,
    fontWeight: 'bold',
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
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  initialLoader: {
    width: '100%',
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 8,
    color: Color.black,
  },
  footerLoading: {
    paddingVertical: 16,
  },
});
