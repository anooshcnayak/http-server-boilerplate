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
                  git credentialsId: 'bitbucket-ssh', url: 'ssh://git@repo.gameskraft.in/ateam/api-server-boilerplate.git'
                  sh "git checkout ${params.branch}"
                  sh "npm i --only=prod"
                  sh "npm run build"
                  sh "tar cfz zion.tar *"
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
              	withAWS(role: "arn:aws:iam::997601445690:role/JenkinsEC2Role",region: "ap-south-1", roleSessionName: "jenkins-at-prod") {
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
