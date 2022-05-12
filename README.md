# Kirby Language sync

Overwrite selected page fields with values from another language. 

****

## Installation

With Composer:
```
composer require sietseveenman/kirby3-language-sync
```

### Usage
Inside a blueprint.

```
fields:
  languageSync:
    type: sync
```
Available field options:

```
  buttonLabel: string # Overwrite the default button text
```
### Additional info
Any blueprint field with where the option 'translate' is set to false will be excluded from the list of selectable fields to synchronize.