'use strict';

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const LABEL_TEXT = 'Toggle dark theme';

const SCHEMA_KEY = 'org.gnome.desktop.interface';
const THEME_KEY = 'gtk-theme';
const LIGHT_THEME = 'Adwaita';
const DARK_THEME = 'Adwaita-dark';
//const LIGHT_THEME = 'Yaru';
//const DARK_THEME = 'Yaru-dark';
//const LIGHT_THEME = 'Arc';
//const DARK_THEME = 'Arc-dark';

let button, settings;

function init() {
	settings = new Gio.Settings({ schema: SCHEMA_KEY });
}

function toggleTheme() {
	const newTheme = settings.get_string(THEME_KEY) === LIGHT_THEME
		? DARK_THEME
		: LIGHT_THEME;

	settings.set_string(THEME_KEY, newTheme);
}

function enable() {
	button = new PanelMenu.Button(0.0);

	const icon = new St.Icon({
		icon_name: 'weather-clear-night-symbolic',
		style_class: 'system-status-icon'
	});

	button.actor.add_actor(icon);
	button.actor.connect('button-press-event', toggleTheme);
	Main.panel.addToStatusArea('ToggleDarkTheme', button);
}

function disable() {
	button.destroy();
}

