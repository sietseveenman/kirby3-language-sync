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

```yml
fields:
  languageSync:
    type: sync
    buttonIcon: string or false # Overwrite the default button icon
    buttonLabel: string # Overwrite the default button text
```
### Additional info
Any blueprint field with where the option 'translate' is set to false will be excluded from the list of selectable fields to synchronize.