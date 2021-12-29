import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import LoadingComponent from '../containers/Backend/Loading'


type AuthType = object | boolean | null

function withAuth(WrappedComponent: React.ComponentType, capabilities: string | string[] = []) {
  const AuthComponent = (props: any) => {
    const [auth, setAuth] = useState<AuthType>(null)
    const router = useRouter()
    const isAuthenticated = useSelector(state => state.auth.get('isAuthenticated'));

    useEffect( () => {
      if ( auth !== null ) return;

      setAuth(isAuthenticated)
    }, [auth, isAuthenticated])

    if ( auth === false ) {
      router.push( '/admin/auth?next=' + window.encodeURI( router.pathname ) )
    }

    return ( auth ? <WrappedComponent /> : <LoadingComponent /> );
  }

  return AuthComponent
}

export default withAuth