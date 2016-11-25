var defaults = {
  cookie: 'SACSID',
  endpoint: 'https://localhost:8081/_dev-server/propagate-cookie',
  watchChanges: false
};

var sendData = function(endpointUri, data, callback) {
  var xhr = new XMLHttpRequest();

  xhr.open('POST', endpointUri, true);
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onreadystatechange = function() {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        callback();
      } else {
        callback(new Error('Rerver respond with non-success status: ', xhr.status));
      }
    }
  }

  xhr.send(JSON.stringify(data));
};

var main = function() {
  var settings = defaults;

  var updateSettings = function() {
    chrome.storage.sync.get(defaults, function(_settings) {
      settings = _settings;
    });
  };

  chrome.storage.onChanged.addListener(function(changes, area) {
    if (area === 'sync') {
      setTimeout(updateSettings);
    }
  });

  chrome.runtime.onMessage.addListener(function(message) {
    var domain = message.payload.domain;
    var protocol = message.payload.protocol;

    if (message.type === 'GET_TAB_DOMAIN') {
      chrome.cookies.getAll({
        domain: domain,
        name: settings.cookie
      }, function(cookies) {
        var cookie = null;

        if (cookies.length) {
          cookie = cookies[0];

          sendData(settings.endpoint, {
            host: protocol + '//' + domain,
            domain: domain,
            cookie: cookie.name + '=' + cookie.value
          }, function(err) {
            if (err) {
              chrome.notifications.create({
                type: 'basic',
                iconUrl: 'img/warning.png',
                title: '[Propagate Cookie] Request server error',
                message: 'Error occured while access the endpoint ' +
                err.toString() + '.'
              });
              console.error(err);
            }
          });
        } else {
          chrome.notifications.create({
            type: 'basic',
            iconUrl: 'img/warning.png',
            title: '[Propagete Cookie] Can\'t find cookie',
            message: 'Can\'t find cookie with name `' + settings.cookie + '`' +
            'Please check the extension settings in chrome dev tools.'
          });
        }
      });
    }
  });

  updateSettings();
  chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.query({active: true}, function(tabs) {
      var tab = tabs[0];

      chrome.tabs.executeScript(tab.id, {
        file: 'commands/get_domain.js'
      });
    });
  });
};

main();
