JSX compiler (+ JSHint) for Sublime Text 2
===========

This package adds a build system to [Sublime Text](http://sublimetext.com) to transform a [React](http://facebook.github.io/react/) JSX file into JS. 

* It also runs [JSHint](https://github.com/jshint/jshint) over the transformed file.
* It compiles the JSX file into the same path.
* It works great with [SublimeOnSaveBuild](https://github.com/alexnj/SublimeOnSaveBuild).

![ScreenShot](preview.png)


**Disclaimer** This is the build system I personally use and it is a work in progress. It is tested on Mac OS X. It *does replace* the existing .js file with the same name in the same directory of the .jsx file. Contributions and feedbacks are welcome! 

**Requisites** You need to have installed [Node.js](http://nodejs.org), [JSHint](https://github.com/jshint/jshint) and [react-tools](https://npmjs.org/package/react-tools). 

## Install

Clone into a **JSX** folder in the Sublime Text Packages, e.g.:

```bash
git clone https://github.com/gpbl/sublime-jsx.git ~/Library/Application\ Support/Sublime\ Text\ 2/Packages/JSX
```

(you can put in another packages/* directory, but make sure to change it in the [JSX.sublime-build](JSX.sublime-build) file)

## Use

1. Make sure that `Tools` > `Build System` is set to `Automatic`.
2. Open a `.jsx` file an press `cmd+B`. 
    * Add `jsx` to the `filename_filter` in the SublimeOnSaveBuild settings to build automatically the jsx files when saving.

### Set JSX Syntax

This trick should enable this build tool automatically for any JSX file:
* `cmd+shift+P` and type *set syntax: jsx*. 
* From the status bar (bottom right), click *Javascript (JSX)* and choose `Open all with current extension as...` > `Javascript (JSX)`

### Command not found?

Make sure to have set the right `path` to [JSX.sublime-build](JSX.sublime-build). To find the right paths, use `which node`, `which jsx` and `which jshint`.