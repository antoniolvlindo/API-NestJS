terraform {
  required_providers {
    vercel = {
      source  = "vercel/vercel"
      version = "0.5.1" # Verifique a versão mais recente disponível
    }
  }
}

provider "vercel" {
  api_token = var.vercel_api_token
}

resource "vercel_project" "project" {
  name      = var.vercel_project_name
  framework = "docker"
}

resource "vercel_deployment" "deployment" {
  project_id = vercel_project.project.id
  git_source {
    type    = "github"
    repo_id = var.repo_id
    branch  = var.branch
  }
}

variable "vercel_api_token" {}
variable "vercel_project_name" {}
variable "repo_id" {}
variable "branch" {}