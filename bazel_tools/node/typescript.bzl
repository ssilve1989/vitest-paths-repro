"""typescript macros that includes eslint testing"""

load("@aspect_rules_ts//ts:defs.bzl", _ts_project = "ts_project")

def ts_project(name, **kwargs):
    """ts_project macro wrapper. provides sensible defaults to ts_project

    Args:
        name: target name
        **kwargs: passthrough args
    """

    srcs = kwargs.pop("srcs")
    tsconfig = kwargs.pop("tsconfig", "//:tsconfig")
    declaration = kwargs.pop("declaration", True)
    declaration_map = kwargs.pop("declaration_map", True)
    source_map = kwargs.pop("source_map", True)
    resolve_json_module = kwargs.pop("resolve_json_module", True)
    deps = kwargs.pop("deps", [])

    native.filegroup(
        name = "%s.srcs" % name,
        srcs = srcs + deps,
    )

    _ts_project(
        name = name,
        srcs = srcs,
        tsconfig = tsconfig,
        transpiler = "tsc",
        declaration = declaration,
        declaration_map = declaration_map,
        source_map = source_map,
        resolve_json_module = resolve_json_module,
        deps = deps + ["@unity//:node_modules/tslib", "@unity//:node_modules/vitest"],
        **kwargs
    )
