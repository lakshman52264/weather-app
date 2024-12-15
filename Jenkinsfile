pipeline {
    agent any
    environment {
        DOCKER_USER = 'lakshman52264'  // Your Docker Hub username
    }
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/lakshman52264/weather-app.git'
            }
        }
        stage('Build Docker Images') {
            steps {
                echo "Building Docker images..."
                bat 'docker build -t ${DOCKER_USER}/weather-backend -f Dockerfile .'
                bat 'docker build -t ${DOCKER_USER}/weather-frontend ./frontend'
            }
        }
        stage('Push Docker Images') {
            steps {
                echo "Pushing Docker images to Docker Hub..."
                withCredentials([usernamePassword(credentialsId: 'docker-hub-creds', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    bat '''
                        echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin
                        docker push ${DOCKER_USER}/weather-backend
                        docker push ${DOCKER_USER}/weather-frontend
                    '''
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                echo "Deploying to Kubernetes..."
                bat '''
                    kubectl apply -f k8s/backend-deployment.yaml
                    kubectl apply -f k8s/frontend-deployment.yaml
                '''
            }
        }
    }
    post {
        success {
            echo "Pipeline completed successfully!"
        }
        failure {
            echo "Pipeline failed. Check logs for more details."
        }
    }
}
