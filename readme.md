# wp-dev-lib

Look at the [original repo](https://github.com/xwp/wp-dev-lib) readme.

Differences from original repo
---------------
- One of the main difference is that the branch to be deployed to WordPress or, in general, the production branch containing the code distributed to the users is the `trunk` branch and not `master`, which is instead used for development.
- More rules to `phpcs`.
- Different `jshintrc` rules, less WordPress like.


Quick usage
---------------

```bash
# To add it to your repo, do:
git submodule add https://github.com/PlusWP/wp-dev-lib.git dev-lib

# To update the library with the latest changes:
git submodule update --remote dev-lib
git add dev-lib
git commit -m "Update dev-lib"

# one liner
git submodule update --remote dev-lib && git add dev-lib && git commit -m "Update dev-lib"
```