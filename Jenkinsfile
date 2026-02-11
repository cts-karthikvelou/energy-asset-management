pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/karthikvelou-cts/energy-asset-management.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test with Coverage') { 
            steps { 
                sh 'npm test' 
            } 
        }
        stage('SonarQube Analysis') {
            steps {
                script {
                    // Use the SonarQube server configured in Jenkins
                    withSonarQubeEnv('MySonarQubeServer') {

                        // Load the SonarScanner tool installed in Jenkins
                        def scannerHome = tool 'SonarScanner'

                        // Use your SonarQube token securely
                        withCredentials([string(credentialsId: 'SONARQUBE_TOKEN', variable: 'SQ_TOKEN')]) {
                            sh """
                                ${scannerHome}/bin/sonar-scanner \
                                -Dsonar.projectKey=energy-asset-management \
                                -Dsonar.sources=. \
                                -Dsonar.host.url=https://dev.flowsource.next25era.org:447 \
                                -Dsonar.login=${SQ_TOKEN} \
                                -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info
                            """
                        }
                    }
                }
            }
        }
        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                echo 'Deploying build artifacts...'
                // sh 'aws s3 sync dist/ s3://my-energy-frontend-bucket'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}
