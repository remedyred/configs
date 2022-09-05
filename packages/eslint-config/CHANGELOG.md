# Changelog

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## 1.0.0 (2022-09-05)


### Features

* add better renovate configurations ([0ca4304](https://github.com/remedyred/configs/commit/0ca43048c45e187d7f2ddd5f187dfe17bf584ce9))
* add semantic release workflow ([#33](https://github.com/remedyred/configs/issues/33)) ([974358b](https://github.com/remedyred/configs/commit/974358b5d9076f386b5278c1441e6c31ded636a5))
* add semantic release workflow ([#36](https://github.com/remedyred/configs/issues/36)) ([9b380d5](https://github.com/remedyred/configs/commit/9b380d517b5caed2245bff29b81a2529d0a4d786))
* add semantic-release-conventional-commits ([#60](https://github.com/remedyred/configs/issues/60)) ([f659b3f](https://github.com/remedyred/configs/commit/f659b3f9a7c8793b0effa516bd7e996b002618d8))
* add semantic-release-monorepo shared config ([#66](https://github.com/remedyred/configs/issues/66)) ([1d40446](https://github.com/remedyred/configs/commit/1d404465902bb33b5342434f365bc5effb195a7a))
* **eslint:** add jest rules ([#25](https://github.com/remedyred/configs/issues/25)) ([609d716](https://github.com/remedyred/configs/commit/609d71650bfd9b9a7fe211bfe07118b9ffc56565))
* **eslint:** add sort-annotation plugin ([#28](https://github.com/remedyred/configs/issues/28)) ([6050194](https://github.com/remedyred/configs/commit/6050194c6fdc768b75e2d7c89f26b7708ba4629b))
* **eslint:** add yaml linting ([#38](https://github.com/remedyred/configs/issues/38)) ([1c72b22](https://github.com/remedyred/configs/commit/1c72b22a696bf88dfcc34a7b9267d262eb1ae000))
* **eslint:** re-evaluate rules, adding new ones, and adjusting or removing existing ones ([#32](https://github.com/remedyred/configs/issues/32)) ([d36d796](https://github.com/remedyred/configs/commit/d36d79685446cb9df63eb9feeebb746169731d25))
* implement renovate config ([8ea9271](https://github.com/remedyred/configs/commit/8ea927104c0ba29a97481e8f3af8c8618077e049))
* **renovate:** add custom settings and post upgrade tasks ([#54](https://github.com/remedyred/configs/issues/54)) ([0ba9c74](https://github.com/remedyred/configs/commit/0ba9c74e7e9808b555e6739356aeba7d9d419ef8))
* **renovate:** rebuild renovate config using a build script ([#16](https://github.com/remedyred/configs/issues/16)) ([7cd59b1](https://github.com/remedyred/configs/commit/7cd59b1b0b94868b24815877fd506e36ac72a741))
* **semantic-release:** add default branches config ([#30](https://github.com/remedyred/configs/issues/30)) ([701b974](https://github.com/remedyred/configs/commit/701b974ce4c6c92aabe7209bd0bfbb34ac549568))
* **semantic-release:** add more branches ([5722e8d](https://github.com/remedyred/configs/commit/5722e8dd1065ef1819e0106fcbe703d90044f51a))


### Bug Fixes

* adjust groups ([905bbf4](https://github.com/remedyred/configs/commit/905bbf44aae5efa8a9403ba760a9952d5d3e9a5f))
* allow kebab-case and PascalCase for filenames ([#68](https://github.com/remedyred/configs/issues/68)) ([9b37fc8](https://github.com/remedyred/configs/commit/9b37fc85ff9c6e62054acff01b19a693c042b8fc))
* **ci:** disable semantic-release dry run ([40b0d6e](https://github.com/remedyred/configs/commit/40b0d6e6f9addefd23faab06841f7aa1a4c92814))
* **ci:** ensure prod is run before linting, testing, or validating ([12fc264](https://github.com/remedyred/configs/commit/12fc2646a1819065c650095193156eaad09076c2))
* **ci:** only run on PR merge ([#56](https://github.com/remedyred/configs/issues/56)) ([86add01](https://github.com/remedyred/configs/commit/86add0131081219e322284671526240f51e6ae55))
* **ci:** reconfigure turbo to better work in ci ([8fe5386](https://github.com/remedyred/configs/commit/8fe5386fe461cde65e7de14b1e21f7aa904dc2f8))
* **ci:** rename build to dev and prod to build ([329dabd](https://github.com/remedyred/configs/commit/329dabd1e82d1efb19283c76935643efaffddc21))
* **ci:** set workflow to use branch triggers ([#57](https://github.com/remedyred/configs/issues/57)) ([45c9081](https://github.com/remedyred/configs/commit/45c90813eb7acbfa9c43a0d3c86d246e16b123f0))
* **ci:** use correct prerelease command ([ac277a6](https://github.com/remedyred/configs/commit/ac277a698a0873a2a6e3f7c2cf59bef4aba4e043))
* **ci:** use pnpm scope for turbo command ([1e6190f](https://github.com/remedyred/configs/commit/1e6190fe87873ef6b246c428374b14ef54502f0d))
* **ci:** use root lint and test [skip-ci] ([fcc1530](https://github.com/remedyred/configs/commit/fcc1530174da7c70c6b425741c65ffdda840cd76))
* don't extend semantic-release-monorepo ([ecf359b](https://github.com/remedyred/configs/commit/ecf359b7998e9e3addd794b0a89ffe3294c6a436))
* **eslint:** add typescript dev dep ([7a6f2dc](https://github.com/remedyred/configs/commit/7a6f2dcce8320f2885b13767bbc70f5237f2fa84))
* **eslint:** adjust dependencies to always be loaded ([b3b190d](https://github.com/remedyred/configs/commit/b3b190dbf9cdb29902842234b8691a1efd74b2b8))
* **eslint:** array newline and spacing rules ([#29](https://github.com/remedyred/configs/issues/29)) ([e0dfb75](https://github.com/remedyred/configs/commit/e0dfb7562a3ea6c450d5cc5e591f98cae4a4256c))
* **eslint:** correct exports ([67da36d](https://github.com/remedyred/configs/commit/67da36dcb54b19710f7f3056d1cc09d5af7c9844))
* **eslint:** duplicate recommended in vue ([1e6bf59](https://github.com/remedyred/configs/commit/1e6bf5986b0967a1bf3eff528f101f3f0e62bd07))
* **eslint:** explicitly export configs ([451057e](https://github.com/remedyred/configs/commit/451057e2ef2c7912cb239ad18a04ddf62bdb4272))
* **eslint:** extend vue from recommended ([f26e164](https://github.com/remedyred/configs/commit/f26e164728eb911af666f602e7bd14c5facf82ae))
* **eslint:** refactor and simplify files, add tests ([#19](https://github.com/remedyred/configs/issues/19)) ([7bc7a17](https://github.com/remedyred/configs/commit/7bc7a17216eb9d1387ec3dffa267057269f513c8))
* **eslint:** rename json-files to json ([#37](https://github.com/remedyred/configs/issues/37)) ([893d642](https://github.com/remedyred/configs/commit/893d642e053edad2fd545305f23fd3c1e6b2e436))
* **eslint:** set dependencies as optional ([8e835af](https://github.com/remedyred/configs/commit/8e835afc27c4240609b415322611a5b9aa1e834a))
* **eslint:** set prefer-const to "warn" ([80df141](https://github.com/remedyred/configs/commit/80df141785901e567aae0736819b8d3c22b09c45))
* **eslint:** update snapshot and relint monorepo ([#31](https://github.com/remedyred/configs/issues/31)) ([e5ff463](https://github.com/remedyred/configs/commit/e5ff463d59045acaa45f8423e122b55092350204))
* **eslint:** use property matcher for snapshot config field "parser" ([28b1cf1](https://github.com/remedyred/configs/commit/28b1cf13cf85d6bbfa11e71cb8175c743d3db8a4))
* **eslint:** use property matcher for snapshot lint results field "filePath" ([749eefe](https://github.com/remedyred/configs/commit/749eefeeb79e3de16ced9a8fa75c84b239dbae1a))
* explicitly set github as renovate host ([17c3ea0](https://github.com/remedyred/configs/commit/17c3ea0ba652b00f5abaadf4469d1b178a1e8ee9))
* extend semantic-release-monorepo by default ([990ff51](https://github.com/remedyred/configs/commit/990ff5170d364559b1c3a988cecb8feb85ae52a6))
* improve renovate groups to reduce noise ([#53](https://github.com/remedyred/configs/issues/53)) ([f49f814](https://github.com/remedyred/configs/commit/f49f814c0845ecb82a56eb20e9e3a324f59d0491))
* remove patch from minor ([ad3f8cf](https://github.com/remedyred/configs/commit/ad3f8cfc1cb43d360b26be875a30b970980c8b90))
* **renovate:** add @snickbit/eslint-config to lint grouping ([9c8b3fc](https://github.com/remedyred/configs/commit/9c8b3fcffddbb8083e8e00adf8586d3223bc089d))
* **renovate:** add default.json for renovate config resolution ([4543425](https://github.com/remedyred/configs/commit/4543425160d3d24cfdb8ba906a17673e0de26c52))
* **renovate:** add missing typescript dev dependency ([9b94f7e](https://github.com/remedyred/configs/commit/9b94f7e3644d37fc46a556896cc1e569d6da3489))
* **renovate:** add renovate as a dependency ([ea76e07](https://github.com/remedyred/configs/commit/ea76e074f2669a8063d5763b6dd7f716d983b473))
* **renovate:** allow ^0 patches for esbuild ([6537d92](https://github.com/remedyred/configs/commit/6537d92186ba8e5af01629a3c61c0ee19bdeee40))
* **renovate:** move generated configs to root ([5db7d26](https://github.com/remedyred/configs/commit/5db7d26b0e4196e08c340130b5fa71d303e38561))
* **renovate:** use correct config paths for validation ([0aa85df](https://github.com/remedyred/configs/commit/0aa85df6da12c48314b29cb0a3cde597bee3bb2b))
* **semantic-release:** add docs and readme to git add ([c77dac4](https://github.com/remedyred/configs/commit/c77dac473b190f4a4a92327f8fd0081d7a0770dd))
* **semantic-release:** fix semantic-release plugin configs ([#64](https://github.com/remedyred/configs/issues/64)) ([4efecd6](https://github.com/remedyred/configs/commit/4efecd6d8ce6658899723c0673de5554c21401fc))
* **semantic-release:** switch to semantic-release-pr-analyzer for squash and merge support ([272e9b6](https://github.com/remedyred/configs/commit/272e9b62e1d91e7e6f7b831e8308a47699b06ab6))
* **semantic-release:** test for next branch ([c6ffc4f](https://github.com/remedyred/configs/commit/c6ffc4f577598d373fc1c697446d3301f418f014))
* **semantic-release:** update package.json in the repo ([3a804b2](https://github.com/remedyred/configs/commit/3a804b25e1fbee03febe921c1edbdea2c924f5db))
* **semantic-release:** use export = config ([4ed4316](https://github.com/remedyred/configs/commit/4ed4316f55ff494bc8170ee260caee9f42c581cd))
* update default config ([9b6cb1c](https://github.com/remedyred/configs/commit/9b6cb1cdc2be07952efcf61f04cc5d395b845427))


### Reverts

* Revert "feat(semantic-release): add github pull requests by default" ([6d11d84](https://github.com/remedyred/configs/commit/6d11d8406a040f8206d4c2dc3458ea3137ce572e))
* **eslint:** explicitly export configs ([cb51649](https://github.com/remedyred/configs/commit/cb516499247ea2c871c946d647665e02e36be50b))
* **semantic-release:** switch to semantic-release-pr-analyzer for squash and merge support ([a47e36d](https://github.com/remedyred/configs/commit/a47e36dff62b4407c7e516003a14b5d67c0619a5))

## [@snickbit/eslint-config-v1.3.2](https://github.com/snickbit/configs/compare/@snickbit/eslint-config-v1.3.1...@snickbit/eslint-config-v1.3.2) (2022-08-25)


### Bug Fixes

* allow kebab-case and PascalCase for filenames ([#68](https://github.com/snickbit/configs/issues/68)) ([9b37fc8](https://github.com/snickbit/configs/commit/9b37fc85ff9c6e62054acff01b19a693c042b8fc))

## [@snickbit/eslint-config-v1.1.0](https://github.com/snickbit/configs/compare/@snickbit/eslint-config-v1.0.0...@snickbit/eslint-config-v1.1.0) (2022-08-21)


### Features

* **eslint:** add yaml linting ([#38](https://github.com/snickbit/configs/issues/38)) ([1c72b22](https://github.com/snickbit/configs/commit/1c72b22a696bf88dfcc34a7b9267d262eb1ae000))

## @snickbit/eslint-config-v1.0.0 (2022-08-21)


### Features

* add semantic release workflow ([#36](https://github.com/snickbit/configs/issues/36)) ([9b380d5](https://github.com/snickbit/configs/commit/9b380d517b5caed2245bff29b81a2529d0a4d786))
* **eslint:** add jest rules ([#25](https://github.com/snickbit/configs/issues/25)) ([609d716](https://github.com/snickbit/configs/commit/609d71650bfd9b9a7fe211bfe07118b9ffc56565))
* **eslint:** add sort-annotation plugin ([#28](https://github.com/snickbit/configs/issues/28)) ([6050194](https://github.com/snickbit/configs/commit/6050194c6fdc768b75e2d7c89f26b7708ba4629b))


### Bug Fixes

* **ci:** disable semantic-release dry run ([40b0d6e](https://github.com/snickbit/configs/commit/40b0d6e6f9addefd23faab06841f7aa1a4c92814))
* **ci:** rename build to dev and prod to build ([329dabd](https://github.com/snickbit/configs/commit/329dabd1e82d1efb19283c76935643efaffddc21))
* **eslint:** add typescript dev dep ([7a6f2dc](https://github.com/snickbit/configs/commit/7a6f2dcce8320f2885b13767bbc70f5237f2fa84))
* **eslint:** adjust dependencies to always be loaded ([b3b190d](https://github.com/snickbit/configs/commit/b3b190dbf9cdb29902842234b8691a1efd74b2b8))
* **eslint:** array newline and spacing rules ([#29](https://github.com/snickbit/configs/issues/29)) ([e0dfb75](https://github.com/snickbit/configs/commit/e0dfb7562a3ea6c450d5cc5e591f98cae4a4256c))
* **eslint:** correct exports ([67da36d](https://github.com/snickbit/configs/commit/67da36dcb54b19710f7f3056d1cc09d5af7c9844))
* **eslint:** duplicate recommended in vue ([1e6bf59](https://github.com/snickbit/configs/commit/1e6bf5986b0967a1bf3eff528f101f3f0e62bd07))
* **eslint:** explicitly export configs ([451057e](https://github.com/snickbit/configs/commit/451057e2ef2c7912cb239ad18a04ddf62bdb4272))
* **eslint:** extend vue from recommended ([f26e164](https://github.com/snickbit/configs/commit/f26e164728eb911af666f602e7bd14c5facf82ae))
* **eslint:** refactor and simplify files, add tests ([#19](https://github.com/snickbit/configs/issues/19)) ([7bc7a17](https://github.com/snickbit/configs/commit/7bc7a17216eb9d1387ec3dffa267057269f513c8))
* **eslint:** rename json-files to json ([#37](https://github.com/snickbit/configs/issues/37)) ([893d642](https://github.com/snickbit/configs/commit/893d642e053edad2fd545305f23fd3c1e6b2e436))
* **eslint:** set dependencies as optional ([8e835af](https://github.com/snickbit/configs/commit/8e835afc27c4240609b415322611a5b9aa1e834a))
* **eslint:** set prefer-const to "warn" ([80df141](https://github.com/snickbit/configs/commit/80df141785901e567aae0736819b8d3c22b09c45))
* **eslint:** update snapshot and relint monorepo ([#31](https://github.com/snickbit/configs/issues/31)) ([e5ff463](https://github.com/snickbit/configs/commit/e5ff463d59045acaa45f8423e122b55092350204))
* **eslint:** use property matcher for snapshot config field "parser" ([28b1cf1](https://github.com/snickbit/configs/commit/28b1cf13cf85d6bbfa11e71cb8175c743d3db8a4))
* **eslint:** use property matcher for snapshot lint results field "filePath" ([749eefe](https://github.com/snickbit/configs/commit/749eefeeb79e3de16ced9a8fa75c84b239dbae1a))


### Reverts

* **eslint:** explicitly export configs ([cb51649](https://github.com/snickbit/configs/commit/cb516499247ea2c871c946d647665e02e36be50b))

# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.10](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.9...@snickbit/eslint-config@0.0.10) (2022-08-13)

### Reverts

* **eslint:** explicitly export configs ([cb51649](https://github.com/snickbit/configs/commit/cb516499247ea2c871c946d647665e02e36be50b))

## [0.0.9](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.8...@snickbit/eslint-config@0.0.9) (2022-08-13)

### Bug Fixes

* **eslint:** explicitly export configs ([451057e](https://github.com/snickbit/configs/commit/451057e2ef2c7912cb239ad18a04ddf62bdb4272))

## [0.0.8](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.7...@snickbit/eslint-config@0.0.8) (2022-08-13)

### Bug Fixes

* **eslint:** adjust dependencies to always be loaded ([b3b190d](https://github.com/snickbit/configs/commit/b3b190dbf9cdb29902842234b8691a1efd74b2b8))
* **eslint:** refactor and simplify files, add tests ([#19](https://github.com/snickbit/configs/issues/19)) ([7bc7a17](https://github.com/snickbit/configs/commit/7bc7a17216eb9d1387ec3dffa267057269f513c8))

## [0.0.7](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.6...@snickbit/eslint-config@0.0.7) (2022-08-09)

### Bug Fixes

* **eslint:** correct exports ([67da36d](https://github.com/snickbit/configs/commit/67da36dcb54b19710f7f3056d1cc09d5af7c9844))

## [0.0.6](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.5...@snickbit/eslint-config@0.0.6) (2022-08-09)

### Bug Fixes

* **eslint:** duplicate recommended in vue ([1e6bf59](https://github.com/snickbit/configs/commit/1e6bf5986b0967a1bf3eff528f101f3f0e62bd07))

## [0.0.5](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.4...@snickbit/eslint-config@0.0.5) (2022-08-09)

### Bug Fixes

* **eslint:** extend vue from recommended ([f26e164](https://github.com/snickbit/configs/commit/f26e164728eb911af666f602e7bd14c5facf82ae))

## [0.0.4](https://github.com/snickbit/configs/compare/@snickbit/eslint-config@0.0.3...@snickbit/eslint-config@0.0.4) (2022-08-08)

### Bug Fixes

* **eslint:** add typescript dev dep ([7a6f2dc](https://github.com/snickbit/configs/commit/7a6f2dcce8320f2885b13767bbc70f5237f2fa84))
* **eslint:** set dependencies as optional ([8e835af](https://github.com/snickbit/configs/commit/8e835afc27c4240609b415322611a5b9aa1e834a))

## [0.0.3](https://github.com/snickbit/shareable-configs/compare/@snickbit/eslint-config@0.0.2...@snickbit/eslint-config@0.0.3) (2022-08-06)

### Bug Fixes

* **eslint:** set prefer-const to "warn" ([80df141](https://github.com/snickbit/shareable-configs/commit/80df141785901e567aae0736819b8d3c22b09c45))

## [0.0.2](https://github.com/snickbit/shareable-configs/compare/@snickbit/eslint-config@0.0.1...@snickbit/eslint-config@0.0.2) (2022-08-06)

**Note:** Version bump only for package @snickbit/eslint-config

## 0.0.1 (2022-08-06)

**Note:** Version bump only for package @snickbit/eslint-config
