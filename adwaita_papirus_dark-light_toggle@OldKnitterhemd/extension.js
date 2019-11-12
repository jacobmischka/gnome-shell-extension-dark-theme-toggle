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

let button, settings;

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
	? new St.Icon({
		icon_name: APP_LIGHT,
		style_class: 'system-status-icon'
	})
	: new St.Icon({
		icon_name: APP_DARK,
		style_class: 'system-status-icon'
	})
	settings.set_string(THEME_KEY, newTheme);
	settings.set_string(ICON_KEY, newIcons);
	button.actor.add_actor(icon);
}

function enable() {
	button = new PanelMenu.Button(0.0);

	const icon = new St.Icon({
		icon_name: APP_LIGHT,
		style_class: 'system-status-icon'
	});

	button.actor.add_actor(icon);
	button.actor.connect('button-press-event', toggleTheme);
	Main.panel.addToStatusArea('ToggleDarkTheme', button);
}

function disable() {
	button.destroy();
}

