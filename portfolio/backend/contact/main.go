package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"
	"time"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb"
	"github.com/aws/aws-sdk-go-v2/service/dynamodb/types"
	"github.com/aws/aws-sdk-go-v2/service/ses"
	sesTypes "github.com/aws/aws-sdk-go-v2/service/ses/types"
	"github.com/google/uuid"
)

type ContactRequest struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

var db *dynamodb.Client
var sesClient *ses.Client

func init() {
	cfg, _ := config.LoadDefaultConfig(context.TODO())
	db = dynamodb.NewFromConfig(cfg)
	sesClient = ses.NewFromConfig(cfg)
}

func handler(ctx context.Context, req events.APIGatewayV2HTTPRequest) (events.APIGatewayV2HTTPResponse, error) {

	// Handle OPTIONS preflight for CORS
	if req.RequestContext.HTTP.Method == "OPTIONS" {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 200,
			Headers: map[string]string{
				"Access-Control-Allow-Origin":  "*",
				"Access-Control-Allow-Methods": "POST,OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type",
			},
			Body: "",
		}, nil
	}

	// Parse request body
	var contact ContactRequest
	if err := json.Unmarshal([]byte(req.Body), &contact); err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 400,
			Headers:    corsHeaders(),
			Body:       fmt.Sprintf(`{"error":"%v"}`, err),
		}, nil
	}

	// Save to DynamoDB
	item := map[string]types.AttributeValue{
		"id":        &types.AttributeValueMemberS{Value: uuid.New().String()},
		"name":      &types.AttributeValueMemberS{Value: contact.Name},
		"email":     &types.AttributeValueMemberS{Value: contact.Email},
		"message":   &types.AttributeValueMemberS{Value: contact.Message},
		"createdAt": &types.AttributeValueMemberS{Value: time.Now().Format(time.RFC3339)},
	}

	_, err := db.PutItem(ctx, &dynamodb.PutItemInput{
		TableName: aws.String(os.Getenv("TABLE_NAME")),
		Item:      item,
	})
	if err != nil {
		return events.APIGatewayV2HTTPResponse{
			StatusCode: 500,
			Headers:    corsHeaders(),
			Body:       fmt.Sprintf(`{"error":"%v"}`, err),
		}, nil
	}

	// Send email via SES
	emailBody := fmt.Sprintf(
		"New contact message received:\n\nName: %s\nEmail: %s\nMessage:\n%s",
		contact.Name, contact.Email, contact.Message,
	)

	_, err = sesClient.SendEmail(ctx, &ses.SendEmailInput{
		Source: aws.String(os.Getenv("SES_FROM_EMAIL")), // verified SES email
		Destination: &sesTypes.Destination{
			ToAddresses: []string{os.Getenv("SES_TO_EMAIL")},
		},
		Message: &sesTypes.Message{
			Subject: &sesTypes.Content{
				Data: aws.String("New Contact Form Submission"),
			},
			Body: &sesTypes.Body{
				Text: &sesTypes.Content{
					Data: aws.String(emailBody),
				},
			},
		},
	})

	if err != nil {
		fmt.Println("Failed to send email:", err)
		// Do not fail the request, just log
	}

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Headers:    corsHeaders(),
		Body:       `{"status":"ok"}`,
	}, nil
}

func corsHeaders() map[string]string {
	return map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "POST,OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	}
}

func main() {
	lambda.Start(handler)
}
