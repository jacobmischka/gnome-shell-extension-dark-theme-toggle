UUID = darkthemetoggle@jacob.mischka.me
EXTENSIONS_DIR = ~/.local/share/gnome-shell/extensions

.PHONY: install link

${UUID}.zip: ${UUID}
	zip -j $<.zip $</*

install: ${UUID}
	cp -r $< ${EXTENSIONS_DIR}/

link: ${UUID}
	ln -s $(shell pwd)/$</ ${EXTENSIONS_DIR}/
