pipeline {
    agent any

    parameters {
        string defaultValue: 'master', description: 'Branch to build', name: 'branch', trim: false
        choice choices: ['prod', 'stage'], description: 'Environment to build for', name: 'environment'
    }

    stages {
        stage('Update Configuration') {
            steps {
                sh './scripts/update_configuration.sh'
            }
        }
        stage('Build & Create tar') {
            steps {
              nodejs('NodeJS-12.18.3') {
                  git credentialsId: 'git-ssh', url: ''
                  sh "git checkout ${params.branch}"
                  sh "npm i --only=prod"
                  sh "npm run build"
                  sh "tar cfz api-server.tar *"
				}     
            }
        }
        stage('Input') {
            steps {
                input('Do you want to upload this tar file to s3?')
            }
        }
        stage('Upload tar') {
            steps {
              	withAWS(role: "",region: "ap-south-1", roleSessionName: "") {
                	sh "./scripts/upload.sh ${params.environment}"
            	}
        	}
        }
    }
    post {
        always {
            cleanWs()
        }
    }
}
