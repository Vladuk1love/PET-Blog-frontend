export function setAuthHeader(headers: any) {
  const token = localStorage.getItem('token');
  if (token) {
    headers.set('Authorization', token);
  }else {
    console.log('can not authorize you')
  }
  return headers;
}