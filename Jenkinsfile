pipeline {
    agent any

    tools {
        // Requires Jenkins NodeJS Plugin; configure a Node installation named "Node 18"
        nodejs 'Node 18'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/karthikvelou-cts/energy-asset-management.git'
            }
        }

        stage('Show package info') {
            steps {
                sh '''
                    if [ ! -f package.json ]; then
                      echo "package.json not found!"
                      exit 1
                    fi
                    echo "package.json:"
                    cat package.json
                    echo "Available npm scripts:"
                    npm run || true
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                // Prefer deterministic CI installs; fallback to install if lockfile is missing
                sh 'npm ci || npm install'
            }
        }

        stage('Build') {
            when {
                expression {
                    // Only run if "build" script exists
                    def pkg = readJSON file: 'package.json'
                    return pkg?.scripts?.build != null
                }
            }
            steps {
                sh 'npm run build'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
                }
            }
        }

        stage('Test with Coverage') {
            when {
                expression {
                    // Run only if package.json has a "test" script
                    def pkg = readJSON file: 'package.json'
                    return pkg?.scripts?.test != null
                }
            }
            steps {
                sh 'npm test'
            }
            post {
                always {
                    // If you generate junit XML (e.g., jest-junit), publish it (optional):
                    // junit testResults: 'junit-report.xml', allowEmptyResults: true
                    archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    // Bind SonarQube server config set in Jenkins Global Configuration
                    withSonarQubeEnv('MySonarQubeServer') {
                        def scannerHome = tool 'SonarScanner'
                        withCredentials([string(credentialsId: 'SONARQUBE_TOKEN', variable: 'SQ_TOKEN')]) {
                            sh """
                                "${scannerHome}/bin/sonar-scanner" \
                                  -Dsonar.projectKey=energy-asset-management \
                                  -Dsonar.sources=. \
                                  -Dsonar.host.url="${env.SONAR_HOST_URL}" \
                                  -Dsonar.login="${SQ_TOKEN}" \
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
                // Example: sync built files to S3 or your target environment
                // sh 'aws s3 sync dist/ s3://my-energy-frontend-bucket --delete'
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
        always {
            archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
        }
    }
}
