workspace(name = "unity")

SKYLIB_VERSION = "1.2.1"

NODE_VERSION = "20.11.1"

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Release: 1.2.1
# TargetCommitish: main
# Date: 2022-03-10 16:31:05 +0000 UTC
# URL: https://github.com/bazelbuild/bazel-skylib/releases/tag/1.2.1
# Size: 96447 (96 kB)
http_archive(
    name = "bazel_skylib",
    sha256 = "f7be3474d42aae265405a592bb7da8e171919d74c16f082a5457840f06054728",
    type = "tar.gz",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/{}/bazel-skylib-{}.tar.gz".format(SKYLIB_VERSION, SKYLIB_VERSION),
        "https://github.com/bazelbuild/bazel-skylib/releases/download/{}/bazel-skylib-{}.tar.gz".format(SKYLIB_VERSION, SKYLIB_VERSION),
    ],
)

#######################
### Aspect Rulesets ###
#######################

# Release: v6.0.3
# TargetCommitish: main
# Date: 2023-12-05 00:59:49 +0000 UTC
# URL: https://github.com/bazelbuild/rules_nodejs/releases/tag/v6.0.3
# Size: 244358 (244 kB)
#
# Resolves version errors by allowing us to specify later versions that the
# verison of rules_nodejs rules_js pulls in
http_archive(
    name = "rules_nodejs",
    sha256 = "f36e4a4747210331767033dc30728ae3df0856e88ecfdc48a0077ba874db16c3",
    strip_prefix = "rules_nodejs-6.0.3",
    urls = ["https://github.com/bazelbuild/rules_nodejs/archive/v6.0.3.tar.gz"],
)

# Release: v1.37.1
# TargetCommitish: main
# Date: 2024-01-26 00:18:53 +0000 UTC
# URL: https://github.com/aspect-build/rules_js/releases/tag/v1.37.1
# Size: 2319551 (2.3 MB)
http_archive(
    name = "aspect_rules_js",
    patch_args = ["-p1"],
    patches = ["//:patches/aspect_rules_js+unity-module-link.patch"],
    sha256 = "ab56f5e8b001926bef9a23261ff97e70b82b9cc1117a1e4cdc4231c6b8b43568",
    strip_prefix = "rules_js-1.37.1",
    urls = ["https://github.com/aspect-build/rules_js/archive/v1.37.1.tar.gz"],
)

# Release: v2.1.1
# TargetCommitish: main
# Date: 2024-01-24 18:20:49 +0000 UTC
# URL: https://github.com/aspect-build/rules_ts/releases/tag/v2.1.1
# Size: 121420 (121 kB)
http_archive(
    name = "aspect_rules_ts",
    sha256 = "6ad28b5bac2bb5a74e737925fbc3f62ce1edabe5a48d61a9980c491ef4cedfb7",
    strip_prefix = "rules_ts-2.1.1",
    urls = ["https://github.com/aspect-build/rules_ts/archive/v2.1.1.tar.gz"],
)

# Release: v1.1.0
# TargetCommitish: main
# Date: 2023-08-10 19:14:55 +0000 UTC
# URL: https://github.com/aspect-build/rules_swc/releases/tag/v1.1.0
# Size: 47138 (47 kB)
http_archive(
    name = "aspect_rules_swc",
    sha256 = "8eb9e42ed166f20cacedfdb22d8d5b31156352eac190fc3347db55603745a2d8",
    strip_prefix = "rules_swc-1.1.0",
    urls = ["https://github.com/aspect-build/rules_swc/archive/v1.1.0.tar.gz"],
)

load("@aspect_rules_js//js:repositories.bzl", "rules_js_dependencies")

rules_js_dependencies()

load("@aspect_rules_ts//ts:repositories.bzl", "rules_ts_dependencies")

rules_ts_dependencies(ts_version_from = "//:package.json")

load("@rules_nodejs//nodejs:repositories.bzl", "nodejs_register_toolchains")

nodejs_register_toolchains(
    name = "nodejs",
    node_version = NODE_VERSION,
)

load("@aspect_rules_js//npm:npm_import.bzl", "npm_translate_lock")

npm_translate_lock(
    name = "npm",
    pnpm_lock = "//:pnpm-lock.yaml",
    verify_node_modules_ignored = "//:.bazelignore",
)

load("@npm//:repositories.bzl", "npm_repositories")

npm_repositories()
