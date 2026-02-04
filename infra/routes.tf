resource "aws_apigatewayv2_route" "post_contact" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.projects.id}"
}

resource "aws_apigatewayv2_route" "any_contact_api" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "ANY /contact-api"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}