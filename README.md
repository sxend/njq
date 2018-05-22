njq (node jq)
======

### JS-based JSON Processor

```
$ echo '{"message": "Hello, World."}' | njq '_.message'
> Hello, World.
$ echo '{"message": "Hello, World."}' > sample.json
$ njq '_.message' sample.json
> Hello, World.
```
