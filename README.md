# Kirby Language sync

Overwrite selected page fields with values from another language. 

![language-sync](https://user-images.githubusercontent.com/19320817/168178614-55e65d61-cd4d-43bb-9a1a-4cb1a59ec7af.gif)

****

## Installation

With Composer:

```
$ composer require sietseveenman/kirby3-language-sync
```

### Usage
Inside a blueprint.

```yml
fields:
  languageSync:
    type: sync
```
Available field options:

```
  buttonIcon: string or false # Overwrite the default button icon
  buttonLabel: string # Overwrite the default button text
```
### Additional notes
Any blueprint field with the option 'translate' is set to false will be excluded from the list of selectable fields to synchronize.

This plugin hasn't been battle tested much. Use on production projects at your own risk.
