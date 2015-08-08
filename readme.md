# Alfred Path Picker

Search through paths defined in path files (see below) using Alfred, when selected, they open *on the hostname that Chrome is currently on*. So, if I'm looking at `http://staging.site.com/admin/modules` and I type into Alfred `path menus` then Chrome will open `http://staging.site.com/admin/structure/menu`. Later if I'm on `http://local.site.com/admin/modules` and I type that same thing in Alfred, I'll go to `http://local.site.com/admin/structure/menu`. This really helps as a web developer needing to bookmark the path of a page, but having the host change often.
 
Just to keep our terminology straight, given a URL of `http://staging.site.com/admin/structure/menu`, we have these terms:

- "hostname": `http://staging.site.com`
- "path": `/admin/structure/menu`

This tool helps you by letting you creating collections of paths that can be opened on any hostname by looking at the URL of the active tab in Google Chrome. 

## Installation

Requires [node.js](http://nodejs.org) and [Alfred](http://alfredapp.com) for Mac.

```bash
npm install alfred-path-picker --global
```

The Alfred Workflow should just open after installation.

## Configuration

Edit the file at `~/.alfred-path-picker.yml` for configuration. You can turn on or off any of the example path files there, or add more of yours. 

### Path Files

These files (see some in `example/`) are read and are all the results returned by Alfred. They basically look like this:

```yml
- name: Name of Result
  path: /path/to/page
- name: Name of Result
  path: /path/to/page
```
