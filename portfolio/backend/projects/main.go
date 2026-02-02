package main

import (
	"context"
	"encoding/json"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

type Project struct {
	ID          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

func handler(ctx context.Context) (events.APIGatewayV2HTTPResponse, error) {
	projects := []Project{
		{
			ID:          "aws-portfolio",
			Name:        "AWS Serverless Portfolio",
			Description: "React frontend on S3 + CloudFront with Go Lambda backend",
		},
	}

	body, _ := json.Marshal(projects)

	return events.APIGatewayV2HTTPResponse{
		StatusCode: 200,
		Headers: map[string]string{
			"Content-Type":                "application/json",
			"Access-Control-Allow-Origin": "*",
		},
		Body: string(body),
	}, nil
}

func main() {
	lambda.Start(handler)
}
