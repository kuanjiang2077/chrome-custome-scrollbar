let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
  changeColor.style.backgroundColor = data.color;
  changeColor.setAttribute('value', data.color);
});

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {
            //   code: 'document.body.style.backgroundColor = "' + color + '";'
              code: 'var style = document.createElement(\'style\'); style.type = \'text/css\'; '+
              'style.innerHTML="::-webkit-scrollbar { width: 5px; height: 5px; }::-webkit-scrollbar-track {border-radius: 10px;width: 10px;}'+
              '::-webkit-scrollbar-thumb {border-radius: 2px;background: '+color+';-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5);}'+
              '::-webkit-scrollbar-thumb:window-inactive { background: '+ color +';}"; '+ 
              ' document.getElementsByTagName(\'HEAD\').item(0).appendChild(style); '
            });
});
};