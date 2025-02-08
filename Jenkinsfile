pipeline {
    agent any
    stages {
        stage('Build') { 
            steps {
                sh script:'''
                  #!/bin/bash
                  echo -e "VITE_GENKWIZ_BASE_API=https://genkwizards.com/genkwiz/v1\nVITE_GENKWIZ_SESSION_ID=241a1200-f886-4cbc-b9f3-fedff1e4c931" >> .env
                  docker build -t genkwiz-frontend .
                  docker stop genkwiz-frontend || true && docker rm genkwiz-frontend || true
                  docker run --name genkwiz-frontend -p80:80 -d genkwiz-frontend
                  '''
            }
        }
    }
}
