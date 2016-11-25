chrome.devtools.panels.create(
    'Propagate Cookie',
    'img/icon.png',
    'panel.html',
    function cb(panel) {
      panel.onShown.addListener(function(panel){
        panel.focus();
      });
    }
);
