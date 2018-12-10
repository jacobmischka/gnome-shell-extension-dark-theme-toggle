UUID = darkthemetoggle@jacob.mischka.me
EXTENSIONS_DIR = ~/.local/share/gnome-shell/extensions

.PHONY: default install link

default:
	echo 'Run `make install` or `make link`'

install: ${UUID}
	cp -r $< ${EXTENSIONS_DIR}/

link: ${UUID}
	ln -s $(shell pwd)/$</ ${EXTENSIONS_DIR}/
