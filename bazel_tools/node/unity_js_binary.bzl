"Implementation details for unity_js_binary rule"

load("@aspect_rules_js//js:libs.bzl", "js_binary_lib")
load("@bazel_skylib//lib:dicts.bzl", "dicts")

_unity_js_binary = rule(
    attrs = dicts.add(js_binary_lib.attrs, {
        "_node_wrapper_sh": attr.label(
            default = "//bazel_tools:node/node_wrapper.sh",  # originally @aspect_rules_js//js/private:node_wrapper.sh
            allow_single_file = True,
        ),
    }),
    executable = True,
    implementation = js_binary_lib.implementation,
    toolchains = js_binary_lib.toolchains,
)

def unity_js_binary(
        name,
        **kwargs):
    """Runs js_binary and prepares a root-level node_modules tree.
    """

    env = kwargs.pop("env", {})
    env.setdefault("BAZEL_BINDIR", "$(BINDIR)")

    _unity_js_binary(
        name = name,
        enable_runfiles = select({
            "@aspect_rules_js//js/private:enable_runfiles": True,
            "//conditions:default": False,
        }),
        env = env,
        **kwargs
    )
