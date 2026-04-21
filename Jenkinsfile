pipeline {
    agent any

    environment {
        SERVER_IP = "34.230.1.249"
        REPO_URL = "https://github.com/MEISINCE-2006/Security_vault.git"
    }

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main', url: "${REPO_URL}"
            }
        }

        stage('Install Dependencies (Local)') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Deploy to EC2') {
            steps {
                bat """
                ssh -i D:\\DOWNLOADS\\devops.pem -o StrictHostKeyChecking=no ubuntu@${SERVER_IP} "if [ ! -d app ]; then git clone ${REPO_URL} app; fi && cd app && git pull origin main && cd backend && npm install && pm2 restart all || pm2 start index.js"
                """
            }
        }
    }
}
