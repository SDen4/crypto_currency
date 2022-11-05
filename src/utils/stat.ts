export const stat = async () => {
  const data = fetch(
    'http://ovz1.j34847422.m61kn.vps.myjino.ru?test=test',
  ).then((res) => res.json());

  return data;
};
