import { newFrontendClient } from '@notifi-network/notifi-frontend-client';
import { useWallet } from '@suiet/wallet-kit';
import React from 'react';
import { toast } from 'react-toastify';
import { NotifiNetworkHelper } from './init';

const initialState = {
  client: null,
  userState: null,
  currentEmail: null,
  alerts: null,
  notifications: null,
};

const AppContext = React.createContext(initialState);

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'SET_ALL_STATE':
      return { ...state, ...payload };
    default:
      return state;
  }
}

export const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const contextValue = { state, dispatch };
  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>;
};

export function useState() {
  const { state } = React.useContext(AppContext);
  return state;
}

export function useAction() {
  const { state, dispatch } = React.useContext(AppContext);
  const wallet = useWallet();

  const handleError = (error) => {
    const startIndex = error.toString().indexOf('{');
    const endIndex = error.toString().lastIndexOf('}');
    const objectString = JSON.parse(error.toString().substring(startIndex, endIndex + 1));
    console.log(objectString);
    const errorMsg = objectString?.response?.errors[0]?.message;
    return errorMsg;
  };

  async function init(wallAddress) {
    const client = newFrontendClient({
      account: {
        address: wallAddress,
        publicKey: wallAddress,
      },
      tenantId: NotifiNetworkHelper.tenantId,
      env: NotifiNetworkHelper.env,
      walletBlockchain: NotifiNetworkHelper.chain,
    });
    const newUserState = await client.initialize();
    dispatch({
      type: 'SET_ALL_STATE',
      payload: {
        client,
        userState: newUserState,
      },
    });
  }

  const syncData = async () => {
    console.log(state);
    const clientData = await state.client.fetchData();

    const targetGroup = new Map();

    for (const iterator of clientData.targetGroup) {
      targetGroup.set(iterator.name, iterator);
    }

    const subscriptionCardConfig = await state.client.fetchSubscriptionCard({
      id: NotifiNetworkHelper.configId,
      type: 'SUBSCRIPTION_CARD',
    });

    for (const alert of subscriptionCardConfig.eventTypes) {
      const checkTurnOn = clientData.alert.find((a) => a.name === alert.name);
      alert.isOn = Boolean(checkTurnOn);
      alert.currentId = checkTurnOn ? checkTurnOn.id : null;
    }
    const currentEmail = clientData.targetGroup.find((c) => c.name === 'Default')?.emailTargets[0];
    dispatch({
      type: 'SET_ALL_STATE',
      payload: {
        currentEmail: currentEmail ? currentEmail.emailAddress : null,
        alerts: subscriptionCardConfig.eventTypes,
      },
    });
  };

  const login = async () => {
    try {
      await state.client.logIn({
        walletBlockchain: NotifiNetworkHelper.chain,
        signMessage: signMessage,
      });
      const newUserState = await state.client.initialize();
      dispatch({
        type: 'SET_ALL_STATE',
        payload: {
          userState: newUserState,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.toString());
    }
  };

  const signMessage = async (message) => {
    const signature = await wallet.signMessage({
      message,
    });
    const signatureBuffer = Buffer.from(signature.signature);
    return signatureBuffer;
  };

  const subscribeAlert = async (alert) => {
    try {
      await state.client.ensureAlert({
        eventType: alert,
        inputs: {},
      });
    } catch (error) {
      console.log(error);
      toast.error('Error');
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await state.client.deleteAlert({
        id,
      });
    } catch (e) {
      console.log(e);
      toast.error('Error');
    }
  };

  const updateAlerts = async (email, alerts) => {
    try {
      const newEmail = await state.client.ensureTargetGroup({ name: 'Default', emailAddress: email });
      for (const alert of alerts) {
        if (alert.isOn) {
          subscribeAlert(alert);
        } else {
          if (alert.currentId) {
            handleDeleteAlert(alert.currentId);
          }
        }
      }
      if (!newEmail.emailTargets[0].isConfirmed) {
        await this.client.sendEmailTargetVerification({ targetId: newEmail.emailTargets[0].id });
        toast.warning('Please go to email for verify.');
      } else {
        toast.success('Success');
      }
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  const getNotifications = async (first = 0, after = 1) => {
    try {
      const { nodes, pageInfo } = await state.client.getNotificationHistory({
        first,
        after,
      });

      nodes.forEach((item) => {
        if (item.detail?.__typename === 'BroadcastMessageEventDetails') {
          console.log('I have a broadcast message', item.detail?.subject, item.detail?.message);
        }
      });

      console.log('pageInfo', pageInfo.hasNextPage, pageInfo.endCursor);
      dispatch({
        type: 'SET_ALL_STATE',
        payload: {
          notifications: {
            nodes,
            pageInfo,
          },
        },
      });
    } catch (error) {
      toast.error(handleError(error));
    }
  };

  return {
    init,
    syncData,
    login,
    updateAlerts,
    getNotifications,
  };
}
