export default (err) => {
  console.log(err.response);
  if(err && (err.response.status === 401 || err.response.statusText === 'Unauthorized')) {
    window.location.reload();
  }
}



