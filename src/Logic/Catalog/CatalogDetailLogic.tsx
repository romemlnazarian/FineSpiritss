// import { useCallback, useEffect, useState } from 'react'
// import { getProductDetailModel } from '../../model/Catalog/Catalog';
// import useAuthStore from '../../zustland/AuthStore';
// import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
// import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';
// import { getHomeRecommendedModel } from '../../model/Home/HomeAdvertising';

// export default function CatalogDetailLogic(route: any) {
//     const [product, setProduct] = useState(null);
//     const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
//     const [isLoading, setIsLoading] = useState(false);
//     const [isFavorite, setIsFavorite] = useState(false);
//     const [recommended, setRecommended] = useState([]);
//     useEffect(() => {
//         getProductDetail()
//         getHomeRecommended();
//     }, [route?.route?.params?.product, getHomeRecommended]);


//    const getProductDetail = useCallback(async () => {
//     setIsLoading(true);
//       getProductDetailModel(token, route?.route?.params?.product?.slug, (data) => {
//         setIsLoading(false);
//         setProduct(data);
//         console.log('data =======>=>', data);
//         setIsFavorite(data?.is_favorite);
//     }, (error) => {
//         setIsLoading(false);
//         refreshTokenModel(refreshToken, (data) => {
//             setToken(data.access);
//             setRefreshToken(data.refresh);
//             getProductDetailModel(data.access, route?.route?.params?.product?.slug, (data) => {
//                 setProduct(data);
//                 setIsFavorite(data?.is_favorite);
//             }, (error) => {
//                 console.log('error =>', error);
//             });
//         }, (error) => {
//             console.log('error =>', error);
//         });
//     });
//    }, [route?.route?.params?.product?.id]);



//    const toggleFavorite = (id:any) => {
//     if (isFavorite) {
//         setIsFavorite(false);
//         DeleteFavoriteProductModel(
//           token,
//           id,
//           () => {
//             getHomeRecommended()
//           },
//           error => {
//             console.log('error', error);
//           },
//           () => {
//             refreshTokenModel(
//               refreshToken,
//               data => {
//                 DeleteFavoriteProductModel(
//                   data.access,
//                   id,
//                   data => {
//                     getHomeRecommended()
//                     console.log('data', data);
//                   },
//                   error => {
//                     console.log('error', error);
//                   },
//                 );
//               },
//               () => {},
//             );
//           },
//         );
//       } else {
//         setIsFavorite(true);
//         AddFavoriteProductModel(
//           token,
//           id,
//            () => {
//             getHomeRecommended()
//             setIsFavorite(true);
//           },
//           error => {
//             console.log('error', error);
//           },
//           () => {
//             refreshTokenModel(
//               refreshToken,
//               data => {
//                 AddFavoriteProductModel(
//                   data.access,
//                   id,
//                   () => {
//                     getHomeRecommended()
//                   },
//                   () => {},
//                   () => {},
//                 );
//               },
//               () => {},
//             );
//           },
//         );
//       }
//    };

//    const getHomeRecommended = () => {
//     getHomeRecommendedModel(
//       token,
//       data => {
//         const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
//         setRecommended(items);
//       },
//       () => {
//         refreshTokenModel(
//           refreshToken,
//           refreshedTokens => {
//             setToken(refreshedTokens.access);
//             setRefreshToken(refreshedTokens.refresh);
//             getHomeRecommendedModel(
//               refreshedTokens.access,
//               data => {
//                 const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
//                 setRecommended(items);
//               },
//               () => {},
//             );
//           },
//           () => {},
//         );
//       },
//     );
//   };
  


//     return {
//         product,
//         isLoading,
//         isFavorite,
//         toggleFavorite,
//         recommended,
//     }
// }


import { useCallback, useEffect, useState } from 'react';
import { getProductDetailModel } from '../../model/Catalog/Catalog';
import useAuthStore from '../../zustland/AuthStore';
import { refreshTokenModel } from '../../model/Auth/RefreshTokenModel';
import { AddFavoriteProductModel, DeleteFavoriteProductModel } from '../../model/Favorite/Favorite';
import { getHomeRecommendedModel } from '../../model/Home/HomeAdvertising';
import { useToast } from '../../utiles/Toast/ToastProvider';
import { addCardModel, deleteCardModel, updateCardModel } from '../../model/Card/CardModel';

export default function CatalogDetailLogic(route: any) {
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [recommended, setRecommended] = useState([]);
  const { token, refreshToken, setToken, setRefreshToken } = useAuthStore();
  const [count, setCount] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(false);
  const {show} = useToast();

  
  // Get product detail
  const getProductDetail = useCallback(() => {
    console.log('route?.route?.params?.product?.slug =>', route?.route?.params?.product?.slug,token);
    setIsLoading(true);
    getProductDetailModel(token, route?.route?.params?.product?.slug, data => {
      console.log('dataaaaaaaaaa =>', data);
      setProduct(data);
      setCount(data?.cart_quantity)
      setIsFavorite(data?.is_favorite);
      setIsLoading(false);
    },
    (error)=>{
      console.log('error =>', error);
      setIsLoading(false);
    }, 
    () => {
      refreshTokenModel(refreshToken, tokens => {
        setToken(tokens.access);
        setRefreshToken(tokens.refresh);
        console.log('tokens =>', tokens);
        // getProductDetailModel(tokens.access, route?.route?.params?.product?.slug, data => {
        //   console.log('dataaaaaaaaaa =>', data);
        //   setProduct(data);
        //   setIsFavorite(data?.is_favorite);
        //   setCount(data?.cart_quantity)
        //   setIsLoading(false);
        // }, err => console.log('error', err));
      }, err => console.log('error', err));
    });
  }, [token, refreshToken, route?.route?.params?.product?.slug, setToken, setRefreshToken]);

  // Get recommended products
  const getHomeRecommended = useCallback(() => {
    getHomeRecommendedModel(token, data => {
      const items = Array.isArray(data?.results) ? data.results : [];
      setRecommended(items);
    }, () => {
      refreshTokenModel(refreshToken, tokens => {
        setToken(tokens.access);
        setRefreshToken(tokens.refresh);
        getHomeRecommendedModel(tokens.access, data => {
          const items = Array.isArray(data?.results) ? data.results : [];
          setRecommended(items);
        }, err => console.log('error', err));
      });
    });
  }, [token, refreshToken, setToken, setRefreshToken]);

  // Refresh both product and recommended
  const refreshAll = useCallback(() => {
    getProductDetail();
    getHomeRecommended();
  }, [getProductDetail, getHomeRecommended]);

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    if (isFavorite) {
      DeleteFavoriteProductModel(token, id, () => {
        setIsFavorite(false);
        refreshAll();
      }, err => console.log('error', err), () => {
        refreshTokenModel(refreshToken, tokens => {
          DeleteFavoriteProductModel(tokens.access, id, () => {
            setIsFavorite(false);
            refreshAll();
          }, err => console.log('error', err));
        });
      });
    } else {
      AddFavoriteProductModel(token, id, () => {
        setIsFavorite(true);
        refreshAll();
      }, err => console.log('error', err), () => {
        refreshTokenModel(refreshToken, tokens => {
          AddFavoriteProductModel(tokens.access, id, () => {
            setIsFavorite(true);
            refreshAll();
          }, err => console.log('error', err));
        });
      });
    }
  };

  useEffect(() => {
    refreshAll();
  }, [refreshAll]);



  const onClick = (value: number, type: string) => {
    if (type === 'inc') {
      setVisible(true);
      updateCardModel(
        token,
        product.id,
        value,
        () => {
          setCount(value);
          setVisible(false);
        },
        (error: string) => {
          setVisible(false);
          show(error, {type: 'error'});
        },
        () => {
          refreshTokenModel(
            refreshToken,
            refreshedTokens => {
              setToken(refreshedTokens.access);
              setRefreshToken(refreshedTokens.refresh);
              updateCardModel(
                refreshedTokens.access,
                product.id,
                value,
                () => {
                  setCount(value);
                  setVisible(false);
                },
                (error: string) => {
                  setVisible(false);
                  show(error, {type: 'error'});
                },
                () => {
                  setVisible(false);
                },
              );
            },
            () => {
              setVisible(false);
            },
          );
        },
      );
    } else {
      setVisible(true);
      if (value < 1) {
        deleteCardModel(
          token,
          product.id,
          () => {
            setCount(value);
            setVisible(false);
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                deleteCardModel(
                  refreshedTokens.access,
                  product.id,
                  () => {
                    setCount(value);
                    setVisible(false);
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      } else {
        updateCardModel(
          token,
          product.id,
          value,
          () => {
            setCount(value);
            setVisible(false);
          },
          (error: string) => {
            setVisible(false);
            show(error, {type: 'error'});
          },
          () => {
            refreshTokenModel(
              refreshToken,
              refreshedTokens => {
                setToken(refreshedTokens.access);
                setRefreshToken(refreshedTokens.refresh);
                updateCardModel(
                  refreshedTokens.access,
                  product.id,
                  value,
                  () => {
                    setCount(value);
                    setVisible(false);
                  },
                  (error: string) => {
                    setVisible(false);
                    show(error, {type: 'error'});
                  },
                  () => {
                    setVisible(false);
                  },
                );
              },
              () => {
                setVisible(false);
              },
            );
          },
        );
      }
    }
  };

  const onSubmit = () => {
    setVisible(true);
    addCardModel(
      token,
      product.id,
      () => {
        setCount(1);
        setVisible(false);
      },
      (error: string) => {
        setVisible(false);
        show(error, {type: 'error'});
      },
      () => {
        refreshTokenModel(
          refreshToken,
          refreshedTokens => {
            setToken(refreshedTokens.access);
            setRefreshToken(refreshedTokens.refresh);
            addCardModel(
              refreshedTokens.access,
              product.id,
              () => {
                setCount(1);
                setVisible(false);
              },
              (error: string) => {
                setVisible(false);
                show(error, {type: 'error'});
              },
              () => {
                setVisible(false);
              },
            );
          },
          () => {
            setVisible(false);
          },
        );
      },
    );
  };

const onSubmitDetail = (value:any) =>{
  setIsLoading(true);
  getProductDetailModel(token, value.slug, data => {
    setProduct(data);
    setCount(data?.cart_quantity)
    setIsFavorite(data?.is_favorite);
    setIsLoading(false);
  }, () => {
    refreshTokenModel(refreshToken, tokens => {
      setToken(tokens.access);
      setRefreshToken(tokens.refresh);
      getProductDetailModel(tokens.access, value.slug, data => {
        setProduct(data);
        setIsFavorite(data?.is_favorite);
        setCount(data?.cart_quantity)
        setIsLoading(false);
      }, err => console.log('error', err));
    }, err => console.log('error', err));
  });
}

  return {
    product,
    isLoading,
    isFavorite,
    toggleFavorite,
    recommended,
    refreshAll,
    onClick,
    onSubmit,
    count,
    visible,
    onSubmitDetail
  };
}
