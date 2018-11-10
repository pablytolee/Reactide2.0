'use strict';

const { dialog } = require('electron');
const path = require('path');
const copy = require('../../lib/copy-directory');
const deleteDirectory = require('../../lib/delete-directory');
const cra = require('../../lib/create-react-app');

const menuTemplate = windowObj => [
  {
    label: 'Main',
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideothers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  },
  {
    label: 'File',
    submenu: [
      {
        label: 'New Project',
        click: () => {
          // warn user of unsaved changes before below
          global.newProj = true;
          global.mainWindow.webContents.send('newProject');
          const save = dialog.showSaveDialog();
          // if (save) {
          //   copy('./lib/new-project-template/new-project', save);
          // }
          //Run cra with 'save' variable as destination path
          cra(save);
        },
        accelerator: 'CommandOrControl+N'
      },
      { type: 'separator' },
      {
        label: 'Open…',
        click: () => {
          global.newProj = false;
          const rootDir = dialog.showOpenDialog(windowObj, {
            properties: ['openDirectory']
          });
          console.log('Open dir message sending...');
          if (rootDir) {
            global.mainWindow.webContents.send('openDir', rootDir[0]);
          }
        },
        accelerator: 'CommandOrControl+O'
      },
      { type: 'separator' },
      {
        label: 'Save',
        click: () => {
          
          global.mainWindow.webContents.send('saveFile');
        },
        accelerator: 'CommandOrControl+S'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' }
    ]
  },
  {
    label: 'Selection',
    submenu: [{ role: 'selectall' }]
  },
  {
    role: 'window',
    submenu: [{ role: 'minimize' }, { role: 'close' }]
  },
  {
    label: 'Developer Tools',
    submenu: [
      {
        label: 'Toggle DevTools',
        accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
        click(item, focusedWindow){
          console.log('THIS IS ITEM',item);
          console.log('THIS IS THE FOCUSED WINDOW', focusedWindow);
          focusedWindow.toggleDevTools();
        }
      },
      {
        role: 'reload'
      }
    ]
  }
];


module.exports = menuTemplate;