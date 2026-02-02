package contact

import (
	"context"
	"encoding/json"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/google/uuid"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func handler(ctx context.Context, req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {
	var contact ContactRequest
	json.Unmarshal([]byte(req.Body), &contact)

	cfg, _ := config.LoadDefaultConfig(ctx)
	db := dynamodb.NewFromConfig(cfg)

	item := map[string]types.AttributeValue{
		"id":        &types.AttributeValueMemberS{Value: uuid.New().String()},
		"name":      &types.AttributeValueMemberS{Value: contact.Name},
		"email":     &types.AttributeValueMemberS{Value: contact.Email},
		"message":   &types.AttributeValueMemberS{Value: contact.Message},
		"createdAt": &types.AttributeValueMemberS{Value: time.Now().Format(time.RFC3339)},
	}

	db.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Item:      item,
	})

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Access-Control-Allow-Origin": "*",
		},
		Body: `{"status":"ok"}`,
	}, nil
}

func main() {
	lambda.Start(handler)
}
