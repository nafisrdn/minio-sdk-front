pipeline { 
    agent any  
    stages { 
        stage('Code Quality Check via SonarQube') {  
            environment {   
              SONARQUBE_LOGIN_TOKEN = credentials('SONARQUBE_LOGIN_TOKEN_CREDS')   
              SONAR_SCANNER = tool('Sonar Scanner')
            } 
            steps {  
                script {   
                    withFolderProperties{ 
                        withSonarQubeEnv("Sonarqube-DE") {
                        sh "${SONAR_SCANNER}/bin/sonar-scanner \
                         -Dsonar.tests=${env.SONAR_TEST_SOURCES} \
                         -Dsonar.log.level=${env.SONAR_LOG_LEVEL} \
                         -Dsonar.exclusions=${env.SONAR_EXCLUSIONS} \
                         -Dsonar.verbose=${env.SONAR_VERBOSE} \
                         -Dsonar.projectKey=${env.SONAR_PROJECT_KEY} \
                         -Dsonar.host.url=${env.SONAR_HOST_URL} \
                         -Dsonar.login=${SONARQUBE_LOGIN_TOKEN}" 
                        } 
                    }    
                } 
            }
        }
    }
}
