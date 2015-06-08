var App  = require('app')
  , Menu = require('menu')
  , BW   = require('browser-window')
  , win  = null;


require('crash-reporter').start();

App.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    App.quit();
});

App.on('ready', function() {
  win = new BW({width: 800, height: 600});
  win.loadUrl('file://' + __dirname + '/popup.html');

  win.on('closed', function() {
    win = null;
  });

  var menuTmpl = [
    {
      label: 'Vaultpass',
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function() { App.quit(); }
        }
      ]
    },
    {
      label: 'View',
      submenu: [
        {
          label: 'Reload',
          accelerator: 'Command+R',
          click: function() { win.reload(); }
        },
        {
          label: 'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click: function() { win.toggleDevTools(); }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        },
      ]
    }
  ];
  menu = Menu.buildFromTemplate(menuTmpl);
  Menu.setApplicationMenu(menu);
});
