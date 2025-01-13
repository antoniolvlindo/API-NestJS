provider "aws" {
  region = "sa-east-1"
}

resource "aws_instance" "example" {
  ami           = "ami-00242775fc4e7fc32" # Amazon Linux 2 AMI
  instance_type = "t2.micro"

  tags = {
    Name = "ExampleInstance"
  }
}
