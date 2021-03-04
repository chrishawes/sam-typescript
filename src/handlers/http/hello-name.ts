import 'source-map-support/register'
import { Handler, APIGatewayProxyEventV2, APIGatewayProxyStructuredResultV2 } from 'aws-lambda'

interface HelloWorldHttpEvent extends APIGatewayProxyEventV2 {
  pathParameters: {
    to: string
  }
}

export const handler: Handler<HelloWorldHttpEvent, APIGatewayProxyStructuredResultV2> = async (event, context) => {
  const message = `Hello ${event.pathParameters.to} from ${process.env.HELLO_FROM}`
  const { awsRequestId: requestId, functionVersion: version } = context

  return {
    statusCode: 200,
    body: JSON.stringify({
      message,
      requestId,
      version
    })
  }
}
