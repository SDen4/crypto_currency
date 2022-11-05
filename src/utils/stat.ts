const invocation = new XMLHttpRequest();
const url = 'http://ovz1.j34847422.m61kn.vps.myjino.ru?test=test';

export const stat = async () => {
  // const data = fetch(
  //   'http://ovz1.j34847422.m61kn.vps.myjino.ru?test=test',
  // ).then((res) => res.json());

  // return data;
  if (invocation) {
    invocation.open('GET', url, true);
    // invocation.onreadystatechange = handler;
    invocation.send();
  }
};
