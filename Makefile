run-hello-world:
	sam local start-api -t sam/template.yaml --parameter-overrides "HelloFrom='Local Typescript'"

debug-hello-world:
	sam local start-api -t sam/template.yaml --parameter-overrides "HelloFrom='Debugged Typescript'" --debug-port 5858

get-hello-world:
	curl 'http://127.0.0.1:3000/hello-world/Bangles' | jq

generate-event:
	sam local generate-event apigateway aws-proxy --method GET --path typescript | jq

generate-event-s3:
	sam local generate-event s3 put --bucket make-beleive-bucket --key someObject | jq

local-invoke:
	sam local generate-event apigateway aws-proxy --method GET --path typescript | \
  sam local invoke -t sam/template.yaml --parameter-overrides "HelloFrom='Local Invoke'" -e - HelloWorldFunction

logs:
	sam logs --name HelloWorldFunction --profile sam-demo --tail --stack-name sam-typescript-demo

deploy:
	npm run build
	sam deploy \
		--profile sam-demo \
		--stack-name sam-typescript-demo \
		--template ./sam/template.yaml \
		--s3-bucket sam-demo-deployment \
    --parameter-overrides "HelloFrom='AWS'" \
		--capabilities CAPABILITY_IAM

.PHONY: run-hello-world get-hello-world debug-hello-world local-invoke generate-event generate-event-s3 logs
