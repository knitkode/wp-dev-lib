# wp-dev-lib

Look at the [original repo](https://github.com/xwp/wp-dev-lib) readme.

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