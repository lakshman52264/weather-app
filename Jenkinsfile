pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-creds')  // Docker Hub credentials
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/lakshman52264/weather-app.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                bat 'docker build -t lakshman52264/weather-backend ./backend'
                bat 'docker build -t lakshman52264/weather-frontend ./frontend'
            }
        }
        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-creds', url: '']) {
                    bat 'docker push lakshman52264/weather-backend'
                    bat 'docker push lakshman52264/weather-frontend'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                bat 'kubectl apply -f k8s/backend-deployment.yaml'
                bat 'kubectl apply -f k8s/frontend-deployment.yaml'
            }
        }
    }
}
