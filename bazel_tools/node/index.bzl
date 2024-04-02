"""Public API surface is re-exported here."""

load("@aspect_rules_js//js:defs.bzl", _js_library = "js_library")
load("@aspect_rules_ts//ts:defs.bzl", _ts_config = "ts_config")
load("//bazel_tools:node/typescript.bzl", _ts_project = "ts_project")
load("//bazel_tools:node/unity_js_binary.bzl", _unity_js_binary = "unity_js_binary")

js_binary = _unity_js_binary
js_library = _js_library
ts_project = _ts_project
ts_config = _ts_config
