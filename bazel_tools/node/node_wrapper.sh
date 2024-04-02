#!/usr/bin/env bash
set -o pipefail -o errexit -o nounset

# Create a 'node_modules/unity' symlink pointing to the source files such that
# import paths like
# 'unity/thirdparty/protobuf/grpc/src/main/protobuf/grpc/health/v1/health' will
# resolve.
node_modules_dir="${JS_BINARY__RUNFILES}/node_modules"
mkdir -p "${node_modules_dir}"
ln -sf "${JS_BINARY__RUNFILES}/unity" "${JS_BINARY__RUNFILES}/node_modules/unity"

exec "$JS_BINARY__NODE_BINARY" --require "$JS_BINARY__NODE_PATCHES" "$@"
