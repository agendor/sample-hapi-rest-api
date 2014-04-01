MOCHA=./node_modules/mocha/bin/mocha

#run-integration:
#	NODE_PATH=. NODE_ENV=test NODE_PORT=8002 $(MOCHA) --timeout 30000 test/integration/*.js

#test-integration: run-integration

test-unit:
	NODE_PATH=. $(MOCHA) test/unit/*.js

test-cov:
	NODE_PATH=. $(MOCHA) test/unit/*.js -R html-cov --recursive > coverage.html

#test-all: test-integration test-unit