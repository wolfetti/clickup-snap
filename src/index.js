const { app, BrowserWindow, Tray, Menu } = require('electron');
const path = require('path');

let mainWindow = null
const createWindow = () => {
  
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 6800,
    height: 6600,
    title: "ClickUp Desktop (unofficial)",
    icon: path.join(__dirname, 'img/32x32.png')
  });

  // Minimize to tray
  mainWindow.on('minimize',function(event){
      event.preventDefault();
      mainWindow.hide();
  });

  // Close to tray
  mainWindow.on('close', function (event) {
      if(!app.isQuiting){
          event.preventDefault();
          mainWindow.hide();
      }

      return false;
  });

  // Load the app.
  mainWindow.loadURL('https://app.clickup.com/');
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
let tray = null;
app.on('ready', () => {

  // Menu Tray Icon
  var contextMenu = Menu.buildFromTemplate([
      { label: 'Show App', click:  function(){
          mainWindow.show();
      } },
      { label: 'Quit', click:  function(){
          app.isQuiting = true;
          app.quit();
      } }
  ]);

  // Tray Icon
  tray = new Tray(path.join(__dirname, 'img/16x16.png'));
  tray.setTitle('ClickUp Desktop (unofficial)');
  tray.setContextMenu(contextMenu);

  createWindow();
});

// Quit when all windows are closed, except on macOS. There, it's common
// for apps and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
