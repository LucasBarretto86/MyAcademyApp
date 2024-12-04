export const apiURL = process.env.REACT_APP_API_URL

export const headers = (token) => {
  return (
    {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json'
    }
  )
}
