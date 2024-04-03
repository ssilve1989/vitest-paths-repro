load("@//bazel_tools:node/unity_js_test.bzl", "unity_js_test")
load("@aspect_bazel_lib//lib:directory_path.bzl", _directory_path = "directory_path")

def _vitest_test_internal(name, link_root_name, **kwargs):
    store_target_name = ".aspect_rules_js/{}/vitest@1.3.1".format(link_root_name)
    _directory_path(
        name = "%s__entry_point" % name,
        directory = "@//:{}/dir".format(store_target_name),
        path = "./vitest.mjs",
        tags = ["manual"],
    )
    unity_js_test(
        name = name,
        entry_point = ":%s__entry_point" % name,
        data = kwargs.pop("data", []) + ["@//:{}".format(store_target_name)],
        **kwargs
    )

def vitest_test(name, **kwargs):
    _vitest_test_internal(name, "node_modules", **kwargs)
