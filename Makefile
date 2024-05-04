build:
	docker-compose up -d --build
	sleep 20
	docker exec -it translator-database /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'STRONG@PASSWORD123' -Q 'CREATE DATABASE translator;'
	sleep 10
	docker container start translator-backend
down:
	docker-compose down

up:
	docker-compose start

stop:
	docker-compose stop