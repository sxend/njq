njq (node jq)
======

### JS-based JSON Processor

```
echo '{"message": "Hello, World."}' | njq '_.message'
# Hello, World.
```

```
var njq = require('njq');
var message = njq('{"message": "Hello, World."}', '_.message');
console.log(message); // Hello, World.
```
