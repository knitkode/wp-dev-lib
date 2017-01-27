# wp-dev-lib

Look at the [original repo](https://github.com/xwp/wp-dev-lib) readme.

Differences from original repo
---------------
- One of the main difference is that the branch to be deployed to WordPress or, in general, the production branch containing the code distributed to the users is the `trunk` branch and not `master`, which is instead used for development.
- More rules to `phpcs.ruleset.xml`
- Different `jshintrc` rules, less WordPress like
- gulp folder with common tasks and utilities
- added `minifyphp.php` php script

Quick usage
---------------
This repo is used as a submodule, renamed as `common`, it must stays in the `./config` path of the other repositories.

```bash
# To add it to your repo, from the `/config` folder do:
git submodule add https://github.com/PlusWP/wp-dev-lib.git config/common
git submodule update --init config/common

# To update the library with the latest changes:
git submodule update --remote config/common
git add config/common
git commit -m "Update config/common from wp-dev-lib"

# one liner
git submodule update --remote config/common && git add config/common && git commit -m "Update config/common from wp-dev-lib"
```

Todo
---------------
to get from submodule config/common

editorconfig
gitattrbiutes
gitignore
phpdoc.dist.xml
phpcs.ruleset.xml
