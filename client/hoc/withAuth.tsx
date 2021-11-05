import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import LoadingComponent from '../containers/Backend/Loading'


type AuthType = object | false | null

function withAuth(WrappedComponent: React.ComponentType) {
  const AuthComponent = (props: any) => {
    const [auth, setAuth] = useState<AuthType>(null)
    const router = useRouter()

    useEffect( () => {
      if ( auth !== null ) return;

      setAuth(false)
    }, [auth])

    if ( auth === false ) {
      router.push('/admin/auth')
    }

    return ( auth ? <WrappedComponent /> : <LoadingComponent /> );
  }

  return AuthComponent
}

export default withAuth