# Jabberwocky: Sins II Language Support

**Jabberwocky** adds validation to Sins 2 game files for modding inside of **Visual Studio Code**

![doc-image](./images/doc_image2.png)

## Note

This extension is in preview and may stop working unexpectedly

## Current Features

-   Diagnostics
-   Autocompletion
-   On-hover information

## Usage

After installation you will need to set your workspace folder to the location of your mod via the following steps:

-   Open the command pallete (`F1` or `CTRL+SHIFT+P`)
-   Type `open settings`
-   Choose `Open User Settings (JSON)`
-   Then modify/add the `"soase2-plugin.cache.game"` property with the directory path

Or you can use a shortcut by typing `SOASE2: Change workspace folder` in the command pallete and following the prompt

#### Menu:

Quickpicks for various tasks listed below:

Open via: `SOASE2: Configuration`

![menu](./images/doc_menu.png)

## Configuration

```json

"soase2-plugin.cache.game": "E:/SinsIITesting" //  Location of your game/mod (ensure that it is the root directory)

"soase2-plugin.formatter.tabs": 4 // Amount of identation when formatting the file

"soase2-plugin.folders.ignore": [ // Custom folders to be ignored
    "fonts",
    "textures",
    "videos"
]

"soase2-plugin.extensions.ignore": [ // Custom extensions to be ignored
    "ogg",
    "mesh",
    "fxco",
    "scenario",
    "dll"
]
```

## Credits

**Stardock** for the Sins 2 Game Icon used in the files

https://www.sinsofasolarempire2.com/

https://www.stardock.com/
