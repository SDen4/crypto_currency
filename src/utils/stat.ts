export const stat = async () => {
  const params: RequestInit = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      // 'Content-Type': 'application/json',
      'Content-Type': ' text/plain',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify({ test: 'test' }),
  };

  const data = fetch('http://ovz1.j34847422.m61kn.vps.myjino.ru?test=test', {
    headers: { 'Content-Type': ' text/plain' },
    mode: 'no-cors',
  }).then((res) => res.text());

  return data;
};
