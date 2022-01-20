const { app, BrowserWindow } = require('electron')
const path = require('path')
const replaceText = (selector, text) => {
  return `var element = document.getElementById('${selector}')
  if (element) element.innerText = '${text}'`
}

var win;

function createWindow () {
    win = new BrowserWindow({
      width: 800,
      height: 600
    })
  
    win.loadFile('index.html')

    runSpeedTest()
    setInterval(runSpeedTest, 30000)
  }

  app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
      })
  })

  app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
  })

  function runSpeedTest() {
    console.log('running test....')

    var child = require('child_process').execFile
    var executablePath = 'speedtest.exe'
    var parameters = ['-fcsv']

    child(executablePath, parameters, function(err, data) {
        if(err){
          console.error(err)
          return
        }
        var res = data.toString().replaceAll('\"','').split(',');

        var seed = 0;
        while (!isPositiveInteger(res[seed])) {
          seed++;
        }
        seed--;

        var download = res[5+seed] / 125000;
        var upload = res[6+seed] / 125000;
        var ping = res[2+seed];

        // win.webContents.executeJavaScript(replaceText('latest-download', download))
        // win.webContents.executeJavaScript(replaceText('latest-upload', upload))
        // win.webContents.executeJavaScript(replaceText('latest-ping', ping))

        win.webContents.executeJavaScript(`acceptData(${download},${upload},${ping})`)
    });
  }

  function isPositiveInteger(str) {
    if (typeof str !== 'string') {
      return false;
    }
  
    const num = Number(str);
  
    if (Number.isInteger(num) && num > 0) {
      return true;
    }
  
    return false;
  }