resource "aws_apigatewayv2_route" "post_contact" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "POST /contact"
  target    = "integrations/${aws_apigatewayv2_integration.contact.id}"
}

resource "aws_apigatewayv2_route" "get_projects" {
  api_id    = aws_apigatewayv2_api.http_api.id
  route_key = "GET /projects"
  target    = "integrations/${aws_apigatewayv2_integration.projects.id}"
}