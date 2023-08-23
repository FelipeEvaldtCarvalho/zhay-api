up: 	 		
	@docker-compose up -d

down: 	 		
	@docker-compose down

update: 	 		
	@docker-compose down
	@docker-compose up --build -d