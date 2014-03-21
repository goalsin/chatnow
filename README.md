
## 技术栈

- faye      v1.0.1
- jquery    v1.10.2 

## test faye

    curl -X POST http://localhost:9200/faye        
		-H 'Content-Type: application/json'        
		-d '{"channel": "/foo", "data": "hi", "ext": {"password": "..."}}'
		

## 功能

- user login
- user online
- user offline
- user exit
- p2p
- discuss group
- load chatsession history
