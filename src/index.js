const { app, BrowserWindow } = require("electron");
const path = require("node:path");

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 950,
    height: 500,
    resizable: false,
    icon: path.join(__dirname, "assets", "my-melody-happy.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.setMenu(null);

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//.\yt-dlp.exe -x --audio-format mp3 --yes-playlist "https://www.youtube.com/watch?v=oMfw5krsEd4&list=PL8eCIT_xYWGDBiavfpCEyF36DHbw_F7rm"
