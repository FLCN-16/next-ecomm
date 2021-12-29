import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { intersection } from 'lodash'

import type { RootState } from '@flcn-ecomm/store/rootReducer'
import LoadingComponent from '../containers/Backend/Loading'


type AuthType = object | boolean | null

function withAuth(WrappedComponent: React.ComponentType, capabilities: string | string[] = []) {
  const AuthComponent = (props: any) => {
    const [auth, setAuth] = useState<AuthType>(null)
    const router = useRouter()

    const isReady = useSelector((state: RootState) => state.app.get('ready'));
    const isAuthenticated = useSelector((state: RootState) => state.auth.get('isAuthenticated'));
    const account: any = useSelector((state: RootState) => state.auth.get('account'));

    const validateCapability = () => {
      if (! capabilities.length) return true;

      let userCaps = account.capabilities || [];

      if ( typeof capabilities === 'string' ) {
        return userCaps.indexOf(capabilities) > -1
      } else if (typeof capabilities === 'object') {
        return !! intersection(userCaps, capabilities).length
      } else {
        return true;
      }
    }

    useEffect( () => {
      if ( auth !== null || ! isReady ) return;

      let authenticated = isAuthenticated && validateCapability();

      setAuth(authenticated)
    }, [auth, isReady, isAuthenticated, account])

    if ( auth === false ) {
      router.push( '/admin/auth?next=' + window.encodeURI( router.pathname ) )
    }

    return ( auth ? <WrappedComponent /> : <LoadingComponent /> );
  }

  return AuthComponent
}

export default withAuth