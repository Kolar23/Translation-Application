build:
	docker-compose up -d --build
	
down:
	docker-compose down

up:
	docker-compose start

stop:
	docker-compose stop