'use strict';

const St = imports.gi.St;
const Gio = imports.gi.Gio;
const Main = imports.ui.main;
const PanelMenu = imports.ui.panelMenu;

const LABEL_TEXT = 'Toggle dark theme';

const SCHEMA_KEY = 'org.gnome.desktop.interface';
const THEME_KEY = 'gtk-theme';
const ICON_KEY = 'icon-theme';
const LIGHT_ICONS = 'Papirus';
const DARK_ICONS = 'Papirus-Dark';
const LIGHT_THEME = 'Adwaita';
const DARK_THEME = 'Adwaita-dark';
const APP_LIGHT = 'weather-clear-symbolic'
const APP_DARK = 'weather-clear-night-symbolic'

let button, settings, _icon;

function init() {
	settings = new Gio.Settings({ schema: SCHEMA_KEY });
}

function toggleTheme() {
	const newTheme = settings.get_string(THEME_KEY) === LIGHT_THEME
		? DARK_THEME
		: LIGHT_THEME;
	const newIcons = newTheme === LIGHT_THEME
		? LIGHT_ICONS
		: DARK_ICONS;

	const icon = newTheme === LIGHT_THEME
	? APP_LIGHT
	: APP_DARK;
	
	settings.set_string(THEME_KEY, newTheme);
	settings.set_string(ICON_KEY, newIcons);
	_icon.gicon= Gio.icon_new_for_string(icon);

}

function enable() {
	button = new PanelMenu.Button(0.0);

	_icon = new St.Icon({
		style_class: 'system-status-icon'
	});
	_icon.gicon= Gio.icon_new_for_string(APP_DARK);
	button.actor.add_actor(_icon);
	button.actor.connect('button-press-event', toggleTheme);
	Main.panel.addToStatusArea('ToggleDarkTheme', button);
}

function disable() {
	button.destroy();
	//_icon.destroy();
}

