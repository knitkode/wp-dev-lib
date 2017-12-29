# wp-dev-lib

> Look at the [original repo](https://github.com/xwp/wp-dev-lib) readme.

Differences from original repo
---------------
- More rules to `phpcs.ruleset.xml`
- Different `jshintrc` rules, less WordPress like
- gulp folder with common tasks and utilities
- added `minifyphp.php` php script

Quick usage
---------------
This repo is used as a submodule, renamed as `common`, it must stays in the `./config` path of the other repositories.

### Install as submodule

To install as Git submodule (recommended):

```bash
git submodule add -b master https://github.com/xwp/wp-dev-lib.git dev-lib
```

To **update** the library with the latest changes:

```bash
git submodule update --remote dev-lib
git add dev-lib
git commit -m "Update dev-lib"
```

To install the pre-commit hook, symlink to [`pre-commit`](pre-commit) from your project's `.git/hooks/pre-commit`, you can use the bundled script to do this:

```bash
./dev-lib/install-pre-commit-hook.sh
```

Also symlink (or copy) the [`.jshintrc`](.jshint), [`.jshintignore`](.jshintignore), [`.jscsrc`](.jscsrc), [`phpcs.xml`](phpcs.xml), and [`phpunit-plugin.xml`](phpunit-plugin.xml) (note the PHPUnit config will need its paths modified if it is copied instead of symlinked):

```bash
ln -s dev-lib/phpunit-plugin.xml phpunit.xml.dist && git add phpunit.xml.dist # (if working with a plugin)
ln -s dev-lib/phpcs.xml . && git add phpcs.xml
ln -s dev-lib/.jshintrc . && git add .jshintrc
ln -s dev-lib/.jscsrc . && git add .jscsrc
ln -s dev-lib/.eslintrc . && git add .eslintrc
ln -s dev-lib/.eslintignore . && git add .eslintignore
ln -s dev-lib/.editorconfig . && git add .editorconfig
cp dev-lib/.jshintignore . && git add .jshintignore # don't use symlink for this
```

It is a best practice to install the various tools as dependencies in the project itself, pegging them at specific versions as required. This will ensure that the the tools will be repeatably installed across environments. When a tool is installed locally, it will be used instead of any globally-installed version. To install packages locally, for example:

```bash
npm init # if you don't have a package.json already
npm install --save-dev eslint jshint jscs grunt-cli
git add package.json
echo 'node_modules' >> .gitignore

composer init # if you don't have a composer.json already
composer require php '>=5.2' # increase this if you need
composer require --dev "wp-coding-standards/wpcs=*"
composer require --dev "wimg/php-compatibility=*"
composer require --dev dealerdirect/phpcodesniffer-composer-installer
echo 'vendor' >> .gitignore

git add .gitignore
```

See below for how to configure your `.travis.yml`.

### Install via symlink (non-submodule)

Often installing as a submodule is not viable, for example when contributing to an existing project, such as WordPress Core itself.  If you don't want to install as a submodule you can instead just clone the repo somewhere on your system and then just add the `pre-commit` hook (see below) to symlink to this location, for example:

```bash
git clone https://github.com/xwp/wp-dev-lib.git ~/Projects/wp-dev-lib
~/Projects/wp-dev-lib/install-pre-commit-hook.sh /path/to/my-plugin
```

For the Travis CI checks, the `.travis.yml` copied and committed to the repo (see below) will clone the repo into the `dev-lib` directory if it doesn't exist (or whatever your `DEV_LIB_PATH` environment variable is set to).

To install the [`.jshintrc`](.jshint), [`.jshintignore`](.jshintignore), [`.jscsrc`](.jscsrc), and (especially optionally) [`phpcs.xml`](phpcs.xml), copy the files into the repo root (as opposed to creating symlinks, as when installing via submodule).

To install dev-lib for all themes and plugins that don't already have a `pre-commit` hook installed, and to upgrade the dev-lib for any submodule installations, you can run the bundled script [`install-upgrade-pre-commit-hook.sh`](install-upgrade-pre-commit-hook.sh) which will look for any repos in the current directory tree and attempt to auto-install. For example:

```bash
git clone https://github.com/xwp/wp-dev-lib.git ~/Shared/dev-lib
cd ~/Shared/dev-lib
./install-shared-pre-commit-hook.sh ~/Projects/wordpress
```

## Travis CI

Copy the [`.travis.yml`](.travis.yml) file into the root of your repo:

```bash
cp dev-lib/.travis.yml .
```

Note that the bulk of the logic in this config file is located in [`travis.install.sh`](travis.install.sh), [`travis.script.sh`](travis.script.sh), and [`travis.after_script.sh`](travis.after_script.sh), so there is minimal chance for the `.travis.yml` to diverge from upstream. Additionally, since each project likely may need to have unique environment targets (such as which PHP versions, whether multisite is relevant, etc), it makes sense that `.travis.yml` gets forked.

**Important Note:** The format of the `.travis.yml` changed in January 2016, so make sure that the file is updated to reflect [the changes](https://github.com/xwp/wp-dev-lib/pull/127/files#diff-354f30a63fb0907d4ad57269548329e3).

Edit the `.travis.yml` to change the target PHP version(s) and WordPress version(s) you need to test for and also whether you need to test on multisite or not:

```yml
php:
    - 5.3
    - 7.0

env:
    - WP_VERSION=latest WP_MULTISITE=0
    - WP_VERSION=latest WP_MULTISITE=1
    - WP_VERSION=trunk WP_MULTISITE=0
    - WP_VERSION=trunk WP_MULTISITE=1
```

Having more variations here is good for open source plugins, which are free for Travis CI. However, if you are using Travis CI with a private repo you probably want to limit the jobs necessary to complete a build. So if your production environment is running PHP 5.5, is on the latest stable version of WordPress, and is not multisite, then your `.travis.yml` could just be:

```yml
php:
    - 5.5

env:
    - WP_VERSION=4.0 WP_MULTISITE=0
```

This will greatly speed up the time build time, giving you quicker feedback on your pull request status, and prevent your Travis build queue from getting too backlogged.

### Limiting Scope of Checks

A barrier of entry for adding automated code quality checks to an existing project is that there may be _a lot_ of issues in your codebase that get reported initially. So to get passing builds you would then have a major effort to clean up your codebase to make it conforming to PHP_CodeSniffer, JSHint, and other tools. This is not ideal and can be problematic in projects with a lot of activity since these changes will add lots of conflicts with others' pull requests.

To get around this issue, there is now an environment variable available for configuration: `CHECK_SCOPE`. By default its value is `patches` which means that when a `pre-commit` runs or Travis runs a build on a pull request or commit, the checks will be restricted in their scope to _only report on issues occurring in the changed lines (patches)_. Checking patches is the most useful, but `CHECK_SCOPE=changed-files` can be added in the project config so that the checks will be limited to the entirety of any file that has been modified.

Also important to note that when the the `pre-commit` check runs, it will run the linters (PHPCS, JSHint, JSCS, etc) on the *staged changes*, not the files as they exist in the working tree. This means that you can use `git add -p` to interactively select changes to stage (which is a good general best practice in contrast to `git commit -a`), and *any code excluded from being staged will be ignored by the linter*. This is very helpful when you have some debug statements which you weren't intending to commit anyway (e.g. `print_r()` or `console.log()`).

With `CHECK_SCOPE=patches` and `CHECK_SCOPE=changed-files` available, it is much easier to integrate automated checks on existing projects that may have a lot of nonconforming legacy code. You can fix up a codebase incrementally line-by-line or file-by-file in the normal course of fixing bugs and adding new features.

If you want to disable the scope-limiting behavior, you can define `CHECK_SCOPE=all`.

## Environment Variables

You may customize the behavior of the `.travis.yml` and `pre-commit` hook by
specifying a `.dev-lib` (formerly `.ci-env.sh`) Bash script in the root of the repo, for example:

```bash
DEFAULT_BASE_BRANCH=develop
PHPCS_GITHUB_SRC=xwp/PHP_CodeSniffer
PHPCS_GIT_TREE=phpcs-patch
PHPCS_IGNORE='tests/*,includes/vendor/*' # See also PATH_INCLUDES below
WPCS_GIT_TREE=develop
WPCS_STANDARD=WordPress-Extra
DISALLOW_EXECUTE_BIT=1
YUI_COMPRESSOR_CHECK=1
PATH_INCLUDES="docroot/wp-content/plugins/acme-* docroot/wp-content/themes/acme-*"
CHECK_SCOPE=patches
```

Set `DEFAULT_BASE_BRANCH` to be whatever your default branch is in GitHub; this is use when doing diff-checks on changes in a branch build on Travis CI. The `PATH_INCLUDES` is especially useful when the dev-lib is used in the context of an entire site, so you can target just the themes and plugins that you're responsible for. For *excludes*, you can specify a `PHPCS_IGNORE` var and override the `.jshintignore`; there is a `PATH_EXCLUDES_PATTERN` as well.

## Pre-commit tips

As noted above in Limiting Scope of Checks, the default behavior for the linters is to only report errors on lines that lie within actual staged changes being committed. So remember to selectively stage the files (via `git add ...`) or better the patches (via `git add -p ...`).

### Skipping Checks

If you do need to disable the `pre-commit` hook for an extenuating circumstance (e.g. to commit a work in progress to share), you can use the `--no-verify` argument:
>>>>>>> 61a4add397effac047f2ffe015d600ebd2db0ffe

```bash
# To add it to your repo, from the `/config` folder do:
git submodule add https://github.com/knitkode/wp-dev-lib.git config/common
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
