# vscode-final-newline [![Unix Build Status](https://travis-ci.org/SamVerschueren/vscode-final-newline.svg?branch=master)](https://travis-ci.org/SamVerschueren/vscode-final-newline) [![Windows Build status](https://ci.appveyor.com/api/projects/status/j5u5v2jb69uwqr1c?svg=true)](https://ci.appveyor.com/project/SamVerschueren/vscode-final-newline)

> Inserts a final newline when saving the document.

The [EditorConfig](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig) extension supports this feature as well. Please take a look at EditorConfig
if you want the same behaviour across multiple editors.


## Install

Press <kbd>F1</kbd> and narrow down the list commands by typing `extension`. Pick `Extensions: Install Extension`.

![](https://github.com/SamVerschueren/vscode-final-newline/raw/master/screenshot.png)

Simply pick the `final-newline` extension from the list


## Usage

Enable the newline insertion when saving the document in the VSCode Settings.

```json
{
  "files.insertFinalNewline": true
}
```


## License

MIT © [Sam Verschueren](http://github.com/SamVerschueren)
