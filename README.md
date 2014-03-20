
## test faye

    curl -X POST http://localhost:9200/faye        -H 'Content-Type: application/json'        -d '{"channel": "/foo", "data": "hi", "ext": {"password": "..."}}'

