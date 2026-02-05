data "aws_caller_identity" "current" {}

resource "aws_lambda_permission" "apigw_projects_get" {
  statement_id  = "apigw-3qo252mmdj-get-projects"
  action        = "lambda:InvokeFunction"
  function_name = "projects-api"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${data.aws_caller_identity.current.account_id}:${aws_apigatewayv2_api.http_api.id}/*/GET/projects"
}

resource "aws_lambda_permission" "apigw_contact_post" {
  statement_id  = "apigw-3qo252mmdj-post-contact"
  action        = "lambda:InvokeFunction"
  function_name = "contact-api"
  principal     = "apigateway.amazonaws.com"

  source_arn = "arn:aws:execute-api:${var.aws_region}:${data.aws_caller_identity.current.account_id}:${aws_apigatewayv2_api.http_api.id}/*/POST/contact"
}