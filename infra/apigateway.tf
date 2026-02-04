resource "aws_apigatewayv2_api" "http_api" {
  name          = "${var.project_name}-http-api"
  protocol_type = "HTTP"

  cors_configuration {
    allow_origins = ["https://${var.cloudfront_domain_name}"]
    allow_methods = ["POST", "OPTIONS"]
    allow_headers = ["content-type"]
  }
}
