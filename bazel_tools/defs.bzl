# Shows what output groups are available from a given rule
# to be used with filegroup
# can be used by appending --aspects=//bazel_tools:defs.bzl%output_group_query_aspect to a bazel build invocation
# along with the `--nobuild` flag
# buildifier: disable=print
# buildifier: disable=unused-variable DO NOT REMOVE THIS, it will break the invocation
def _output_group_query_aspect_impl(target, ctx):
    for og in target.output_groups:
        print("output group " + str(og) + ": " + str(getattr(target.output_groups, og)))
    return []

output_group_query_aspect = aspect(
    implementation = _output_group_query_aspect_impl,
)
