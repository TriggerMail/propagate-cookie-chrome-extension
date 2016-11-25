var select = function(selector) {
  return document.querySelector(selector);
};

var defaults = {
  cookie: 'SACSID',
  endpoint: 'https://localhost:8081/_dev-server/propagate-cookie',
  watchChanges: false
};
var fields = Object.keys(defaults);

var setFormValues = function(values) {
  Object.entries(values).map(function(entry) {
    var key = entry[0];
    var value = entry[1];
    var field = select('#' + key);

    if (typeof value === 'string') {
      field.value = value;
    } else {
      if (value) {
        field.setAttribute('checked', true);
      } else {
        field.removeAttribute('checked');
      }
    }
  });
};

var main = function() {
  chrome.storage.sync.get(defaults, function(settings) {
    setFormValues(settings);

    select('#settings-form').addEventListener('submit', function(event) {
      event.preventDefault();

      var res = {};

      fields.forEach(function(field) {
        var value;
        var element = select('#' + field);

        if (element.getAttribute('type') === 'text') {
          value = element.value;
        } else {
          value = element.checked;
        }

        res[field] = value;
      });

      chrome.storage.sync.set(res);
    });
  });
};

main();
