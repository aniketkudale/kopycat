const {
    app,
    Tray,
    Menu,
    shell,
    globalShortcut,
    clipboard
} = require('electron');
const options = require('./options.json');
const path = require('path');

app.on('ready', function() {
    const icon = path.join(__dirname + '/icon.png');

    const tray = new Tray(icon);

    const template = [];

    for (let i = 0; i < options.length; i++) {
        if (i < 9) {
            globalShortcut.register('CommandOrControl+' + Number(i + 1), () => {
                clipboard.writeText(options[i].text)
            })
            template.push({
                label: i + 1 + ": " + options[i].label,
                click: function() {
                    clipboard.writeText(options[i].text)
                }
            })
        } else {
            globalShortcut.register('CommandOrControl+' + 0, () => {
                clipboard.writeText(options[i].text)
            })
            template.push({
                label: 0 + ": " + options[i].label,
                click: function() {
                    clipboard.writeText(options[i].text)
                }
            })
        }
    }

    template.push({
        label: "Made with ❤️",
        click: function() {
            shell.openExternal('https://aniket.co');
        }
    }, {
        label: 'Quit',
        click: function() {
            app.isQuiting = true;
            app.quit();
        }
    })

    const ctxMenu = Menu.buildFromTemplate(template);

    tray.setToolTip('Fusion Dev Commands Helper');
    tray.setContextMenu(ctxMenu);
});

app.commandLine.appendSwitch("disable-software-rasterizer");
app.commandLine.appendSwitch('disable-gpu');