variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "project_name" {
  type    = string
  default = "aws-resume-website"
}

variable "bucket_name" {
  type = string
}

variable "cloudfront_distribution_id" {
  type = string
}

variable "contact_table_name" {
  type = string
}

variable "ses_from_email" {
  type = string
}

variable "ses_to_email" {
  type = string
}
