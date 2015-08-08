#!/usr/bin/env bash
if [[ ! -a ~/.alfred-path-picker.yml ]]; then 
	cp ./lib/.alfred-path-picker.example.yml ~/.alfred-path-picker.yml
	echo "Example config file copied to ~/.alfred-path-picker.yml"
	open ~/.alfred-path-picker.yml
fi
