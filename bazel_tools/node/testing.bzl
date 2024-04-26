"""vitest macro"""

load("//bazel_tools:node/vitest_test.bzl", "vitest_test")

DEPS = [
    "@unity//:vitest_config",
    "@unity//:tsconfig",
    # implicitly include vitest helpers as most all tests will need it
    # and its a temporary include until the npm package publishes it and we can remove it here
    "//trumid/common/testing/vitest",
]

def ts_test(name, srcs = [], **kwargs):
    """
    Run a test using vitest

    Args:
        name: name of the test target
        srcs: list of source files
        **kwargs: additional arguments to pass to vitest_test
    """
    deps = kwargs.pop("deps", [])
    data = kwargs.pop("data", [])

    deduped_deps = depset(deps + DEPS).to_list()

    vitest_test(
        name = name,
        data = data + srcs + deduped_deps,
        **kwargs
    )
