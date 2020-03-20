#ifndef WASM_EXPORT
#define WASM_EXPORT __attribute__((visibility("default")))

class Fib
{

public:
	Fib();
	int next();

private:
	int curr = 1;
	int prev = 1;
};

#endif