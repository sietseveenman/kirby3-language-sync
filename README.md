# Kirby Pluginkit: Example plugin for Kirby

> Variant "Panel plugin setup"

This is a boilerplate for a Kirby Panel plugin that can be installed via all three [supported installation methods](https://getkirby.com/docs/guide/plugins/plugin-setup-basic#the-three-plugin-installation-methods).

You can find a list of Pluginkit variants on the [`master` branch](https://github.com/getkirby/pluginkit/tree/master).

****

## How to use the Pluginkit

1. Fork this repository
2. Change the plugin name and description in the `composer.json`
3. Change the plugin name in the `index.php` and `src/index.js`
4. Change the license if you don't want to publish under MIT
5. Add your plugin code to the `index.php` and `src/index.js`
6. Update this `README` with instructions for your plugin

### Install the development and build setup

We use [kirbyup](https://github.com/johannschopplich/kirbyup) for the development and build setup.

You can start developing directly. kirbyup will be fetched remotely with your first `npm run` command, which may take a short amount of time.

### Development

You can start the dev process with:

```
npm run dev
```

This will automatically update the `index.js` and `index.css` of your plugin as soon as you make changes.
Reload the Panel to see your code changes reflected.

### Production

As soon as you are happy with your plugin, you should build the final version with:

```
npm run build
```

This will automatically create a minified and optimized version of your `index.js` and `index.css`
which you can ship with your plugin.

We have a tutorial on how to build your own plugin based on the Pluginkit [in the Kirby documentation](https://getkirby.com/docs/guide/plugins/plugin-setup-basic).

### Build reproducibility

While kirbyup will stay backwards compatible, exact build reproducibility may be of importance to you. If so, we recommend to target a specific package version, rather than using npx:

```json
{
  "scripts": {
    "dev": "kirbyup src/index.js --watch",
    "build": "kirbyup src/index.js"
  },
  "devDependencies": {
    "kirbyup": "^0.14.1"
  }
}
```

What follows is an example README for your plugin.

****

## Installation

### Download

Download and copy this repository to `/site/plugins/{{ plugin-name }}`.

### Git submodule

```
git submodule add https://github.com/{{ your-name }}/{{ plugin-name }}.git site/plugins/{{ plugin-name }}
```

### Composer

```
composer require {{ your-name }}/{{ plugin-name }}
```

## Setup

*Additional instructions on how to configure the plugin (e.g. blueprint setup, config options, etc.)*

## Options

*Document the options and APIs that this plugin offers*

## Development

*Add instructions on how to help working on the plugin (e.g. npm setup, Composer dev dependencies, etc.)*

## License

MIT

## Credits

- [Your Name](https://github.com/ghost)
