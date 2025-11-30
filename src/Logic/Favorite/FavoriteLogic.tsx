import {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {getFavoriteProductsModel} from '../../model/Favorite/Favorite';
import useAuthStore from '../../zustland/AuthStore';
import {refreshTokenModel} from '../../model/Auth/RefreshTokenModel';
import { getHomeRecommendedModel } from '../../model/Home/HomeAdvertising';


// export default function FavoriteLogic() {
//   const {token, refreshToken, setToken, setRefreshToken} = useAuthStore();
//   const [favoriteProducts, setFavoriteProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [recommended, setRecommended] = useState([]);
// const getFavoriteProducts = useCallback(() => {
//   getHomeRecommended();
//   getFavoriteProductsModel(
//     token,
//     (data: any) => {
//       const items = Array.isArray(data) ? data : data?.results ?? [];
//       setFavoriteProducts(items);
//       setLoading(false);
//     },
//     (err: string) => {
//       console.log('error', err);
//     },
//     () => {
//       refreshTokenModel(
//         refreshToken,
//         newTokens => {
//           setToken(newTokens.access);
//           setRefreshToken(newTokens.refresh);
//           getFavoriteProductsModel(
//             newTokens.access,
//             (data: any) => {
//               const items = Array.isArray(data) ? data : data?.results ?? [];
//               setFavoriteProducts(items);
//             },
//             (err2: string) => {
//               setLoading(false);
//               console.log('error', err2);
//             },
//           );
//         },
//         (errRefresh: string) => {
//           setLoading(false);
//           console.log('error', errRefresh);
//         },
//       );
//     },
//   );
// }, [token, refreshToken, setToken, setRefreshToken]);





// useEffect(() => {
//   getFavoriteProducts();
//   getHomeRecommended();
// }, [getFavoriteProducts, getHomeRecommended]);

// useFocusEffect(
//   useCallback(() => {
//     getFavoriteProducts();
//     getHomeRecommended();
//     return () => {};
//   }, [getFavoriteProducts, getHomeRecommended]),
// );


// const getHomeRecommended = () => {
//   setLoading(true);
//   getHomeRecommendedModel(
//     token,
//     data => {
//       const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
//       setRecommended(items);
//       setLoading(false);
//     },
//     () => {
//       refreshTokenModel(
//         refreshToken,
//         refreshedTokens => {
//           setToken(refreshedTokens.access);
//           setRefreshToken(refreshedTokens.refresh);
//           getHomeRecommendedModel(
//             refreshedTokens.access,
//             data => {
//               const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
//               setRecommended(items);
//               setLoading(false);
//             },
//             () => {},
//           );
//         },
//         () => {},
//       );
//     },
//   );
// };

// const onSubmit = () => {
//   console.log('onSubmit');
//   getFavoriteProducts();
//   getHomeRecommended();
// };

//   return {
//     favoriteProducts,
//     loading,
//     getFavoriteProducts,
//     recommended,
//     onSubmit
//   };
// }


export default function FavoriteLogic() {
  const { token, refreshToken, setToken, setRefreshToken } = useAuthStore();
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string | undefined>(undefined);
  const fetchFavorites = useCallback((onDone?: () => void) => {
    getFavoriteProductsModel(
      token,
      (data: any) => {
        const items = Array.isArray(data) ? data : data?.results ?? [];
        setFavoriteProducts(items);
        if (onDone) onDone();
      },
      (err: string) => {
        console.log('error', err);
        if (onDone) onDone();
      },
      () => {
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            getFavoriteProductsModel(newTokens.access,
              (data: any) => {
                const items = Array.isArray(data) ? data : data?.results ?? [];
                setFavoriteProducts(items);
                if (onDone) onDone();
              },
              (err2: string) => {
                console.log('error', err2);
                if (onDone) onDone();
              }
            );
          },
          (errRefresh: string) => {
            console.log('error', errRefresh);
            if (onDone) onDone();
          }
        );
      }
    );
  }, [token, refreshToken, setToken, setRefreshToken]);

  const fetchRecommended = useCallback((onDone?: () => void) => {
    getHomeRecommendedModel(
      token,
      (data: any) => {
        const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
        setRecommended(items);
        if (onDone) onDone();
      },
      () => {
        refreshTokenModel(
          refreshToken,
          newTokens => {
            setToken(newTokens.access);
            setRefreshToken(newTokens.refresh);
            getHomeRecommendedModel(newTokens.access,
              (data: any) => {
                const items = Array.isArray(data?.results) ? data.results : Array.isArray(data) ? data : [];
                setRecommended(items);
                if (onDone) onDone();
              },
              () => { if (onDone) onDone(); }
            );
          },
          () => { if (onDone) onDone(); }
        );
      }
    );
  }, [token, refreshToken, setToken, setRefreshToken]);

  const refreshAll = (isFavorite?: boolean) => {
    setLoading(true);
    let doneCount = 0;
    const checkDone = () => {
      doneCount += 1;
      if (doneCount === 2) setLoading(false);
    };
    fetchFavorites(checkDone);
    fetchRecommended(checkDone);
  };

  useEffect(() => {
    refreshAll();
  }, [fetchFavorites, fetchRecommended]);

  useFocusEffect(
    useCallback(() => {
      refreshAll();
    }, [fetchFavorites, fetchRecommended])
  );

  const onSubmit = (id?: string, isFavorite?: boolean) => {
    console.log('id =>===>', isFavorite);
    setId(id);
    refreshAll(isFavorite);
  };

  return {
    favoriteProducts,
    recommended,
    loading,
    onSubmit
  };
}
