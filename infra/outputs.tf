output "aws_region" {
  value = var.aws_region
}

output "dynamodb_table_name" {
  value = aws_dynamodb_table.contact_messages.name
}

output "dynamodb_table_arn" {
  value = aws_dynamodb_table.contact_messages.arn
}

output "http_api_id" {
  value = aws_apigatewayv2_api.http_api.id
}

output "http_api_endpoint" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}

output "cloudfront_distribution_id" {
  value = var.cloudfront_distribution_id
}

output "cloudfront_site_url" {
  value = "https://${var.cloudfront_domain_name}"
}
