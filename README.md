# Kirby Language sync

Overwrite selected page fields with values from another language. 

<img width="321" alt="select dialog" src="https://user-images.githubusercontent.com/19320817/168168969-9bd9d214-f9d0-4408-8ec5-4f3b61a79c78.png">

****

## Installation

With Composer:

```bash
composer require sietseveenman/kirby3-language-sync
```

### Usage
Inside a blueprint.

```yml
fields:
  languageSync:
    type: sync
```
Available field options:

```yml
  buttonLabel: string # Overwrite the default button text
```
### Additional info
Any blueprint field with where the option 'translate' is set to false will be excluded from the list of selectable fields to synchronize.
