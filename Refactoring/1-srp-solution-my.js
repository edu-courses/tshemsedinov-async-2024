'use strict';

const API_EXCHANGE = {
  host: 'openexchangerates.org',
  path: 'api/latest.json?app_id=',
  key: '1f43ea96b1e343fe94333dd2b97a109d',
};

const DEFAULT_RETRY = 3;

const toURL = (api_host_params) => {
  const { host, path, key } = api_host_params;
  const url = `https://${host}/${path}${key}`;
  return url;
}

const getAPI = async (url) => {
  return await fetch(url).catch(() => ({ ok: false }));
}

const printObj = (obj) => {
  console.log(obj);
}

const getRate = async (currency, exchange, retry) => {
  const url = toURL(exchange);
  const attemptsLeft = retry - 1;
  const res = await getAPI(url);
  const data = await res.json();
  const rate = data.rates[currency];
  printObj({ currency, retry });
  if (!res.ok) {
    if (attemptsLeft > 0) return await getRate(currency, url, attemptsLeft);
    throw new Error('Can not get data');
  }
  return rate;
};

const main = async (exchange = API_EXCHANGE, retry = DEFAULT_RETRY) => {
  try {
    const rate = await getRate('UAH', exchange, retry);
    printObj({ rate });
  } catch (err) {
    printObj(err)
  }
};

  main();
