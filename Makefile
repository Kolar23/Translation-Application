build:
	docker-compose up -d --build
	sleep 30
	docker exec -it translator-database /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'STRONG@PASSWORD123' -Q 'CREATE DATABASE translator;'
	sleep 5
	docker container start translator-backend
	sleep 30
	docker cp sqlcommands.sql translator-database:/sqlcommands.sql
	docker exec -i translator-database /opt/mssql-tools/bin/sqlcmd -S localhost -U SA -P 'STRONG@PASSWORD123' -i /sqlcommands.sql
down:
	docker-compose down

up:
	docker-compose start

stop:
	docker-compose stop


# passwords
# yordan: 1234
# admin: admin
# prof: admin