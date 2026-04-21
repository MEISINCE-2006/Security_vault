pipeline {
    agent any

    environment {
        SERVER_IP = "34.230.1.249"
    }

    stages {

       

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                sshagent(['ec2-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} << EOF
                    cd app || git clone https://github.com/MEISINCE-2006/Security_vault.git app
                    cd app
                    git pull origin main
                    cd backend
                    npm install
                    pm2 restart all || pm2 start index.js
                    EOF
                    """
                }
            }
        }
    }
}
