#!/bin/bash
cd "$(dirname "$0")"
source ../emsdk/emsdk_env.sh
em++ ./main.cpp \
	-s WASM=1 \
	-s EXPORTED_FUNCTIONS=['_square'] \
	-s EXTRA_EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] \
	-O3 -o ../public/wasm.js