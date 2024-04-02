"Implementation details for unity_js_test rule"

load("@aspect_rules_js//js:libs.bzl", "js_binary_lib")

_unity_js_test = rule(
    implementation = js_binary_lib.implementation,
    attrs = dict(js_binary_lib.attrs, **{
        "_node_wrapper_sh": attr.label(
            default = "@//bazel_tools:node/node_test_wrapper.sh",  # originally @aspect_rules_js//js/private:node_wrapper.sh
            allow_single_file = True,
        ),
        "_lcov_merger": attr.label(
            executable = True,
            default = Label("@aspect_rules_js//js/private/coverage:merger"),
            cfg = "exec",
        ),
    }),
    test = True,
    toolchains = js_binary_lib.toolchains,
)

def unity_js_test(
        name,
        **kwargs):
    """Runs js_test and prepares a root-level node_modules tree.
    """

    env = kwargs.pop("env", {})
    env.setdefault("BAZEL_BINDIR", "$(BINDIR)")

    _unity_js_test(
        name = name,
        enable_runfiles = select({
            "@aspect_rules_js//js/private:enable_runfiles": True,
            "//conditions:default": True,
        }),
        env = env,
        **kwargs
    )
