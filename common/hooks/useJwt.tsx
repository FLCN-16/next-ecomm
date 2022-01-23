import React from "react"

/**
 * React hook for JSON Web Token Validate and Decode
 *
 * This hook is used to validate provided token and
 * return an object of data.
 *
 * @param token
 */
const useJwt = (token: string) => {
  const [isExpired, setIsExpired] = React.useState<boolean>(false)
  const [decodedToken, setDecodedToken] = React.useState<any>(null)

  React.useEffect(() => {
    evaluateToken(token)
  }, [token])

  const evaluateToken = (token: string) => {
    setDecodedToken(decodeToken(token))
    setIsExpired(isTokenExpired(token))
  }

  return { isExpired, decodedToken, reEvaluateToken: evaluateToken }
}

/**
 * Try to decode a JWT. If the token is valid you'll get an object otherwise you'll get null
 * @param token - The JWT that you want to decode
 * @returns Decoded token
 */
export const decodeToken = (token: string): object | null => {
  try {
    // if the token has more or less than 3 parts or is not a string
    // then is not a valid token
    if (token.split(".").length !== 3 || typeof token !== "string") {
      return null
    }

    // payload ( index 1 ) has the data stored and
    // data about the expiration time
    const payload: string = token.split(".")[1]
    // determine the padding characters required for the base64 string
    const padding: string = "=".repeat((4 - (payload.length % 4)) % 4)
    // convert the base64url string to a base64 string
    const base64: string = payload.replace("-", "+").replace("_", "/") + padding
    // decode and parse to json
    const decoded = JSON.parse(window.atob(base64))

    return decoded
  } catch (error) {
    // Return null if something goes wrong
    return null
  }
}

/**
 * Verify if the token is expired or not
 * @param token - Your JWT
 * @returns boolean
 */
export const isTokenExpired = (token: string): boolean => {
  const decodedToken: any = decodeToken(token)
  let result = true

  if (decodedToken && decodedToken.exp) {
    const expirationDate: Date = new Date(0)
    expirationDate.setUTCSeconds(decodedToken.exp) // sets the expiration seconds
    // compare the expiration time and the current time
    result = expirationDate.valueOf() < new Date().valueOf()
  }

  return result
}

export default useJwt
