import { useRef } from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

import { Api } from '@graasp/query-client';
import { AppItemType, Context, PermissionLevelCompare } from '@graasp/sdk';

import { useQueryClient } from '../context/QueryClientContext';

const buildPostMessageKeys = (itemId: AppItemType['id']) => ({
  GET_CONTEXT_SUCCESS: `GET_CONTEXT_SUCCESS_${itemId}`,
  GET_CONTEXT_FAILURE: `GET_CONTEXT_FAILURE_${itemId}`,
  GET_CONTEXT: `GET_CONTEXT_${itemId}`,
  GET_AUTH_TOKEN: `GET_AUTH_TOKEN_${itemId}`,
  GET_AUTH_TOKEN_SUCCESS: `GET_AUTH_TOKEN_SUCCESS_${itemId}`,
  GET_AUTH_TOKEN_FAILURE: `GET_AUTH_TOKEN_FAILURE_${itemId}`,
  POST_AUTO_RESIZE: `POST_AUTO_RESIZE_${itemId}`,
});

const AppItem = ({ item }: { item: AppItemType }) => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const { queryConfig, hooks } = useQueryClient();
  const { data: currentMember } = hooks.useCurrentMember();
  const { data: itemMemberships } = hooks.useItemMemberships(item.id);
  const ref = useRef<WebView | null>(null);
  const url = new URL(item.extra.app.url);
  const query = new URLSearchParams(url.search);
  query.set('itemId', item.id);
  url.search = query.toString();
  const POST_MESSAGE_KEYS = buildPostMessageKeys(item.id);
  const permission = PermissionLevelCompare.getHighest(
    itemMemberships?.map((im) => im.permission),
  );

  return (
    <WebView
      ref={(r) => (ref.current = r)}
      source={{ uri: url.toString() }}
      scalesPageToFit={true}
      startInLoadingState={true}
      overScrollMode="never"
      cacheMode="LOAD_CACHE_ELSE_NETWORK"
      cacheEnabled={true}
      style={{
        width: dimensions.width,
        height: '100%',
        marginLeft: insets.left,
        marginBottom: insets.bottom,
      }}
      injectedJavaScript={`(function() {
                window.parent = window.ReactNativeWebView;
                console.log = window.ReactNativeWebView.postMessage;
                console.debug = window.ReactNativeWebView.postMessage;
                console.error = window.ReactNativeWebView.postMessage;
            })();`}
      onMessage={(event) => {
        console.log('raw message:', event.nativeEvent.data);
        try {
          const data = JSON.parse(event.nativeEvent.data);
          console.log('parsed message:', data);
          switch (data.type) {
            case POST_MESSAGE_KEYS.GET_CONTEXT: {
              ref.current?.injectJavaScript(`(function() {
                window.postMessage(JSON.stringify({
                  type: "${POST_MESSAGE_KEYS.GET_CONTEXT_SUCCESS}",
                payload: {
                  apiHost: "${queryConfig.API_HOST}",
                  memberId: "${currentMember?.id}",
                  itemId: "${item.id}",
                  mobile: true,
                  context: "${Context.Builder}",
                  permission: "${permission}",
                },
              }), "${url.origin}");
            })();`);
              break;
            }
            case POST_MESSAGE_KEYS.GET_AUTH_TOKEN: {
              const { payload } = data;
              Api.requestApiAccessToken(
                { id: item.id, origin: payload.origin, key: payload.key },
                queryConfig,
              ).then(
                (data) =>
                  ref.current?.injectJavaScript(`(function() {
                  window.postMessage(JSON.stringify({
                    type: "${POST_MESSAGE_KEYS.GET_AUTH_TOKEN_SUCCESS}",
                    payload: { token: "${data.token}" },
                  }), "${url.origin}");
                })();`),
              );
              break;
            }
            default:
            // console.error(
            //   `Type ${data.type} is not recognized (${data}) ${POST_MESSAGE_KEYS.GET_AUTH_TOKEN}`,
            // );
          }
        } catch {
          // console.error('could not parse data');
        }
      }}
    />
  );
};
export default AppItem;