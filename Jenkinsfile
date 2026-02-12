pipeline {
  agent any

  environment {
    CI = 'true'
    NVM_DIR = "${env.HOME}/.nvm"
    // Bootstrap nvm + Node 20 and run a command. Use in every sh step.
    NODE20_PREFIX = "export NVM_DIR='${NVM_DIR}'; \
[ -s '${NVM_DIR}/nvm.sh' ] || (curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash); \
. '${NVM_DIR}/nvm.sh'; nvm install 20; nvm use 20;"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/cts-karthikvelou/energy-asset-management/'
      }
    }

    stage('Show package info') {
      steps {
        sh """
          bash -lc "${NODE20_PREFIX} node -v && npm -v"
          if [ ! -f package.json ]; then echo 'package.json not found!'; exit 1; fi
          echo 'package.json:' && cat package.json
          echo 'Available npm scripts:' && npm run || true
        """
      }
    }

    stage('Discover npm scripts') {
      steps {
        script {
          def pkgText = readFile 'package.json'
          def pkg = new groovy.json.JsonSlurperClassic().parseText(pkgText)
          env.HAS_BUILD = (pkg?.scripts?.build != null).toString()
          env.HAS_TEST = (pkg?.scripts?.test != null).toString()
          env.HAS_TEST_COV = (pkg?.scripts?.'test:coverage' != null).toString()
        }
      }
    }

    stage('Install Dependencies') {
      steps {
        sh """
          bash -lc "${NODE20_PREFIX} \
          if [ -f package-lock.json ]; then npm ci || npm install; else npm install; fi"
        """
      }
    }

    stage('Build') {
      when { expression { return env.HAS_BUILD == 'true' } }
      steps {
        sh """
          bash -lc "${NODE20_PREFIX} npm run build"
        """
      }
      post {
        always {
          archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true
        }
      }
    }

    stage('Test with Coverage') {
      when { expression { return env.HAS_TEST == 'true' || env.HAS_TEST_COV == 'true' } }
      steps {
        sh """
          bash -lc "${NODE20_PREFIX} \
          if npm run | grep -q '^  test:coverage'; then npm run test:coverage; else npm test; fi"
        """
      }
      post {
        always {
          archiveArtifacts artifacts: 'coverage/**', allowEmptyArchive: true
          // If you emit JUnit XML (e.g., jest-junit), publish it here:
          // junit testResults: 'junit-report.xml', allowEmptyResults: true
        }
      }
    }

    stage('SonarQube Analysis') {
      steps {
        script {
          withSonarQubeEnv('MySonarQubeServer') {
            def scannerHome = tool 'SonarScanner'   // ensure this tool is configured in Jenkins -> Tools
            withCredentials([string(credentialsId: 'SONARQUBE_TOKEN', variable: 'SQ_TOKEN')]) {
              sh """
                bash -lc "${NODE20_PREFIX} \
                \\"${scannerHome}/bin/sonar-scanner\\" \
                  -Dsonar.projectKey=energy-asset-management \
                  -Dsonar.sources=. \
                  -Dsonar.host.url=\\"${env.SONAR_HOST_URL}\\" \
                  -Dsonar.login=\\"${SQ_TOKEN}\\" \
                  -Dsonar.javascript.lcov.reportPaths=coverage/lcov.info"
              """
            }
          }
        }
      }
    }

    stage('Deploy') {
      when { branch 'main' }
      steps {
        echo 'Deploying build artifacts...'
        // sh 'aws s3 sync dist/ s3://my-energy-frontend-bucket --delete'
      }
    }
  }

  post {
    success { echo 'Pipeline completed successfully!' }
    failure { echo 'Pipeline failed. Please check logs.' }
    always  { archiveArtifacts artifacts: 'dist/**', allowEmptyArchive: true }
  }
}
