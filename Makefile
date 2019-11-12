UUID = adwaita_papirus_dark-light_toggle@OldKnitterhemd
EXTENSIONS_DIR = ~/.local/share/gnome-shell/extensions

.PHONY: install link

${UUID}.zip: ${UUID}
	zip -j $<.zip $</*

install: ${UUID}
	cp -r $< ${EXTENSIONS_DIR}/

link: ${UUID}
	ln -s $(shell pwd)/$</ ${EXTENSIONS_DIR}/
