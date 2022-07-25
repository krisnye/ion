
## Web Assembly and Javascript Hybrid Memory

- Structural types are allocated by value in linear memory.
- Structural Typed Arrays (STA) are allocated in WASM Memory.
- Allocator is written in Javascript and also available in WASM.
- Values can be read/written from Javascript.
- Ion functions that operate strictly on STA's or value types can be implemented in WASM.
- STA are passed by pointer using offset into shared memory buffer.
- New STA can be allocated in WASM and returned to Javascript as pointer + size.

