pipeline {
    agent any
    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-creds')  // Add your Docker Hub credentials in Jenkins
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/lakshman52264/weather-app.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                sh 'docker build -t lakshman52264/weather-backend ./backend'
                sh 'docker build -t lakshman52264/weather-frontend ./frontend'
            }
        }
        stage('Push Docker Images') {
            steps {
                withDockerRegistry([credentialsId: 'docker-hub-creds', url: '']) {
                    sh 'docker push lakshman52264/weather-backend'
                    sh 'docker push lakshman52264/weather-frontend'
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                sh 'kubectl apply -f k8s/backend-deployment.yaml'
                sh 'kubectl apply -f k8s/frontend-deployment.yaml'
            }
        }
    }
}
