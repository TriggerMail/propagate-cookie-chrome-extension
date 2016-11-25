chrome.runtime.sendMessage({
  type: 'GET_TAB_DOMAIN',
  payload: {
    domain: window.location.host,
    protocol: window.location.protocol
  }
});
